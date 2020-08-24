import { GluegunCommand } from 'gluegun'
import { camelToSnake } from '../utils/camel-change'

const command: GluegunCommand = {
  name: 'model',
  description: 'Create a model inside /models folder',
  run: async toolbox => {
    const {
      print,
      parameters,
      createModel,
      createMigration,
      createService
    } = toolbox

    const { first: modelName, options } = parameters

    if (!modelName) {
      print.error('Model name must be specified')
      return
    }

    const tableName = options.table || camelToSnake(modelName) + 's'

    createModel(modelName, tableName)

    if (options.migration || options.m) {
      createMigration(tableName)
    }

    if (options.service || options.s) {
      createService(modelName)
    }
  }
}

module.exports = command
