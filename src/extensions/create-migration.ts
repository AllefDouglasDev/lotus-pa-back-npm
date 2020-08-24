import { GluegunToolbox } from 'gluegun'

module.exports = (toolbox: GluegunToolbox) => {
  const { print, template } = toolbox

  async function createMigration(tableName) {
    if (!tableName) {
      print.error('Table name must be specified')
      return
    }

    const now = new Date().getTime()
    const migrationFileName = `${now}-create-${tableName.replace('_', '-')}.js`

    await template.generate({
      template: 'migration.ts.ejs',
      target: `src/database/migrations/${migrationFileName}`,
      props: { tableName }
    })

    print.success(`${migrationFileName} migration created`)
  }

  toolbox.createMigration = createMigration
}
