# How to use it?

```javascript
import * as dom from './htmlTemplating.mjs'

// get a body node
const myBody = dom.element('body')({class:'clazz'}, {id:'root'})

// get an h1 node
const myHeading = dom.textElement('h1')("I'm a heading!")({class:'some-class'})

// get a paragraph constructor
const p = dom.textElement('p')
// use it to instantiate a paragraph
const myParagraph = p("I'm a paragraph!")({class:'some-other-class')

// merge everything together
append(myBody)(myHeading, myParagraph)

// replace the browser's body with your one
dom.set('body')(myBody)
```

For a more detailed demo that also utilizes reactive data binding please see `demo.html`.

## Constructors
#### element
`element :: string tagname => ...{key:val} attributes => DOMNode`

Constructs a DOM-Node that is meant to hold other DOMNodes.

#### textElement
`textElement :: string tagname => string text => ...{key:val} attributes => DOMNode`

Constructs a DOM-Node that is meant to hold text.

#### repeat
`repeat :: constructor ctor => ...constructorArguments args => ...{key:val} attributes => int n => [DOMNode]`

Constructs multiple identical DOMNodes by repeating the given constructor `ctor` `n` times by applying it to `args` and `attributes`.
All identical `n` DOMNodes are returned as an array.

## Binding
#### bind
`bind :: string attributeName => HTMLElement element => Object object => string propertyName => void`

Reactively binds `element`'s attribute named with `attributeName` to `object`'s property named with `propertyName`. 
If the property gets updated the update will also be propagated to the linked element's attribute.

## Combinators
#### append
`append :: DOMNode element => ...DOMNode children => void`

Appends `children` to `element`
