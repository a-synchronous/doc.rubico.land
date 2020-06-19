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
const Section = e('section')
const Span = e('span')
const Div = e('div')
const Img = e('img')
const H1 = e('h1')
const H2 = e('h2')
const H3 = e('h3')
const H4 = e('h4')
const P = e('p')
const Ul = e('ul')
const Li = e('li')
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

const RubicoAPIMethodLink = ({ name, description }) => e(x => {
  return Div({
    style: {
      whiteSpace: 'nowrap',
    },
  }, [
    Button({
      style: {
        backgroundColor: 'white',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        margin: '.25em 0',
        padding: '0 0',
        display: 'inline',
      },
      onClick: () => {
        x.goto(name)
      },
    }, [
      H2({
        style: {
          margin: '0 0',
          color: 'blue',
        },
      }, [name]),
    ]),
    Span({
      style: {
        position: 'relative',
        top: '-0.05em',
      },
    }, [' - ' + description])
  ])
})

const RubicoAPI = e(x => Div(null, [
  Section(null, [
    H2({
      style: {
        whiteSpace: 'nowrap',
      },
    }, ['function composition']),
    Ul(null, [
      RubicoAPIMethodLink({
        name: 'pipe',
        description: 'chain functions together 🔗',
      })(x),
      RubicoAPIMethodLink({
        name: 'tap',
        description: 'spy on data',
      })(x),
      RubicoAPIMethodLink({
        name: 'tryCatch',
        description: 'try a function, catch with another 🔗',
      })(x),
      RubicoAPIMethodLink({
        name: 'switchCase',
        description: 'control flow 🔗',
      })(x),
    ]),
  ]),
]))

const NotFound = e(() => H1(null, ['not found']))

const rubicoAPIMethods = new Set([
  'pipe', 'tap', 'tryCatch', 'switchCase',
])

const Root = e(x => {
  const [hash, setHash] = useState(location.hash)
  return pipe([
    assign({
      goto: () => methodName => {
        setHash('#' + methodName)
        history.pushState({}, '', '#' + methodName)
      },
    }),
    switchCase([
      eq('', hash), RubicoAPI,
      () => rubicoAPIMethods.has(hash.slice(1)), RubicoAPI, // RubicoAPIMethod
      NotFound,
    ]),
  ])(x)
})

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

render(document.getElementById('root'), Root(x))
