const config = {
  supportedClients: [
    'Outlook 2007–16',
    'Gmail',
    'Yahoo! Mail'
  ]
}

const styleValidator = require('../src')(config)

test('undefined style is valid', () => {
  const { isValid } = styleValidator({ style: undefined })
  expect(isValid).toBe(true)
})

test('empty object style is valid', () => {
  const { isValid } = styleValidator({ style: {} })
  expect(isValid).toBe(true)
})

test('valid style', () => {
  const style = { color: '#E0E0E0' }
  const { isValid } = styleValidator({ style })
  expect(isValid).toBe(true)
})

// todo: partially supported style

test('invalid style', () => {
  const style = { 'flex-basis': 'auto' }
  const { isValid, notSupported } = styleValidator({ style })
  expect(isValid).toBe(false)
  expect(notSupported.length).toBe(3)
  expect(notSupported[0].style).toBe('flex-basis')
})
