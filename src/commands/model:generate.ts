import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'model:generate',
  description: 'Create a model inside /models folder',
  run: async toolbox => {
    const { print, parameters, template } = toolbox

    const { first, options } = parameters

    if (!first) {
      print.error('Model name must be specified')
      return
    }

    function camelToSnake(str: string): string {
      return str
        .replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
        .slice(1)
    }

    const tableName = options.table || camelToSnake(first) + 's'

    if (options.migration || options.m) {
      const now = new Date().getTime()
      const migrationFileName = `${now}-create-${tableName.replace(
        '_',
        '-'
      )}.js`

      await template.generate({
        template: 'migration.ts.ejs',
        target: `src/database/migrations/${migrationFileName}`,
        props: { tableName }
      })

      print.info(`${migrationFileName} migration created`)
    }

    await template.generate({
      template: 'model.ts.ejs',
      target: `src/models/${first}.ts`,
      props: { name: first, tableName }
    })

    print.success(`${first}.ts model created`)
  }
}

module.exports = command
