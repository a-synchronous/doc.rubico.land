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
          color: name === x.path ? 'darkred' : RUBICO_METHOD_COLOR,
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
          description: get('methods.fork.methods.0.description')(x),
        })(x),
      ]),
      RubicoAPIMethodLink({
        name: 'assign',
        description: get('methods.assign.description')(x),
      })(x),
      RubicoAPIMethodLink({
        name: 'tap',
        description: get('methods.tap.description')(x),
      })(x),
      RubicoAPIMethodLink({
        name: 'tryCatch',
        description: get('methods.tryCatch.description')(x),
      })(x),
      RubicoAPIMethodLink({
        name: 'switchCase',
        description: get('methods.switchCase.description')(x),
      })(x),
    ]),
  ]),
  Section(null, [
    RubicoAPIMethodHeader('transformation')(x),
    RubicoAPIMethodLinkList(x, [
      RubicoAPIMethodLink({
        name: 'map',
        description: get('methods.map.description')(x),
      })(x, [
        RubicoAPIMethodLinkDisabled({
          name: 'map.pool',
          description: get('methods.map.methods.1.description')(x),
        })(x),
        RubicoAPIMethodLinkDisabled({
          name: 'map.withIndex',
          description: get('methods.map.methods.2.description')(x),
        })(x),
        RubicoAPIMethodLinkDisabled({
          name: 'map.series',
          description: get('methods.map.methods.3.description')(x),
        })(x),
      ]),
      RubicoAPIMethodLink({
        name: 'filter',
        description: get('methods.filter.description')(x),
      })(x, [
        RubicoAPIMethodLinkDisabled({
          name: 'filter.withIndex',
          description: get('methods.filter.methods.1.description')(x),
        })(x),
      ]),
      RubicoAPIMethodLink({
        name: 'reduce',
        description: get('methods.reduce.description')(x),
      })(x),
      RubicoAPIMethodLink({
        name: 'transform',
        description: get('methods.transform.description')(x),
      })(x),
      RubicoAPIMethodLink({
        name: 'flatMap',
        description: get('methods.flatMap.description')(x),
      })(x),
    ]),
  ]),
  Section(null, [
    RubicoAPIMethodHeader('predicate composition')(x),
    RubicoAPIMethodLinkList(x, [
      RubicoAPIMethodLink({
        name: 'any',
        description: get('methods.any.description')(x),
      })(x),
      RubicoAPIMethodLink({
        name: 'all',
        description: get('methods.all.description')(x),
      })(x),
      RubicoAPIMethodLink({
        name: 'and',
        description: get('methods.and.description')(x),
      })(x),
      RubicoAPIMethodLink({
        name: 'or',
        description: get('methods.or.description')(x),
      })(x),
      RubicoAPIMethodLink({
        name: 'not',
        description: get('methods.not.description')(x),
      })(x),
    ]),
  ]),
  Section(null, [
    RubicoAPIMethodHeader('comparison')(x),
    RubicoAPIMethodLinkList(x, [
      RubicoAPIMethodLink({
        name: 'eq',
        description: get('methods.eq.description')(x),
      })(x),
      RubicoAPIMethodLink({
        name: 'gt',
        description: get('methods.gt.description')(x),
      })(x),
      RubicoAPIMethodLink({
        name: 'lt',
        description: get('methods.lt.description')(x),
      })(x),
      RubicoAPIMethodLink({
        name: 'gte',
        description: get('methods.gte.description')(x),
      })(x),
      RubicoAPIMethodLink({
        name: 'lte',
        description: get('methods.lte.description')(x),
      })(x),
    ]),
  ]),
  Section(null, [
    RubicoAPIMethodHeader('operation')(x),
    RubicoAPIMethodLinkList(x, [
      RubicoAPIMethodLink({
        name: 'get',
        description: get('methods.get.description')(x),
      })(x),
      RubicoAPIMethodLink({
        name: 'pick',
        description: get('methods.pick.description')(x),
      })(x),
      RubicoAPIMethodLink({
        name: 'omit',
        description: get('methods.omit.description')(x),
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
      position: 'relative',
      zIndex: 1,
      width: '100%',
    },
  }, [
    H1({ style: {
      padding: '2em 0em 0em',
      margin: 0,
      backgroundColor: BACKGROUND_COLOR,
      position: 'relative',
    } }, [x.name]),
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
    Div({
      style: { display: 'flex', justifyContent: 'center', flexWrap: 'wrap' },
    }, [
      Button({
        style: {
          visibility: x.prev ? 'visible' : 'hidden',
          backgroundColor: 'inherit',
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
          margin: '.25em 0',
          padding: '0 0',
          fontSize: '.8em',
        },
        onClick: () => { x.goto && x.goto(x.prev) },
      }, [
        H1({
          style: {
            margin: '0 0',
            color: RUBICO_METHOD_COLOR,
            fontSize: '3em',
            fontWeight: 700,
            display: 'flex',
          },
        }, [Span(null, [x.prev]), Span(null, [' < '])]),
      ]),
      Div({
        style: {
          display: 'flex',
        },
      }, [
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
            // textAlign: 'center',
            position: 'relative',
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
      ]),
      Button({
        style: {
          visibility: x.next ? 'visible' : 'hidden',
          backgroundColor: 'inherit',
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
          margin: '.25em 0',
          padding: '0 0',
          fontSize: '.8em',
        },
        onClick: () => { x.goto && x.goto(x.next) },
      }, [
        Span({
          style: {
            margin: '0 0',
            color: RUBICO_METHOD_COLOR,
            fontSize: '3em',
            fontWeight: 700,
            display: 'flex',
          },
        }, [Span(null, [' > ']), Span(null, [' ']), Span(null, [x.next])]),
      ]),
    ]),
  ])
})

const RubicoAPI = e(x => Div({
  style: { height: '100%' },
}, [
  Section(null, [RubicoAPIHomeLink(x)]),
  Section({
    style: {
      ...x.path ? ({
        maxHeight: '0%',
        transition: 'max-height .28s ease-out',
        visibility: 'hidden',
      }) : ({
        maxHeight: '25%',
        transition: 'max-height .48s ease-in',
        visibility: 'visible',
      }),
    },
  }, [
    P({
      style: {
        fontSize: '.9em',
        breakWord: 'auto',
        paddingInlineStart: '3em',
      },
    }, [I(null, ['a shallow river in northeastern Italy, just south of Ravenna'])]),
    Br(),
    P(null, [
      'Welcome to the API documentation for ',
      B(null, ['rubico']),
      ' - a robust, highly optimized, and dependency free syntax for async agnostic functional programming in JavaScript. This page only documents rubico\'s API methods. If you are looking for a fuller introduction, please visit the ',
      A({ href: 'https://github.com/a-synchronous/rubico' }, ['github repository']),
      '.',
    ]),
    P(null, [
      'The tags below denote points of interest for a given method',
    ]),
    Ul({
      style: { paddingInlineStart: '1em' },
    }, [
      Li({
        style: { listStyle: 'none' },
      }, ['🔗 - asynchronously executes functions in series']),
      Li({
        style: { listStyle: 'none' },
      }, ['⛓️  -  asynchronously executes functions in parallel']),
      Li({
        style: { listStyle: 'none' },
      }, ['🏎 - can be used to create transducers']),
    ]),
    P(null, [
      'All methods have a runnable and editable code example.',
    ]),
  ]),
  Br(), Br(),
  RubicoAPIMethods(x),
  /*
  Div({
    style: {
      position: 'relative',
      zIndex: 1,
      backgroundColor: BACKGROUND_COLOR,
      height: '5em',
    },
  }),
  */
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
  'tap', 'tryCatch', 'switchCase', 'flatMap',
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
    map, filter, reduce, transform, flatMap,
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

  trace = tap(console.log)

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
        height: '6em',
      },
    }, [
      Button({
        style: {
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
          height: '6em',
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
      description: 'define flow: chain functions together 🔗 🏎',
      next: 'fork',
      rules: [
        [SC('functions'), 'is an array of functions'],
        [SC('x'), 'is any value or function'],
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

const addAC = pipe([
  addA, // '' => 'A'
  addC, // 'A' => 'AC'
])

console.log(addAC(''))

const asyncAddABC = pipe([
  addA, // '' => 'A'
  asyncAddB, // 'A' => Promise { 'AB' }
  addC, // Promise { 'AB' } => Promise { 'ABC' }
])

asyncAddABC('').then(console.log)
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
        [SC('x'), 'is anything but a function'],
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

const greetAll = fork([
  greet('world'), // 'hello' => 'hello world'
  greet('mom'), // 'hello' => 'hello mom'
])

console.log(greetAll('hello'))

const asyncGreetAll = fork({
  toWorld: greet('world'), // 'hello => 'hello world'
  toMom: greet('mom'), // 'hello => 'hello mom'
  toAsync: async x => greet('async')(x), // 'hello => Promise { 'hello async' }
})

asyncGreetAll('hello').then(console.log)
`.trimStart(),
        })],
      ],
      methods: [
        {
          name: 'fork.series',
          signature: 'y = fork.series(functions)(x)',
          description: 'fork in series 🔗',
          rules: [
            [SC('functions'), 'is an array of functions or an object of functions'],
            ['all functions of', SC('functions'), 'are run in series'],
            [SC('x'), 'is anything but a function'],
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
const sleep = ms => () => new Promise(
  resolve => setTimeout(resolve, ms)
)

fork.series([
  x => console.log(x + ' world'),
  sleep(1000),
  x => console.log(x + ' mom'),
  sleep(1000),
  x => console.log(x + ' darkness'),
])('hello')
`.trimStart(),
            })],
          ],
        },
      ],
    },
    assign: {
      name: 'assign',
      signature: 'y = assign(functions)(x)',
      description: 'fork, then merge new flow with original ⛓️ ',
      prev: 'fork',
      next: 'tap',
      rules: [
        [SC('functions'), 'is an Object of functions'],
        ['all functions of', SC('functions'), 'are run concurrently'],
        [SC('x'), 'is an Object'],
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
const putKeys = assign({
  keys: Object.keys,
})

console.log(putKeys({ a: 1, b: 2, c: 3 }))

const asyncPutValues = assign({
  values: async x => Object.values(x),
})

asyncPutValues({ a: 1, b: 2, c: 3 }).then(console.log)
`.trimStart(),
        })],
      ],
    },
    tap: {
      name: 'tap',
      signature: 'y = tap(f)(x)',
      description: 'spy on flow 🏎',
      prev: 'assign',
      next: 'tryCatch',
      rules: [
        [SC('f'), 'is a function'],
        [SC('x'), 'is anything'],
        [SC('y'), 'is', SC('x')],
        [SC('y'), 'is a Promise if any of the following are true'],
        [SList([
          [SC('f'), 'is asynchronous'],
        ])],
        [CodeRunner({
          code: `
const trace = tap(console.log)

pipe([
  trace,
  x => x + 'bar',
  trace,
])('foo')
`.trimStart(),
        })],
      ],
      methods: [
        {
          name: 'tap (transducing)',
          signature: 'tapReducer = tap(f)(reducer)',
          description: 'tap for transducers',
          rules: [
            [SC('f'), 'is a function'],
            [SC('reducer'), 'is a reducer function'],
            [SC('tapReducer'), 'is', SC('reducer'), 'with effect', SC('f')],
            [CodeRunner({
              code: `
const trace = tap(console.log)

const add = (a, b) => a + b

const sum = [1, 2, 3].reduce(trace(add), 0)

console.log(sum)
`.trimStart(),
            })],
          ],
        },
      ],
    },
    tryCatch: {
      name: 'tryCatch',
      signature: 'y = tryCatch(tryer, catcher)(x)',
      description: 'try a function, catch with another 🔗',
      prev: 'tap',
      next: 'switchCase',
      rules: [
        [SC('tryer'), 'is a function'],
        [SC('catcher'), 'is a binary function of signature', SC('(err, x) => {...}')],
        [SList([
          [SC('err'), 'is an error potentially thrown by', SC('tryer')],
        ])],
        [SC('x'), 'is anything but a function'],
        [SC('y'), 'is', SC('tryer(x)'), 'or', SC('catcher(err, x)'), 'on error'],
        [SC('y'), 'is a Promise if any of the following are true'],
        [SList([
          [SC('tryer'), 'is asynchronous'],
          [SC('catcher'), 'is asynchronous and', SC('tryer'), 'threw'],
        ])],
        [CodeRunner({
          code: `
const errorThrower = tryCatch(
  message => { throw new Error(message) },
  (err, x) => { console.log(err); return x + ' from catcher' },
)

console.log(errorThrower('hello'))
`.trimStart(),
        })],
      ],
    },
    switchCase: {
      name: 'switchCase',
      signature: 'y = switchCase(functions)(x)',
      description: 'control flow 🔗',
      prev: 'tryCatch',
      next: 'map',
      rules: [
        [SC('functions'), 'is an array of functions', SC('[if1, do1, if2, do2, ..., ifN, doN, elseDo]')],
        [SList([
          [
            SC('if1, if2, ..., ifN'),
            'are predicate functions corresponding to do functions',
            SC('do1, do2, ..., doN'),
          ],
          [SC('elseDo'), 'is a do function'],
          [SC('functions'), 'is at minimum', SC('[if1, do1, elseDo]')],
        ])],
        [SC('x'), 'is anything but a function'],
        [
          SC('y'), 'is', SC('doN(x)'), 'where the corresponding',
          SC('ifN(x)'), 'is the first truthy predicate, or',
          SC('elseDo(x)'), 'on no truthy predicates',
        ],
        [SC('y'), 'is a Promise if any of the following are true'],
        [SList([
          ['any evaluated function of', SC('functions'), 'is asynchronous'],
        ])],
        [CodeRunner({
          code: `
const isOdd = x => x % 2 === 1

const evenOrOdd = switchCase([
  isOdd, () => 'odd',
  async () => 'even',
])

console.log(evenOrOdd(1))

evenOrOdd(2).then(console.log)
`.trimStart(),
        })],
      ],
    },
    map: {
      name: 'map',
      signature: 'y = map(f)(x)',
      description: 'linearly transform data ⛓ 🏎',
      prev: 'switchCase',
      next: 'filter',
      rules: [
        [SC('f'), 'is a function'],
        [SC('x'), 'is an Iterable, AsyncIterable, Object, or reducer function'],
        [SC('y'), 'is the linear transformation of', SC('x'), 'with', SC('f')],
        [SC('y'), 'is a Promise if any of the following are true'],
        [SList([
          [SC('f'), 'is asynchronous and', SC('x'), 'is not an AsyncIterable'],
        ])],
        [CodeRunner({
          code: `
const square = x => x ** 2

console.log(map(square)([1, 2, 3, 4, 5]))

console.log(map(Math.abs)(new Set([-2, -1, 0, 1, 2])))

const asyncTriple = async x => x * 3

map(asyncTriple)({ a: 1, b: 2, c: 3 }).then(console.log)
`.trimStart(),
        })],
      ],
      methods: [
        {
          name: 'map (transducing)',
          signature: 'mapReducer = map(f)(reducer)',
          description: 'map for transducers',
          rules: [
            [SC('f'), 'is a function'],
            [SC('reducer'), 'is a reducer function'],
            [
              SC('mapReducer'), 'is', SC('reducer'), 'with pipeline elements',
              'transformed according to', SC('f'),
            ],
            [CodeRunner({
              code: `
const square = x => x ** 2

const add = (a, b) => a + b

console.log(
  [1, 2, 3, 4, 5].reduce(map(square)(add), 0),
)
`.trimStart(),
            })],
          ],
        },
        {
          name: 'map.pool',
          signature: 'y = map.pool(poolSize, f)(x)',
          description: 'map with asynchronous limit ⛓️',
          rules: [
            [
              SC('poolSize'),
              'is the number of allowed asynchronous operations at any given moment'
            ],
            [SC('f'), 'is a function'],
            [SC('x'), 'is an Array, Set, or Map'],
            [SC('y'), 'is the linear transformation of', SC('x'), 'with', SC('f')],
            [SC('y'), 'is always a promise'],
            [CodeRunner({
              code: `
const delayedLog = x => new Promise(resolve => {
  setTimeout(() => {
    console.log(x)
    resolve(x)
  }, 1000)
})

console.log('start')
map.pool(2, delayedLog)([1, 2, 3, 4, 5])
`.trimStart(),
            })],
          ],
        },
        {
          name: 'map.withIndex',
          signature: 'y = map.withIndex(f)(x)',
          description: 'map with index ⛓️',
          rules: [
            [SC('f'), 'is a function'],
            [SC('x'), 'is an Array or String'],
            [SC('y'), 'is the linear transformation of', SC('x'), 'with', SC('f')],
            [SC('y'), 'is a Promise if any of the following are true'],
            [SList([
              [SC('f'), 'is asynchronous'],
            ])],
            [CodeRunner({
              code: `
console.log(
  map.withIndex((_, i) => i + 1)([0, 0, 0, 0, 0]),
)
`.trimStart(),
            })],
          ],
        },
        {
          name: 'map.series',
          signature: 'y = map.series(f)(x)',
          description: 'map in series 🔗',
          rules: [
            [SC('f'), 'is a function'],
            [SC('x'), 'is an Array'],
            [SC('y'), 'is the linear transformation of', SC('x'), 'with', SC('f')],
            [SC('y'), 'is a Promise if any of the following are true'],
            [SList([
              [SC('f'), 'is asynchronous'],
            ])],
            [CodeRunner({
              code: `
const delayedLog = x => new Promise(resolve => {
  setTimeout(() => {
    console.log(x)
    resolve(x)
  }, 1000)
})

console.log('start')
map.series(delayedLog)([1, 2, 3, 4, 5])
`.trimStart(),
            })],
          ],
        },
      ],
    },
    filter: {
      name: 'filter',
      signature: 'y = filter(f)(x)',
      description: 'exclude data by predicate ⛓ 🏎',
      prev: 'map',
      next: 'reduce',
      rules: [
        [SC('f'), 'is a predicate function'],
        [SC('x'), 'is an Iterable, AsyncIterable, Object, or reducer function'],
        [SC('y'), 'is', SC('x'), 'with elements excluded by', SC('f')],
        [SC('y'), 'is a Promise if any of the following are true'],
        [SList([
          [SC('f'), 'is asynchronous'],
        ])],
        [CodeRunner({
          code: `
const isOdd = x => x % 2 === 1

console.log(filter(isOdd)([1, 2, 3, 4, 5]))
console.log(filter(isOdd)({ a: 1, b: 2, c: 3 }))

const asyncIsOdd = async x => x % 2 === 1

filter(asyncIsOdd)(new Set([1, 2, 3, 4, 5])).then(console.log)
`.trimStart(),
        })],
      ],
      methods: [
        {
          name: 'filter (transducing)',
          signature: 'filterReducer = filter(f)(reducer)',
          description: 'filter for transducers',
          rules: [
            [SC('f'), 'is a predicate function'],
            [SC('reducer'), 'is a reducer function'],
            [
              SC('filterReducer'), 'is', SC('reducer'), 'with pipeline elements',
              'filtered according to predicate', SC('f'),
            ],
            [CodeRunner({
              code: `
const isOdd = x => x % 2 === 1

const concat = (arr, x) => arr.concat(x)

console.log(
  reduce(filter(isOdd)(concat), [])([1, 2, 3, 4, 5])
)
`.trimStart(),
            })],
          ],
        },
        {
          name: 'filter.withIndex',
          signature: 'y = filter.withIndex(f)(x)',
          description: 'filter with index ⛓️',
          rules: [
            [SC('f'), 'is a function'],
            [SC('x'), 'is an Array or String'],
            [SC('y'), 'is', SC('x'), 'with elements excluded by', SC('f')],
            [SC('y'), 'is a Promise if any of the following are true'],
            [SList([
              [SC('f'), 'is asynchronous'],
            ])],
            [CodeRunner({
              code: `
const uniqueInOrder = filter.withIndex((current, index, array) => {
  if (index === 0) {
    return true
  } else if (current === array[index - 1]) {
    return false
  } else {
    return true
  }
})

console.log(uniqueInOrder('AAAABBBCCDAABBB'))
console.log(uniqueInOrder('ABBCcAD'))
console.log(uniqueInOrder([1,2,2,3,3]))
`.trimStart(),
            })],
          ],
        },
      ],
    },
    reduce: {
      name: 'reduce',
      signature: 'y = reduce(f, x0)(x)',
      description: 'execute data transformation (idiomatic) 🔗 🏎',
      prev: 'filter',
      next: 'transform',
      rules: [
        [SC('f'), 'is a reducer function'],
        [SC('x0'), 'is an optional initial value for', SC('y')],
        [SC('x'), 'is an Iterable, AsyncIterable, or Object'],
        [SList([
          [SC('xi'), 'is an element of', SC('x')],
        ])],
        [SC('y'), 'is the last', SC('f(y, xi)'), 'upon iterating through each', SC('xi'), 'of', SC('x')],
        [SC('y'), 'is a Promise if any of the following are true'],
        [SList([
          [SC('f'), 'is asynchronous'],
          [SC('x'), 'is an AsyncIterable'],
        ])],
        [CodeRunner({
          code: `
const add = (a, b) => a + b

console.log(
  reduce(add, 0)([1, 2, 3, 4, 5]), // > 0 + 1 + 2 + 3 + 4 + 5
)

const asyncAdd = async (a, b) => a + b

reduce(
  asyncAdd,
  100,
)([1, 2, 3, 4, 5]).then(console.log) // 100 + 1 + 2 + 3 + 4 + 5

const asyncNumbersGeneratedIterable = (async function*() {
  for (let i = 0; i < 5; i++) { yield i + 1 }
})() // generated async iterable that yields 1 2 3 4 5

const concat = (y, xi) => y.concat([xi])

reduce(
  concat,
  [],
)(asyncNumbersGeneratedIterable).then(console.log) // > [1, 2, 3, 4, 5]
`.trimStart(),
        })],
      ],
    },
    transform: {
      name: 'transform',
      signature: 'y = transform(f, x0)(x)',
      description: 'execute data transformation (expressive) 🔗 🏎',
      prev: 'reduce',
      next: 'flatMap',
      rules: [
        [SC('f'), 'is a transducer, see', SLink(TRANDUCERS_URL, ['transducers'])],
        [SC('x0'), 'is null, Array, String, Set, Map, TypedArray, or Writable'],
        [SC('x'), 'is an Iterable, AsyncIterable, or Object'],
        [SC('y'), 'is', SC('x'), 'transformed with', SC('f'), 'into', SC('x0')],
        [SList([
          [SC('f'), 'is asynchronous'],
          [SC('x'), 'is an AsyncIterable'],
        ])],
        [SC('map'), 'is', SLink('#map', ['map'])],
        [CodeRunner({
          code: `
const square = x => x ** 2

console.log(
  transform(map(square), '')([1, 2, 3, 4, 5]), // > '1491625'
)

const asyncTriple = async x => x * 3

transform(
  map(asyncTriple),
  [],
)(new Set([1, 2, 3])).then(console.log) // > [3, 6, 9]

const asyncNumbersGeneratedIterable = (async function*() {
  for (let i = 0; i < 5; i++) { yield i + 1 }
})() // generated async iterable that yields 1 2 3 4 5

transform(
  map(square),
  new Set(),
)(asyncNumbersGeneratedIterable).then(console.log) // > Set { 1, 4, 9, 16, 25 }
`.trimStart(),
        })],
      ],
    },
    flatMap: {
      name: 'flatMap',
      signature: 'y = flatMap(f)(x)',
      description: 'one-to-many transform data ⛓ 🏎',
      prev: 'transform',
      next: 'any',
      rules: [
        [SC('f'), 'is a function'],
        [SC('x'), 'is an Iterable or reducer function'],
        [SList([
          ['elements of', SC('f(x)'), 'are Iterable or Object'],
        ])],
        [SC('f'), 'is applied to the elements of', SC('x'), 'in parallel'],
        [SC('y'), 'is the one-to-many, map then flatten transformation of', SC('x'), 'with', SC('f')],
        [SC('y'), 'is a Promise if any of the following are true'],
        [SList([
          [SC('f'), 'is asynchronous'],
        ])],
        [CodeRunner({
          code: `
const powers = x => [x ** 2, x ** 3]

console.log(
  flatMap(powers)([1, 2, 3]),
)

console.log(
  flatMap(powers)(new Set([1, 2, 3]))
)
          `.trimStart(),
        })],
      ],
      methods: [
        {
          name: 'flatMap (transducing)',
          signature: 'flatMapReducer = flatMap(f)(reducer)',
          description: 'flatMap for transducers',
          rules: [
            [SC('f'), 'is a function'],
            [SC('reducer'), 'is a reducer function'],
            [
              SC('flatMapReducer'), 'is', SC('reducer'), 'with pipeline elements',
              'transformed according to', SC('f'), 'then flattened into the aggregate',
            ],
            [CodeRunner({
              code: `
const powers = x => [x ** 2, x ** 3]

console.log(
  transform(flatMap(powers), () => [])([1, 2, 3]),
)
              `.trimStart(),
            })],
          ],
        },
      ],
    },
    any: {
      name: 'any',
      signature: 'y = any(f)(x)',
      description: 'test if function of any data truthy ⛓️',
      prev: 'flatMap',
      next: 'all',
      rules: [
        [SC('f'), 'is a function'],
        [SC('x'), 'is an Iterable or Object'],
        [SC('y'), 'is true if any evaluations of', SC('f'), 'with the elements of', SC('x'), 'are truthy'],
        [SC('y'), 'is a Promise if any of the following are true'],
        [SList([
          [SC('f'), 'is asynchronous'],
        ])],
        [CodeRunner({
          code: `
const isOdd = x => x % 2 === 1

console.log(any(isOdd)([1, 2, 3, 4, 5])) // > true

const asyncIsOdd = async x => x % 2 === 1

any(asyncIsOdd)({ b: 2, d: 4 }).then(console.log) // > false
`.trimStart(),
        })],
      ],
    },
    all: {
      name: 'all',
      signature: 'y = all(f)(x)',
      description: 'test if function of all data truthy ⛓️',
      prev: 'any',
      next: 'and',
      rules: [
        [SC('f'), 'is a function'],
        [SC('x'), 'is an Iterable or Object'],
        [SC('y'), 'is true if all evaluations of', SC('f'), 'with the elements of', SC('x'), 'are truthy'],
        [SC('y'), 'is a Promise if any of the following are true'],
        [SList([
          [SC('f'), 'is asynchronous'],
        ])],
        [CodeRunner({
          code: `
const exists = x => x !== undefined && x !== null

console.log(all(exists)([1, 2, 3, 4, 5])) // > true

const asyncExists = async x => x !== undefined && x !== null

all(asyncExists)({ a: 1, b: 2, c: null }).then(console.log) // > false
`.trimStart(),
        })],
      ],
    },
    and: {
      name: 'and',
      signature: 'y = and(functions)(x)',
      description: 'test if all functions of data truthy ⛓️',
      prev: 'all',
      next: 'or',
      rules: [
        [SC('functions'), 'is an array of functions'],
        [SC('x'), 'is anything but a function'],
        [SC('y'), 'is true if all functions of', SC('functions'), 'evaluated with', SC('x'), 'are truthy'],
        [SC('y'), 'is a Promise if any of the following are true'],
        [SList([
          ['any function of', SC('functions'), 'is asynchronous'],
        ])],
        [CodeRunner({
          code: `
const isOdd = x => x % 2 === 1

const asyncIsOdd = async x => x % 2 === 1

const lessThan3 = x => x < 3

console.log(and([isOdd, lessThan3])(1)) // > true

and([asyncIsOdd, lessThan3])(3).then(console.log) // > false
`.trimStart(),
        })],
      ],
    },
    or: {
      name: 'or',
      signature: 'y = or(functions)(x)',
      description: 'test if any functions of data truthy ⛓️',
      prev: 'and',
      next: 'not',
      rules: [
        [SC('functions'), 'is an array of functions'],
        [SC('x'), 'is anything but a function'],
        [SC('y'), 'is true if any functions of', SC('functions'), 'evaluated with', SC('x'), 'are truthy'],
        [SC('y'), 'is a Promise if any of the following are true'],
        [SList([
          ['any function of', SC('functions'), 'is asynchronous'],
        ])],
        [CodeRunner({
          code: `
const isOdd = x => x % 2 === 1

const asyncIsOdd = async x => x % 2 === 1

const lessThan3 = x => x < 3

console.log(or([isOdd, lessThan3])(5)) // > true

or([asyncIsOdd, lessThan3])(6).then(console.log) // > false
`.trimStart(),
        })],
      ],
    },
    not: {
      name: 'not',
      signature: 'y = not(f)(x)',
      description: 'test if function of data falsy',
      prev: 'or',
      next: 'eq',
      rules: [
        [SC('f'), 'is a predicate function'],
        [SC('x'), 'is anything but a function'],
        [SC('y'), 'is true if', SC('f(x)'), 'is falsy'],
        [SC('y'), 'is a Promise if any of the following are true'],
        [SList([
          [SC('f'), 'is asynchronous'],
        ])],
        [CodeRunner({
          code: `
const isOdd = x => x % 2 === 1

console.log(not(isOdd)(2)) // > true

not(async x => isOdd(x))(1).then(console.log) // false
`.trimStart(),
        })],
      ],
    },
    eq: {
      name: 'eq',
      signature: 'y = eq(left, right)(x)',
      description: 'test if left equals right',
      prev: 'not',
      next: 'gt',
      rules: [
        [SC('left'), 'is any value or function'],
        [SC('right'), 'is any value or function'],
        [SC('x'), 'is anything but a function'],
        [SC('y'), 'is true if', SC('leftCompare'), 'strictly equals', SC('rightCompare')],
        [SList([
          [SC('leftCompare'), 'is', SC('left'), 'if left is a non-function value, else', SC('left(x)')],
          [SC('rightCompare'), 'is', SC('right'), 'if right is a non-function value, else', SC('right(x)')],
        ])],
        [SC('y'), 'is a Promise if any of the following are true'],
        [SList([
          [SC('left'), 'is an asynchronous function'],
          [SC('right'), 'is an asynchronous function'],
        ])],
        [CodeRunner({
          code: `
const square = x => x ** 2

const asyncSquare = async x => x ** 2

console.log(eq(square, 1)(1)) // > true

eq(1, asyncSquare)(1).then(console.log) // > true
`.trimStart(),
        })],
      ],
    },
    gt: {
      name: 'gt',
      signature: 'y = gt(left, right)(x)',
      description: 'test if left > right',
      prev: 'eq',
      next: 'lt',
      rules: [
        [SC('left'), 'is any value or function'],
        [SC('right'), 'is any value or function'],
        [SC('x'), 'is anything but a function'],
        [SC('y'), 'is true if', SC('leftCompare'), 'is greater than', SC('rightCompare')],
        [SList([
          [SC('leftCompare'), 'is', SC('left'), 'if left is a non-function value, else', SC('left(x)')],
          [SC('rightCompare'), 'is', SC('right'), 'if right is a non-function value, else', SC('right(x)')],
        ])],
        [SC('y'), 'is a Promise if any of the following are true'],
        [SList([
          [SC('left'), 'is an asynchronous function'],
          [SC('right'), 'is an asynchronous function'],
        ])],
        [CodeRunner({
          code: `
console.log(gt(x => x, 10)(11)) // > true

gt(10, async x => x)(11).then(console.log) // > false
`.trimStart(),
        })],
      ],
    },
    lt: {
      name: 'lt',
      signature: 'y = lt(left, right)(x)',
      description: 'test if left < right',
      prev: 'gt',
      next: 'gte',
      rules: [
        [SC('left'), 'is any value or function'],
        [SC('right'), 'is any value or function'],
        [SC('x'), 'is anything but a function'],
        [SC('y'), 'is true if', SC('leftCompare'), 'is less than', SC('rightCompare')],
        [SList([
          [SC('leftCompare'), 'is', SC('left'), 'if left is a non-function value, else', SC('left(x)')],
          [SC('rightCompare'), 'is', SC('right'), 'if right is a non-function value, else', SC('right(x)')],
        ])],
        [SC('y'), 'is a Promise if any of the following are true'],
        [SList([
          [SC('left'), 'is an asynchronous function'],
          [SC('right'), 'is an asynchronous function'],
        ])],
        [CodeRunner({
          code: `
console.log(lt(x => x, 10)(11)) // > false

lt(10, async x => x)(11).then(console.log) // > true
`.trimStart(),
        })],
      ],
    },
    gte: {
      name: 'gte',
      signature: 'y = gte(left, right)(x)',
      description: 'test if left >= right',
      prev: 'lt',
      next: 'lte',
      rules: [
        [SC('left'), 'is any value or function'],
        [SC('right'), 'is any value or function'],
        [SC('x'), 'is anything but a function'],
        [SC('y'), 'is true if', SC('leftCompare'), 'is greater than or equal to', SC('rightCompare')],
        [SList([
          [SC('leftCompare'), 'is', SC('left'), 'if left is a non-function value, else', SC('left(x)')],
          [SC('rightCompare'), 'is', SC('right'), 'if right is a non-function value, else', SC('right(x)')],
        ])],
        [SC('y'), 'is a Promise if any of the following are true'],
        [SList([
          [SC('left'), 'is an asynchronous function'],
          [SC('right'), 'is an asynchronous function'],
        ])],
        [CodeRunner({
          code: `
console.log(gte(x => x, 10)(10)) // > true

gte(10, async x => x)(10).then(console.log) // > true
`.trimStart(),
        })],
      ],
    },
    lte: {
      name: 'lte',
      signature: 'y = lte(left, right)(x)',
      description: 'test if left <= right',
      prev: 'gte',
      next: 'get',
      rules: [
        [SC('left'), 'is any value or function'],
        [SC('right'), 'is any value or function'],
        [SC('x'), 'is anything but a function'],
        [SC('y'), 'is true if', SC('leftCompare'), 'is less than or equal to', SC('rightCompare')],
        [SList([
          [SC('leftCompare'), 'is', SC('left'), 'if left is a non-function value, else', SC('left(x)')],
          [SC('rightCompare'), 'is', SC('right'), 'if right is a non-function value, else', SC('right(x)')],
        ])],
        [SC('y'), 'is a Promise if any of the following are true'],
        [SList([
          [SC('left'), 'is an asynchronous function'],
          [SC('right'), 'is an asynchronous function'],
        ])],
        [CodeRunner({
          code: `
console.log(lte(x => x, 10)(10)) // > true

lte(10, async x => x)(10).then(console.log) // > true
`.trimStart(),
        })],
      ],
    },
    get: {
      name: 'get',
      signature: 'y = get(path, defaultValue)(x)',
      description: 'access a value by path or index',
      prev: 'lte',
      next: 'pick',
      rules: [
        [SC('path'), 'is a Number, String, dot-delimited String, or Array'],
        [SC('defaultValue'), 'is anything including a function and is optional'],
        ['if', SC('defaultValue'), 'is a function, it is lazily evaluated as', SC('defaultValue(x)')],
        [SC('x'), 'is an Object'],
        [SC('y'), 'is the value that lies at the end of', SC('path')],
        [CodeRunner({
          code: `
console.log(
  get('a')({ a: 1, b: 2 }), // > 1
)

console.log(
  get('a', 10)({}), // > 10
)

console.log(
  get(0)(['hello', 'world']), // > 'hello'
)

console.log(
  get('a.b.c')({ a: { b: { c: 'hey' } } }), // > 'hey'
)

console.log(
  get([0, 'user', 'id'])([
    { user: { id: '1' } },
    { user: { id: '2' } },
  ]), // > 1
)
`.trimStart(),
        })],
      ],
    },
    pick: {
      name: 'pick',
      signature: 'y = pick(properties)(x)',
      description: 'only include provided properties',
      prev: 'get',
      next: 'omit',
      rules: [
        [SC('properties'), 'is an array of Strings'],
        [SC('x'), 'is an Object'],
        [SC('y'), 'is an Object composed of all properties enumerated in', SC('properties'), 'and defined in', SC('x')],
        [CodeRunner({
          code: `
console.log(
  pick(['a', 'b'])({ a: 1, b: 2, c: 3 }), // => { a: 1, b: 2 }
)

console.log(
  pick(['d'])({ a: 1, b: 2, c: 3 }), // => {}
)
`.trimStart(),
        })],
      ],
    },
    omit: {
      name: 'omit',
      signature: 'y = omit(properties)(x)',
      description: 'exclude provided properties',
      prev: 'pick',
      rules: [
        [SC('properties'), 'is an array of Strings'],
        [SC('x'), 'is an Object'],
        [SC('y'), 'is an Object composed of every property in', SC('x'), 'except for those enumerated in', SC('properties')],
        [CodeRunner({
          code: `
console.log(
  omit(['a', 'b'])({ a: 1, b: 2, c: 3 }), // => { c: 3 }
)

console.log(
  omit(['d'])({ a: 1, b: 2, c: 3 }), // => { a: 1, b: 2, c: 3 }
)
`.trimStart(),
        })],
      ],
    },
  },
}

render(document.getElementById('root'), Root(x))
