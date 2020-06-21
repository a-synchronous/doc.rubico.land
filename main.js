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

const { createElement, useState, useEffect, useReducer, useRef, useCallback } = React

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
const A = e('a')
const P = e('p')
const B = e('b')
const I = e('i')
const Ul = e('ul')
const Li = e('li')
const Textarea = e('textarea')
const Button = e('button')
const Iframe = e('iframe')
const Br = e('br')
const Code = e('code')
const Pre = e('pre')

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

const RUBICO_LINK_COLOR = 'royalblue'

const RubicoAPIHomeLink = e(x => {
  return Div(null, [
    Button({
      style: {
        backgroundColor: 'white',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        padding: '0 0',
        display: 'inline',
      },
      onClick: () => { x.gotoHome() },
    }, [
      H1({
        style: { color: RUBICO_LINK_COLOR },
      }, ['🏞 rubico ']),
    ]),
  ])
})

const RubicoAPIMethodHeader = heading => e(x => H2({
  style: { margin: x.path ? '0' : '0em auto' },
}, [heading]))

const RubicoAPIMethodLinkList = e(x => x.path ? Ul({
  style: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    margin: 0,
    transition: 'margin .5s',
    paddingInlineStart: '1em',
  },
}, [x.children]) : Ul({
  style: {
    margin: '1em 0em',
    transition: 'margin .5s',
    paddingInlineStart: '1em',
  },
}, [x.children]))

const RubicoAPIMethodLink = ({ name, description }) => e(x => {
  return Li({
    style: {
      height: '100%',
      listStyle: 'none',
      display: x.path ? 'inline-block' : 'block',
      marginRight: '0.85em',
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
      },
      onClick: () => { x.goto(name) },
    }, [
      H2({
        style: { margin: '0 0', color: RUBICO_LINK_COLOR },
      }, [name]),
    ]),
    Div({
      style: {
        display: x.path ? 'none' : 'inline',
      },
    }, [
      Span({
        style: { position: 'relative', top: '-0.05em' },
      }, [' - ' + description]),
      Ul({
        style: {
          marginLeft: '1em',
          display: x.path ? 'none' : 'block',
          paddingInlineStart: '1em',
        },
      }, [x.children]),
    ]),
  ])
})

const RubicoAPIMethodLinkDisabled = ({ name, description }) => e(x => {
  return Li(null, [
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

const RubicoAPIMethodRule = (children, i) => Li({
  style: {
    listStyle: 'none',
    margin: '1em 0em',
  },
  key: i,
}, map(child => Span({
  style: { marginRight: '.35em' },
}, [child]))(children))

const RubicoAPIMethod = e(x => Div(null, [
  H1(null, [x.path]),
  P(null, [x.method && x.method.description]),
  Code(null, [Pre({
    style: {
      backgroundColor: 'darkslategrey',
      color: 'white',
      padding: '.5em',
      width: '85%',
      fontFamily: 'monospace',
      fontSize: '1.25em',
    },
  }, [x.method && x.method.example])]),
  Ul(null, [map.withIndex(RubicoAPIMethodRule)(x.method ? x.method.rules : [])]),
]))

const RubicoAPI = e(x => Div({
  style: { height: '100%' },
}, [
  Section(null, [RubicoAPIHomeLink(x)]),
  Section({
    style: x.path ? ({
      maxHeight: '0%',
      transition: 'max-height .28s ease-out',
    }) : ({
      maxHeight: '25%',
      transition: 'max-height .28s ease-in',
    }),
  }, [
    P({
      style: { fontSize: '0.8em', paddingInlineStart: '1em' },
    }, [I(null, ['a shallow river in northeastern Italy, just south of Ravenna'])]),
    Br(),
    P(null, [`
rubico is a robust, highly optimized, and dependency free syntax for async agnostic functional programming in JavaScript. The style and naming of the syntax is idiomatic across languages and other libraries; using this library should feel second nature. Just like regular vanilla JavaScript syntax and operators, rubico operates predictably on vanilla JavaScript types. When you use this library, you can stop worrying about the complex fluff of Promise management. When something goes wrong, rubico throws meaningful and ergonomic errors. You should use this library if you want to become a better programmer, write cleaner and more concise code, or harness the expressive power of functional programming in production.
    `]),
    P(null, [
      'The tags below denote the asynchronous behavior of a given method',
    ]),
    Ul({
      style: { paddingInlineStart: '1em' },
    }, [
      Li({
        style: { listStyle: 'none' },
      }, ['🔗 - executes in series']),
      Li({
        style: { listStyle: 'none' },
      }, ['⛓️  - executes in parallel']),
    ]),
  ]),
  Div({
    style: {
      backgroundColor: 'white',
      position: 'relative',
      zIndex: 1,
      width: x.path ? '125%' : '100%',
      height: '100%',
      transform: x.path ? 'scale(.9, .9) translate(-6%, -6%)' : '',
      transition: 'transform .38s, width: 2s',
    },
  }, [
    Section(null, [
      RubicoAPIMethodHeader('dataflow')(x),
      RubicoAPIMethodLinkList(x, [
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
      RubicoAPIMethodHeader('transformation')(x),
      RubicoAPIMethodLinkList(x, [
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
      RubicoAPIMethodHeader('predicate composition')(x),
      RubicoAPIMethodLinkList(x, [
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
      RubicoAPIMethodHeader('comparison')(x),
      RubicoAPIMethodLinkList(x, [
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
      RubicoAPIMethodHeader('operation')(x),
      RubicoAPIMethodLinkList(x, [
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
    Br(),
    x.path ? Section(null, [RubicoAPIMethod(x)]) : Div(),
  ]),
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
      gotoHome: () => () => {
        history.pushState({}, '', '/')
        setHash('')
      },
      goto: () => methodName => {
        history.pushState({ path: methodName }, '', '#' + methodName)
        setHash(methodName)
      },
      path: () => hash.startsWith('#') ? hash.slice(1) : hash,
      method: x => x.methods[hash.startsWith('#') ? hash.slice(1) : hash],
    }),
    switchCase([
      or([
        eq('', hash),
        x => rubicoAPIMethods.has(x.path),
      ]), x => Div({
        style: { display: 'grid' }, // TODO: figure out why this has to be here
      }, [RubicoAPI(x)]),
      NotFound,
    ]),
  ])(x)
})

const SC = code => Code({
  style: {
    backgroundColor: 'darkslategrey',
    color: 'white',
    padding: '.15em .35em',
  },
}, [code])

const SB = name => B(null, [name])

const SLink = (url, name) => A({
  href: url,
  style: {
  },
}, [name])

const toString = x => `${x}`

const SListItem = (children, i) => Li({
  style: { margin: '0' },
  key: i,
}, map(child => Span({
  style: { marginRight: '.35em' },
}, [child]))(children))

const SList = children => Ul({
  style: { paddingInlineStart: '2em' },
}, map.withIndex(SListItem)(children))

const templateCodeSandbox = code => `
Promise.all([
  fetch('https://unpkg.com/rubico@1/index.js').then(res => res.text()),
]).then(texts => {
  texts.forEach(text => { Function(text)() })

  const {
    pipe, fork, assign,
    tap, tryCatch, switchCase,
    map, filter, reduce, transform,
    any, all, and, or, not,
    eq, gt, lt, gte, lte,
    get, pick, omit,
  } = rubico

  const codeArea = document.createElement('code')
  codeArea.style.fontSize = '1.25em'
  const panel = document.createElement('pre')
  codeArea.appendChild(panel)
  document.body.appendChild(panel)

  const isDefined = x => x !== null && x !== undefined

  const isString = x => typeof x === 'string'

  const isArray = Array.isArray

  const is = fn => x => isDefined(x) && x.constructor === fn

  const typedArrays = new Set([
    'Uint8ClampedArray',
    'Uint8Array', 'Int8Array',
    'Uint16Array', 'Int16Array',
    'Uint32Array', 'Int32Array',
    'Float32Array', 'Float64Array',
    'BigUint64Array', 'BigInt64Array',
  ])

  const isTypedArray = x => (isDefined(x) &&
    x.constructor && typedArrays.has(x.constructor.name))

  const fmt = (x, depth = 0) => {
    if (depth > 0 && isString(x)) {
      return "'" + x + "'"
    }
    if (isArray(x)) {
      return '[' + map(xi => fmt(xi, depth + 1))(x).join(', ') + ']'
    }
    if (isTypedArray(x)) {
      return x.constructor.name + '(' + x.length + ') [' + x.join(', ') + ']'
    }
    if (is(Object)(x)) {
      let y = '{ '
      const entries = []
      for (const k in x) entries.push(k + ': ' + fmt(x[k], depth + 1))
      y += entries.join(', ')
      y += ' }'
      return y
    }
    if (is(Set)(x)) {
      return 'Set { ' + [...map(xi => fmt(xi, depth + 1))(x)].join(', ') + ' }'
    }
    if (is(Map)(x)) {
      let y = 'Map { '
      const entries = []
      for (const [k, v] of x) entries.push(k + ' => ' + fmt(v, depth + 1))
      y += entries.join(', ')
      y += ' }'
      return y
    }
    return x
  }

  const console = {
    log: (...msgs) => {
      panel.innerHTML += msgs.map(fmt).join(' ')
      panel.innerHTML += '\\n'
    },
  }

  const trace = tap(console.log)

  try {
    ${code}
  } catch (e) {
    console.log(e)
  }
})
`.trim()

// code => html_string_with_code
const generateHTMLScript = code => {
  const script = document.createElement('script')
  script.innerHTML = templateCodeSandbox(code)
  return script
}

// HTMLElement => HTMLDocument
const renderIntoNewHTMLDoc = el => {
  const html = document.createElement('html')
  const body = document.createElement('body')
  body.appendChild(el)
  html.appendChild(body)
  return html
}

// HTMLElement => html_string
const htmlToString = el => {
  const div = document.createElement('div')
  div.appendChild(el)
  return div.innerHTML
}

// code => iframeSrc
const transformCodeToIFrameSrc = pipe([
  generateHTMLScript,
  renderIntoNewHTMLDoc,
  htmlToString,
  htmlString => `data:text/html;charset=utf-8,${encodeURI(htmlString)}`,
])

const CodeRunner = (() => {
  let getCode = () => {}
  return e(x => {
    const codeAreaRef = useRef(null)
    const outputAreaRef = useRef(null)
    const [outputAreaSrc, setOutputAreaSrc] = useState(null)
    useEffect(() => {
      const cm = CodeMirror(codeAreaRef.current, {
        value: x.code,
        mode: 'javascript',
        lineWrapping: true,
        lineNumbers: true,
        theme: 'default',
      })
      getCode = () => cm.getValue()
    }, [])
    return Div(null, [
      Div({ ref: codeAreaRef }),
      Div({
        style: {
          display: 'grid',
          gridTemplateColumns: '3em 1em auto',
          height: '10em',
        },
      }, [
        Button({
          style: {
            padding: '.25em .75em',
            borderRadius: '2px',
            cursor: 'pointer',
            height: '2em',
          },
          onClick: pipe([
            () => getCode(),
            transformCodeToIFrameSrc,
            iframeSrc => {
              setOutputAreaSrc(iframeSrc)
            },
          ]),
        }, ['run']),
        Span({
          style: {
            visibility: outputAreaSrc ? 'visible' : 'hidden',
            color: '#3f72fc',
            fontSize: '.80em',
            fontWeight: '625',
            position: 'relative',
            right: '-0.75em',
            bottom: '-0.65em',
          },
        }, [' >']),
        Iframe({
          style: {
            visibility: outputAreaSrc ? 'visible' : 'hidden',
            height: '10em',
            position: 'relative',
            bottom: '-0.05em',
          },
          src: outputAreaSrc,
        }),
      ]),
    ])
  })
})()

const TRANDUCERS_URL = 'https://github.com/a-synchronous/rubico#transducers'

const x = {
  assets: {
    lolSrc: 'https://tour.rubico.land/assets/thank-you-michael-scott.gif',
  },
  styles: {
    img: { height: '100%', width: '100%', maxWidth: '268px' },
    div: { backgroundColor: 'pink' },
  },
  clickMessage: 'hey',
  methods: {
    pipe: {
      example: 'y = pipe(functions)(x)',
      description: 'define flow, chain functions together 🔗',
      rules: [
        [SC('functions'), 'is an array of functions'],
        [SC('x'), 'is anything'],
        [
          'if', SC('x'), 'is a function,', SB('pipe'), 'chains',
          SC('functions'), 'from right to left, see', SLink(TRANDUCERS_URL, ['transducers']),
        ],
        [SC('y'), 'is the output of running', SC('x'), 'through the chain of', SC('functions')],
        [SC('y'), 'is wrapped in a Promise if any of the following are true'],
        [SList([
          ['any function of', SC('functions'), 'is asynchronous'],
        ])],
        [CodeRunner({
          code: `
console.log('hey')
console.log('hey')
console.log('hey')
console.log('hey')
          `.trimStart(),
        })],
      ],
    },
  },
}

render(document.getElementById('root'), Root(x))
