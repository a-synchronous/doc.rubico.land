/* doc.rubico.land
 * https://github.com/a-synchronous/doc.rubico.land
 * (c) 2020 Richard Tong
 * tour.rubico.land may be freely distributed under the MIT license.
 */

'use strict'

const {
  pipe, fork, assign,
  tap, tryCatch, switchCase,
  map, filter, reduce, transform,
  any, all, and, or, not,
  eq, gt, lt, gte, lte,
  get, pick, omit,
} = rubico

const { createElement, useState, useEffect, useReducer, useRef } = React

const render = (container, component) => ReactDOM.render(component, container)

const identity = x => x

const trace = tap(console.log)

const isString = x => typeof x === 'string'

const isFunction = x => typeof x === 'function'

const isPromise = x => x && typeof x.then === 'function'

const e = type => (
  props = {}, children = []
) => React.createElement(type, props, ...children)

const Script = e('script')
const Html = e('html')
const Body = e('body')
const Span = e('span')
const Div = e('div')
const Img = e('img')
const H1 = e('h1')
const P = e('p')
const Button = e('button')
const Iframe = e('iframe')

const Clicker = e(x => {
  const { styles, assets, clickMessage } = x
  const [clicked, setClicked] = useState(0)
  useEffect(() => {
    console.log(`clicked ${clicked} times`)
  })
  return Div({
    id: 'clicker',
    style: styles.div,
  }, [
    Img({
      src: assets.lolSrc,
      alt: assets.lolSrc,
    }),
    P(null, [`clicked ${clicked} times`]),
    Button({
      onClick: () => {
        setClicked(clicked + 1)
      },
    }, ['click']),
  ])
})

const Divz = e(x => Div(null, [
  Div(),
  Clicker(x),
  Div(),
]))

const x = {
  assets: {
    lolSrc: 'https://tour.rubico.land/assets/thank-you-michael-scott.gif',
  },
  styles: {
    img: { height: '100%', width: '100%', maxWidth: '268px' },
    div: { backgroundColor: 'pink' },
  },
  clickMessage: 'hey',
}

render(document.getElementById('root'), Divz(x))
