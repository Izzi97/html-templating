# How to use it?

```javascript
import * as dom from './htmlTemplating.mjs'

// get a body node
const myBody = dom.element('body')({class:'clazz'}, {id:'root'})

// get an h1 node
const myHeading = dom.textElement('h1')("I'm a heading!")({class:'some-class'})

// get a paragrph constructor
const p = dom.textElement('p')
// use it to instantiate a paragraph
const myParagraph = p("I'm a paragraph!")({class:'some-other-class')

// merge everything together
append(myBody)(myHeading, myParagraph)

// replace the browser's body with your one
dom.set('body')(myBody)
```

## Constructors
#### element
`element :: string tagname => ...{key:val} attributes => DOMNode`

Constructs a DOM-Node that is meant to hold other DOMNodes.

#### textElement
`textElement :: string tagname => string text => ...{key:val} attributes => DOMNode`

Constructs a DOM-Node that is meant to hold text.

## Combinators
#### append
`append :: DOMNode element => ...DOMNode children`

Appends `children` to `element`

#### repeat
`repeat :: constructor ctor => ...constructorArguments args => ...{key:val} attributes => int n => [DOMNode]`

Constructs multiple identical DOMNodes by repeating the given constructor `ctor` `n` times by applying it to `args` and `attributes`.
All identical `n` DOMNodes are returned as an array.
