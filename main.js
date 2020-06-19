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

const RubicoAPIMethodLink = ({ name, description }) => e(x => {
  return Div({
    style: { whiteSpace: 'nowrap' },
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
      onClick: () => { x.goto(name) },
    }, [
      H2({
        style: { margin: '0 0', color: 'blue' },
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

const RubicoAPIMethodLinkDisabled = ({ name, description }) => e(x => {
  return Div({
    style: { whiteSpace: 'nowrap' },
  }, [
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

const RubicoAPI = e(x => Div(null, [
  Section(null, [
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
    H2({
      style: { whiteSpace: 'nowrap' },
    }, ['dataflow']),
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
    H2({
      style: { whiteSpace: 'nowrap' },
    }, ['transformation']),
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
    H2({
      style: { whiteSpace: 'nowrap' },
    }, ['predicate composition']),
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
    H2({
      style: { whiteSpace: 'nowrap' },
    }, ['comparison']),
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
    H2({
      style: { whiteSpace: 'nowrap' },
    }, ['operation']),
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

const RubicoAPIMethod = e(({ path }) => Div(null, [
  H1(null, [path]),
]))

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
      goto: () => methodName => {
        history.pushState({ path: methodName }, '', '#' + methodName)
        setHash(methodName)
      },
      path: () => hash.startsWith('#') ? hash.slice(1) : hash,
    }),
    switchCase([
      eq('', hash), RubicoAPI,
      x => rubicoAPIMethods.has(x.path), RubicoAPIMethod,
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
