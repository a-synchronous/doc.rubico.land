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
  props = {}, children = [],
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
const B = e('b')
const I = e('i')
const Ul = e('ul')
const Li = e('li')
const Button = e('button')
const Iframe = e('iframe')
const Br = e('br')

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

const RubicoAPIHomeLink = e(x => {
  return Div(null, [
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
      onClick: () => { x.gotoHome() },
    }, [
      H1({
        style: { color: 'black', fontSize: '2em' },
      }, ['🏞 rubico ']),
    ]),
  ])
})

const RubicoAPIMethodLink = ({ name, description }) => e(x => {
  return Div(null, [
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
      onClick: () => { x.goto(name) },
    }, [
      H2({
        style: { margin: '0 0', color: 'blue' },
      }, [name]),
    ]),
    Div({
      style: {
        display: 'inline',
      },
      /*
      style: x.path ? ({
        visibility: 'hidden',
        opacity: 0,
        maxHeight: '0%',
        transition: 'visibility 0s 0.1s, opacity 0.1s linear, max-height 0.25s ease-out',
      }) : ({
        visibility: 'visible',
        opacity: 1,
        maxHeight: '22%',
        transition: 'opacity 0.25s linear, max-height 0.25s ease-in',
      }),
      */
    }, [
      Span({
        style: { position: 'relative', top: '-0.05em' },
      }, [' - ' + description]),
      Div({
        style: { marginLeft: '1em' },
      }, [x.children]),
    ]),
  ])
})

const RubicoAPIMethodLinkDisabled = ({ name, description }) => e(x => {
  return Div(null, [
    Button({
      style: {
        backgroundColor: 'white',
        border: 'none',
        outline: 'none',
        cursor: 'text',
        margin: '.25em 0',
        padding: '0 0',
        display: 'inline',
      },
    }, [
      H3({
        style: { margin: '0 0' },
      }, [name]),
    ]),
    Span({
      style: { position: 'relative', top: '-0.05em' },
    }, [' - ' + description]),
    Div({
      style: { marginLeft: '1em' },
    }, [x.children]),
  ])
})

const RubicoAPI = e(x => Div({
  style: { height: '100%' },
}, [
  Section(null, [RubicoAPIHomeLink(x)]),
  Section({
    style: x.path ? ({
      visibility: 'hidden',
      opacity: 0,
      maxHeight: '0%',
      transition: 'visibility 0s 0.1s, opacity 0.1s linear, max-height 0.25s ease-out',
    }) : ({
      visibility: 'visible',
      opacity: 1,
      maxHeight: '22%',
      transition: 'opacity 0.25s linear, max-height 0.25s ease-in',
    }),
  }, [
    P({
      style: { fontSize: '0.8em', paddingInlineStart: '1em' },
    }, [I(null, ['a shallow river in northeastern Italy, just south of Ravenna'])]),
    P(null, [`
rubico is a robust, highly optimized, and dependency free syntax for async agnostic functional programming in JavaScript. The style and naming of the syntax is idiomatic across languages and other libraries; using this library should feel second nature. Just like regular vanilla JavaScript syntax and operators, rubico operates predictably on vanilla JavaScript types. When you use this library, you can stop worrying about the complex fluff of Promise management. When something goes wrong, rubico throws meaningful and ergonomic errors. You should use this library if you want to become a better programmer, write cleaner and more concise code, or harness the expressive power of functional programming in production.
    `]),
    P(null, [
      'The tags below denote the asynchronous behavior for a given method',
    ]),
    Ul(null, [
      Li({
        style: { listStyle: 'none' },
      }, ['🔗 - executes in series']),
      Li({
        style: { listStyle: 'none' },
      },['⛓️  - executes in parallel']),
    ]),
  ]),
  Section(null, [
    H2(null, ['dataflow']),
    Ul(null, [
      RubicoAPIMethodLink({
        name: 'pipe',
        description: 'define flow, chain functions together 🔗',
      })(x),
      RubicoAPIMethodLink({
        name: 'fork',
        description: 'duplicate and diverge flow ⛓️',
      })(x, [
        RubicoAPIMethodLinkDisabled({
          name: 'fork.series',
          description: 'fork in series 🔗',
        })(x),
      ]),
      RubicoAPIMethodLink({
        name: 'assign',
        description: 'fork, then merge new flow with original ⛓️',
      })(x),
      RubicoAPIMethodLink({
        name: 'tap',
        description: 'spy on flow',
      })(x),
      RubicoAPIMethodLink({
        name: 'tryCatch',
        description: 'try a flow, catch with another 🔗',
      })(x),
      RubicoAPIMethodLink({
        name: 'switchCase',
        description: 'logically control flow 🔗',
      })(x),
    ]),
  ]),
  Section(null, [
    H2(null, ['transformation']),
    Ul(null, [
      RubicoAPIMethodLink({
        name: 'map',
        description: 'apply function to data ⛓️',
      })(x, [
        RubicoAPIMethodLinkDisabled({
          name: 'map.pool',
          description: 'map with asynchronous limit ⛓️',
        })(x),
        RubicoAPIMethodLinkDisabled({
          name: 'map.withIndex',
          description: 'map with index ⛓️',
        })(x),
        RubicoAPIMethodLinkDisabled({
          name: 'map.series',
          description: 'map in series 🔗',
        })(x),
      ]),
      RubicoAPIMethodLink({
        name: 'filter',
        description: 'exclude data by predicate ⛓️',
      })(x, [
        RubicoAPIMethodLinkDisabled({
          name: 'filter.withIndex',
          description: 'filter with index ⛓️',
        })(x),
      ]),
      RubicoAPIMethodLink({
        name: 'reduce',
        description: 'execute data transformation (idiomatic) 🔗',
      })(x),
      RubicoAPIMethodLink({
        name: 'transform',
        description: 'execute data transformation (expressive) 🔗',
      })(x),
    ]),
  ]),
  Section(null, [
    H2(null, ['predicate composition']),
    Ul(null, [
      RubicoAPIMethodLink({
        name: 'any',
        description: 'test if function of any data truthy ⛓️',
      })(x),
      RubicoAPIMethodLink({
        name: 'all',
        description: 'test if function of all data truthy ⛓️',
      })(x),
      RubicoAPIMethodLink({
        name: 'and',
        description: 'test if all functions of data truthy ⛓️',
      })(x),
      RubicoAPIMethodLink({
        name: 'or',
        description: 'test if any functions of data truthy ⛓️',
      })(x),
      RubicoAPIMethodLink({
        name: 'not',
        description: 'test if function of data falsy',
      })(x),
    ]),
  ]),
  Section(null, [
    H2(null, ['comparison']),
    Ul(null, [
      RubicoAPIMethodLink({
        name: 'eq',
        description: 'test if left equals right',
      })(x),
      RubicoAPIMethodLink({
        name: 'gt',
        description: 'test if left > right',
      })(x),
      RubicoAPIMethodLink({
        name: 'lt',
        description: 'test if left < right',
      })(x),
      RubicoAPIMethodLink({
        name: 'gte',
        description: 'test if left >= right',
      })(x),
      RubicoAPIMethodLink({
        name: 'lte',
        description: 'test if left <= right',
      })(x),
    ]),
  ]),
  Section(null, [
    H2(null, ['operation']),
    Ul(null, [
      RubicoAPIMethodLink({
        name: 'get',
        description: 'access a value by path or index',
      })(x),
      RubicoAPIMethodLink({
        name: 'pick',
        description: 'only include provided properties',
      })(x),
      RubicoAPIMethodLink({
        name: 'omit',
        description: 'exclude provided properties',
      })(x),
    ]),
  ]),
]))

const RubicoAPIMethod = e(x => x.path ? Div() : Div())

const NotFound = e(() => H1(null, ['not found']))

const rubicoAPIMethods = new Set([
  'pipe', 'fork', 'assign',
  'tap', 'tryCatch', 'switchCase',
  'map', 'filter', 'reduce', 'transform',
  'any', 'all', 'and', 'or', 'not',
  'eq', 'gt', 'lt', 'gte', 'lte',
  'get', 'pick', 'omit',
])

const Root = e(x => {
  const [hash, setHash] = useState(location.hash)
  useEffect(() => {
    const setLocationHash = () => { setHash(location.hash) }
    window.addEventListener('popstate', setLocationHash)
    return () => {
      window.removeEventListener('popstate', setLocationHash)
    }
  })
  return pipe([
    assign({
      gotoHome: () => () => {
        history.pushState({}, '', '/')
        setHash('')
      },
      goto: () => methodName => {
        history.pushState({ path: methodName }, '', '#' + methodName)
        setHash(methodName)
      },
      path: () => hash.startsWith('#') ? hash.slice(1) : hash,
    }),
    switchCase([
      or([
        eq('', hash),
        x => rubicoAPIMethods.has(x.path),
      ]), x => Div({
        style: {
          display: 'grid',
          gridTemplateColumns: 'auto auto',
        },
      }, [RubicoAPI(x), RubicoAPIMethod(x)]),
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
