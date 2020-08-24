import { GluegunToolbox } from 'gluegun'

module.exports = (toolbox: GluegunToolbox) => {
  const { print, template } = toolbox

  async function createModel(modelName, tableName) {
    if (!modelName) {
      print.error('Model name must be specified')
      return
    }

    await template.generate({
      template: 'model.ts.ejs',
      target: `src/models/${modelName}.ts`,
      props: { name: modelName, tableName }
    })

    print.success(`${modelName}.ts model created`)
  }

  toolbox.createModel = createModel
}
