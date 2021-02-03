/**
 * A curried constructor function to build html markup from javascript.
 * @param {string} name the element name
 * @returns {function : (object, Array<HtmlElement>) => HtmlElement}
 * a function taking an attributes object and an array of subelements
 * yielding a 'name'-element with the specified attributes and subelements
 */
export const element = name => (attrs, children) => {
    
    const e = document.createElement(name || 'div')
    
    if (attrs)
        for (const key in attrs)
            e.setAttribute(key, attrs[key])

    if (children)
        e.append(...children)

    return e
}

// some default element constructors for conveniece

export const div = element('div')

export const main = element('main')
export const sec = element('section')

export const h1 = element('h1')
export const p = element('p')

export const a = element('a')

export const ul = element('ul')
export const ol = element('ol')



/**
 * A curried combinator function that repeats a given element 'count' times.
 * @param {number} count the count by which to repeat the element
 * @returns {function : HtmlElement => Array<HtmlElement>}
 * a function taking the element to repeat
 * yielding an array with 'count' copies of the element
 */
export const repeat = count => element => {
    const arr = Array(count).fill(true)
    const els = arr.map(_ => element.cloneNode(true))
    return els
}

// some default repetition combinators for convenience

export const twice = repeat(2)
export const thrice = repeat(3)