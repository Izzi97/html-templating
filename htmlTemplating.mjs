'use strict'

// string -> [{attrKey:attrVal}] -> element
export const element = tagname => (...attributes) => {
    const elem = document.createElement(tagname)
    if (attributes[0] != null && attributes[0] != undefined)
        attributes.forEach(kvp => elem.setAttribute(Object.keys(kvp)[0], Object.values(kvp)[0]))
    return elem
}

// string, string -> element
export const textElement = tagname => text => (...attributes) => {
    const e = element(tagname)(...attributes)
    e.innerText = text
    return e
}

// element -> ...elements -> element
export const append = element => (...children) => {
    children.forEach(c => element.append(c))
    return element
}

// (...args -> element) -> ...args -> int -> [element]
export const repeat = ctor => (...ctorArgs) => (...attrs) => times => { 
    const elems = new Array(times)
    for (let i = 0; i < elems.length; i++)
        elems[i] = ctor(...ctorArgs)(...attrs)
    return elems
}

// string -> element
export const get = selector => document.querySelector(selector)

// string -> [element]
export const getAll = selector => document.querySelectorAll(selector)

// string -> void
export const remove = selector => {
    const node = get(selector)
    node.parentNode.remove(node)
}

// string -> element -> void
export const set = selector => element => {
    const node = get(selector)
    node.parentNode.replaceChild(element, node)
}

// string -> element -> object -> string -> void
export const bind = attrName => element => object => propName => {
    // bullshit case
    if (!object.hasOwnProperty(propName)) throw new Error('binding target does not exist!')

    const hiddenPropName = '_'+propName
    const actionPropName = hiddenPropName+'_actions'

    // already set up case
    if (object.hasOwnProperty(hiddenPropName)){
        if (object.hasOwnProperty(actionPropName))
            object[actionPropName].push(attrSetter(attrName, element, object, hiddenPropName))
        else
            throw new Error('attribute setter actions not found!')
    }

    // initial setup case
    else{
        object[hiddenPropName] = object[propName]
        object[actionPropName] = [attrSetter(attrName, element, object, hiddenPropName)]
        Object.defineProperty(object, propName, {
            set: x => {
                object[hiddenPropName] = x
                object[actionPropName].forEach(attrSetter => attrSetter())
            },
            get: _ => object[hiddenPropName]
        })
    }

    function attrSetter(attrName, element, object, propName){
        return _ => {
            const value = object[propName]
            if (value === element[attrName])
                return
            element[attrName] = value
        }
    }
}
