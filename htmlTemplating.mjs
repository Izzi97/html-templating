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
