import { GluegunToolbox } from 'gluegun'

module.exports = (toolbox: GluegunToolbox) => {
  const { print, template } = toolbox

  async function createService(modelName) {
    if (!modelName) {
      print.error('Service name must be specified')
      return
    }

    const varName = modelName.charAt(0).toLowerCase() + modelName.slice(1)

    await template.generate({
      template: 'service.ts.ejs',
      target: `src/services/${modelName}Service.ts`,
      props: { modelName, varName }
    })

    await template.generate({
      template: 'service-interface.ts.ejs',
      target: `src/services/types/I${modelName}Service.ts`,
      props: { modelName }
    })

    print.success(`${modelName}Service.ts and I${modelName}Service created`)
  }

  toolbox.createService = createService
}
