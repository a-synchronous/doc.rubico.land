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

const BACKGROUND_COLOR = 'aliceblue'
const RUBICO_TITLE_COLOR = 'steelblue'
const RUBICO_HEADING_COLOR = 'darkslategrey'
const RUBICO_METHOD_COLOR = 'steelblue'

const CODE_STYLE = {
  // backgroundColor: 'darkslategrey',
  backgroundColor: 'aliceblue',
  // color: 'white',
  color: 'darkslategrey',
  fontFamily: 'monospace',
}

const RubicoAPIHomeLink = e(x => {
  return Div(null, [
    Button({
      style: {
        backgroundColor: 'inherit',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        padding: '0 0',
        display: 'flex',
      },
      onClick: () => { x.gotoHome() },
    }, [
      Img({
        src: x.assets.nationalParkEmoji,
        alt: x.assets.nationalParkEmoji,
        style: { width: '45px', height: '45px', margin: '1em' },
      }),
      H1({
        style: {
          color: RUBICO_TITLE_COLOR,
          fontSize: '2.25em',
        },
      }, ['rubico']),
    ]),
  ])
})

const RubicoAPIMethodHeader = heading => e(x => H2({
  style: {
    color: RUBICO_HEADING_COLOR,
    margin: x.path ? '0' : '0em auto',
  },
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
        backgroundColor: 'inherit',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        margin: '.25em 0',
        padding: '0 0',
      },
      onClick: () => { x.goto(name) },
    }, [
      H2({
        style: {
          margin: '0 0',
          color: name === x.path ? 'coral' : RUBICO_METHOD_COLOR,
          textDecoration: name === x.path ? 'underline' : 'none',
        },
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
        backgroundColor: 'inherit',
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

const RubicoAPIMethods = e(x => Div({
  style: {
    backgroundColor: BACKGROUND_COLOR,
    position: 'relative',
    zIndex: 1,
    width: '100%',
  },
}, [
  Section(null, [
    RubicoAPIMethodHeader('dataflow')(x),
    RubicoAPIMethodLinkList(x, [
      RubicoAPIMethodLink({
        name: 'pipe',
        description: get('methods.pipe.description')(x),
      })(x),
      RubicoAPIMethodLink({
        name: 'fork',
        description: get('methods.fork.description')(x),
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
]))

const RubicoAPIMethodRule = (children, i) => Li({
  style: {
    listStyle: 'none',
    margin: '1em 0em',
  },
  key: i,
}, map(child => Span({
  style: { marginRight: '.35em' },
}, [child]))(children))

const RubicoAPIMethod = e(x => {
  return Div({
    id: 'anchor',
    style: {
      padding: '2em 0em',
      position: 'relative',
      zIndex: 1,
      width: '100%',
    },
  }, [
    H1(null, [x.name]),
    P(null, [x.description]),
    Code(null, [Pre({
      style: {
        ...CODE_STYLE,
        padding: '.5em 1em',
        borderRadius: '1em',
      },
    }, [x.signature])]),
    Ul(null, [map.withIndex(RubicoAPIMethodRule)(x.rules || [])]),
    Div(null, [
      map.withIndex(pipe([
        (xi, i) => ({ ...xi, i }),
        xi => Div({ key: xi.i }, [RubicoAPIMethod(xi)]),
      ]))(x.methods || []),
    ]),
    Div({ style: { display: 'flex', justifyContent: 'center' } }, [
      Button({
        style: {
          visibility: x.prev ? 'visible' : 'hidden',
          backgroundColor: 'inherit',
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
          margin: '.25em 0',
          padding: '0 0',
        },
        onClick: () => { x.goto && x.goto(x.prev) },
      }, [
        H1({
          style: {
            margin: '0 0',
            color: RUBICO_METHOD_COLOR,
            fontSize: '3em',
          },
        }, [x.prev, ' < ']),
      ]),
      H1({
        style: {
          visibility: x.prev ? 'visible' : 'hidden',
          margin: '0 0',
          color: 'black',
          fontSize: '3em',
          fontWeight: 700,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        },
      }, ['<']),
      H1({
        style: {
          display: typeof x.i === 'undefined' ? 'block' : 'none',
          color: 'black',
          margin: '1em .5em',
          lineHeight: '1em',
          fontSize: '2.5em',
        },
      }, [x.name]),
      H1({
        style: {
          visibility: x.next ? 'visible' : 'hidden',
          margin: '0 0',
          color: 'black',
          fontSize: '3em',
          fontWeight: 700,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        },
      }, ['>']),
      Button({
        style: {
          visibility: x.next ? 'visible' : 'hidden',
          backgroundColor: 'inherit',
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
          margin: '.25em 0',
          padding: '0 0',
        },
        onClick: () => { x.goto && x.goto(x.next) },
      }, [
        Span({
          style: {
            margin: '0 0',
            color: RUBICO_METHOD_COLOR,
            fontSize: '3em',
            fontWeight: 700,
          },
        }, ['> ', x.next]),
      ]),
    ]),
  ])
})

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
      transition: 'max-height .48s ease-in',
    }),
  }, [
    P({
      style: {
        fontSize: '0.8em',
        paddingInlineStart: '3em',
      },
    }, [I(null, ['a shallow river in northeastern Italy, just south of Ravenna'])]),
    Br(),
    P(null, [
      'Welcome to the API documentation for ',
      B(null, ['rubico']),
      ', a robust, highly optimized, and dependency free syntax for async agnostic functional programming in JavaScript. This page only documents rubico\'s API methods. If you are looking for a fuller introduction, please visit the ',
      A({ href: 'https://github.com/a-synchronous/rubico' }, ['github repository']),
      '.',
    ]),
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
  Br(), Br(),
  RubicoAPIMethods(x),
  Section({
    style: {
      position: 'relative',
      zIndex: 1,
      ...x.path && x.prevPath && x.isTransitioning ? ({
        display: 'block',
        opacity: 0,
        filter: 'grayscale(1)',
        transition: 'opacity .5s, filter .65s',
      }) : x.path && x.prevPath ? ({
        display: 'block',
        opacity: 1,
        filter: 'grayscale(0)',
        transition: 'opacity 1s, filter .85s',
      }) : x.path ? ({
        display: 'block',
      }) : ({
        display: 'none',
      }),
    },
  }, [
    RubicoAPIMethod({
      ...x.isTransitioning ? x.methods[x.prevPath] : x.method,
      goto: x.goto,
    })
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

const cleanHash = hash => hash.startsWith('#') ? hash.slice(1) : hash

const Root = e(x => {
  const [{
    hash,
    prevHash,
    isTransitioning,
  }, dispatch] = useReducer(
    (state, action) => switchCase([
      eq('EXIT_TRANSITION', get('type')), action => ({
        ...state, isTransitioning: false,
      }),
      eq('GOTO', get('type')), action => action.hash === state.hash ? state : ({
        hash: action.hash,
        prevHash: state.hash,
        isTransitioning: action.hash && !!state.hash,
      }),
      () => state,
    ])(action),
    {
      hash: cleanHash(location.hash),
      prevHash: '',
      isTransitioning: false,
    },
  )
  useEffect(() => {
    if (!isTransitioning) return
    setTimeout(() => {
      if (!isTransitioning) return
      dispatch({ type: 'EXIT_TRANSITION' })
    }, 500)
  })
  useEffect(() => {
    const setLocationHash = () => {
      dispatch({ type: 'GOTO', hash: cleanHash(location.hash) })
    }
    window.addEventListener('popstate', setLocationHash)
    return () => {
      window.removeEventListener('popstate', setLocationHash)
    }
  })
  return pipe([
    assign({
      gotoHome: () => () => {
        history.pushState({}, '', '/')
        dispatch({ type: 'GOTO', hash: '' })
      },
      goto: () => methodName => {
        document.getElementById('anchor').scrollIntoView({
          behavior: 'smooth',
        })
        history.pushState({ path: methodName }, '', '#' + methodName)
        dispatch({ type: 'GOTO', hash: methodName })
      },
      path: () => hash,
      prevPath: () => prevHash,
      isTransitioning: () => isTransitioning,
      method: get(['methods', hash]),
    }),
    switchCase([
      or([
        eq('', hash),
        x => rubicoAPIMethods.has(x.path),
      ]), x => Div({
        style: {
          display: 'grid',
        }, // TODO: figure out why this has to be here
      }, [RubicoAPI(x)]),
      NotFound,
    ]),
  ])(x)
})

const SC = code => Code({
  style: { ...CODE_STYLE, padding: '0' },
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
  import('https://unpkg.com/rubico@1/index.js'),
]).then(() => {
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

const codeMirrors = new Map()

const CodeRunner = e(x => {
  const codeAreaRef = useRef(null)
  const outputAreaRef = useRef(null)
  const [outputAreaSrc, setOutputAreaSrc] = useState(null)
  useEffect(() => {
    if (!codeMirrors.has(codeAreaRef)) return
    codeMirrors.get(codeAreaRef).getDoc().setValue(x.code)
    setOutputAreaSrc(null)
  }, [x.code])
  useEffect(() => {
    const cm = CodeMirror(codeAreaRef.current, {
      value: x.code,
      mode: 'javascript',
      lineWrapping: true,
      lineNumbers: true,
      theme: 'rubico',
    })
    codeMirrors.set(codeAreaRef, cm)
    return () => {
      codeMirrors.delete(codeAreaRef)
    }
  }, [])
  return Div(null, [
    Div({ ref: codeAreaRef }),
    Div({ style: { height: '.5em' } }),
    Div({
      style: {
        display: 'grid',
        gridTemplateColumns: '3em 1em auto',
        height: '5em',
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
          () => codeMirrors.get(codeAreaRef).getValue(),
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
          height: '5em',
          position: 'relative',
          bottom: '-0.05em',
        },
        src: outputAreaSrc,
      }),
    ]),
  ])
})

const TRANDUCERS_URL = 'https://github.com/a-synchronous/rubico#transducers'

const x = {
  assets: {
    lolSrc: 'https://tour.rubico.land/assets/thank-you-michael-scott.gif',
    nationalParkEmoji: 'assets/national-park-emoji.png',
  },
  styles: {
    img: { height: '100%', width: '100%', maxWidth: '268px' },
    div: { backgroundColor: 'pink' },
  },
  clickMessage: 'hey',
  methods: {
    pipe: {
      name: 'pipe',
      signature: 'y = pipe(functions)(x)',
      description: 'chain functions together, define flow 🔗',
      next: 'fork',
      rules: [
        [SC('functions'), 'is an array of functions'],
        [SC('x'), 'is anything'],
        [
          'if', SC('x'), 'is a function,', SB('pipe'), 'chains',
          SC('functions'), 'from right to left, see', SLink(TRANDUCERS_URL, ['transducers']),
        ],
        [SC('y'), 'is the output of running', SC('x'), 'through the chain of', SC('functions')],
        [SC('y'), 'is a Promise if any of the following are true'],
        [SList([
          ['any function of', SC('functions'), 'is asynchronous'],
        ])],
        [CodeRunner({
          code: `
const addA = x => x + 'A'

const asyncAddB = async x => x + 'B'

const addC = x => x + 'C'

const AC = pipe([
  addA, // '' => 'A'
  addC, // 'A' => 'AC'
])('')

console.log(AC)

const ABCPromise = pipe([
  addA, // '' => 'A'
  asyncAddB, // 'A' => Promise { 'AB' }
  addC, // 'AB' => 'ABC'
])('')

ABCPromise.then(ABC => console.log(ABC))
`.trimStart(),
        })],
      ],
    },
    fork: {
      name: 'fork',
      signature: 'y = fork(functions)(x)',
      description: 'duplicate and diverge flow ⛓️',
      prev: 'pipe',
      next: 'assign',
      rules: [
        [SC('functions'), 'is an array of functions or an object of functions'],
        ['all functions of', SC('functions'), 'are run concurrently'],
        [SC('x'), 'is anything'],
        [
          SC('y'), 'is the', SC('functions'),
          '-shaped product of applying each function to', SC('x'),
        ],
        [SC('y'), 'is a Promise if any of the following are true'],
        [SList([
          ['any function of', SC('functions'), 'is asynchronous'],
        ])],
        [CodeRunner({
          code: `
const greet = whom => greeting => greeting + ' ' + whom

const asyncGreet = whom => async greeting => greeting + ' ' + whom

const helloArray = fork([
  greet('world'), // 'hello' => 'hello world'
  greet('mom'), // 'hello' => 'hello mom'
])('hello')

console.log(helloArray)

const helloObjectPromise = fork({
  toWorld: greet('world'), // 'hello => 'hello world'
  toMom: greet('mom'), // 'hello => 'hello mom'
  toAsync: asyncGreet('async'), // 'hello => Promise { 'hello async' }
})('hello')

helloObjectPromise.then(helloObject => console.log(helloObject))
`.trimStart(),
        })],
      ],
      methods: [
        {
          name: 'fork.series',
          signature: 'y = fork.series(functions)(x)',
          description: 'fork in series 🔗',
          rules: [
            ['all functions of', SC('functions'), 'are run in series'],
          ],
        },
      ],
    },
    assign: {
      name: 'assign',
      signature: 'y = assign(functions)(x)',
      description: 'fork, then merge new flow with original ⛓️',
      prev: 'fork',
      next: 'tap',
      rules: [
        [SC('functions'), 'is an object of functions'],
        ['all functions of', SC('functions'), 'are run concurrently'],
        [SC('x'), 'is an object'],
        [
          SC('y'), 'is the original input merged with', 'the', SC('functions'),
          '-shaped product of applying each function to', SC('x'),
        ],
        [SC('y'), 'is a Promise if any of the following are true'],
        [SList([
          ['any function of', SC('functions'), 'is asynchronous'],
        ])],
        [CodeRunner({
          code: `
const add = (a, b) => a + b

const putTotal = assign({
  sum: x => x.values.reduce(add),
})

`.trimStart(),
        })],
      ],
    },
  },
}

render(document.getElementById('root'), Root(x))
