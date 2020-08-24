import { GluegunCommand } from 'gluegun'
import { camelToSnake } from '../utils/camel-change'

const command: GluegunCommand = {
  name: 'model:generate',
  description: 'Create a model inside /models folder',
  run: async toolbox => {
    const { print, parameters, createModel, createMigration } = toolbox

    const { first, options } = parameters

    if (!first) {
      print.error('Model name must be specified')
      return
    }

    const tableName = options.table || camelToSnake(first) + 's'

    createModel(first, tableName)

    if (options.migration || options.m) {
      createMigration(tableName)
    }
  }
}

module.exports = command
