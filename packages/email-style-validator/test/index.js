const tap = require('tap')

const config = {
  supportedClients: [
    'Outlook 2007–16',
    'Gmail',
    'Yahoo! Mail'
  ]
}

const styleValidator = require('../src')(config)

tap.test('undefined style is valid', t => {
  const { isValid } = styleValidator({ style: undefined })
  tap.equal(isValid, true)
  t.end()
})

tap.test('empty object style is valid', t => {
  const { isValid } = styleValidator({ style: {} })
  tap.equal(isValid, true)
  t.end()
})

tap.test('valid style', t => {
  const { isValid } = styleValidator({ style: { color: '#E0E0E0' } })
  tap.equal(isValid, true)
  t.end()
})

tap.test('partially supported style', t => {
  const {
    isValid,
    notSupported,
    partiallySupported
  } = styleValidator({ style: { font: 'sans-serif' } })

  tap.equal(isValid, true)
  tap.equal(notSupported.length, 0)
  tap.equal(partiallySupported.length, 1)
  tap.equal(partiallySupported[0].style, 'font')
  tap.equal(partiallySupported[0].client, 'Outlook 2007–16')
  tap.equal(
    partiallySupported[0].info,
    'Mostly supported, but the shorthand property fails to override font-weight.'
  )
  t.end()
})

tap.test('invalid style', t => {
  const {
    isValid,
    notSupported,
    partiallySupported
  } = styleValidator({ style: { 'flex-basis': 'auto' } })
  tap.equal(isValid, false)
  tap.equal(partiallySupported.length, 0)
  tap.equal(notSupported.length, 3)
  tap.equal(notSupported[0].style, 'flex-basis')
  t.end()
})
