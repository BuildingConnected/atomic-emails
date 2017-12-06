const styleSupport = require('./style-support.json')

module.exports = function styleValidatorConstructor ({ supportedClients }) {
  return function styleValidator ({ style = {}, componentName }) {
    const notSupported = []
    const partiallySupported = []

    const styleNames = Object.keys(style)

    if (!styleNames.length) {
      return {
        isValid: true,
        notSupported,
        partiallySupported
      }
    }

    styleNames.forEach(styleName => {
      const supportInfo = styleSupport[styleName]

      if (!supportInfo) {
        throw new Error(`Unknown style: "${styleName}"`)
      }

      supportedClients.forEach(client => {
        const { supportLevel, info } = supportInfo[client]
        if (supportLevel === 'partial' || info) {
          partiallySupported.push({
            style: styleName,
            client,
            componentName,
            info
          })
        } else if (supportLevel === 'not supported') {
          notSupported.push({
            style: styleName,
            client,
            componentName
          })
        }
      })
    })

    return {
      isValid: notSupported.length === 0,
      notSupported,
      partiallySupported
    }
  }
}
