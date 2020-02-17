# how to use it

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
