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

const identity = x => x

const trace = tap(console.log)

const isString = x => typeof x === 'string'

const isFunction = x => typeof x === 'function'

const isPromise = x => x && typeof x.then === 'function'

const e = type => (props, children = []) => createElement(type, props, ...children)

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

const HeySayer = (props, children = []) => {
  const { styles, assets, clickMessage } = props
  const [clicked, setClicked] = useState(false)
  useEffect(() => {
    console.log('I\'m an effect of HeySayer!')
  })
  return Div({
    id: 'say-hey',
    style: styles.div,
  }, [
    Img({
      src: assets.lolSrc,
      alt: assets.lolSrc,
    }),
    Button({
      onClick: () => {
        console.log(clickMessage)
        setClicked(true)
      },
    }, ['say hey once']),
  ])
}

const props = {
  assets: {
    lolSrc: 'https://tour.rubico.land/assets/thank-you-michael-scott.gif',
  },
  styles: {
    img: { height: '100%', width: '100%', maxWidth: '268px' },
    div: { backgroundColor: 'pink' },
  },
  clickMessage: 'hey',
}

ReactDOM.render(createElement(HeySayer, props), document.getElementById('root'))
