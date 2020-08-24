import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'migration',
  description: 'Create a migration inside /database/migrations folder',
  run: async toolbox => {
    const { print, parameters, createMigration } = toolbox

    const { first } = parameters

    if (!first) {
      print.error('Table name must be specified')
      return
    }

    createMigration(first)
  }
}

module.exports = command
