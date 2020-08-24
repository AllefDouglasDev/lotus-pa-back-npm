import { GluegunToolbox } from 'gluegun'

module.exports = (toolbox: GluegunToolbox) => {
  const { print, template } = toolbox

  async function createMigration(tableName) {
    if (!tableName) {
      print.error('Table name must be specified')
      return
    }

    function addZero(value: number): string {
      return value < 10 ? `0${value}` : String(value)
    }

    const date = new Date()
    const year = addZero(date.getFullYear())
    const month = addZero(date.getMonth())
    const day = addZero(date.getDay())
    const hour = addZero(date.getHours())
    const min = addZero(date.getMinutes())
    const sec = addZero(date.getSeconds())

    const now = `${year}${month}${day}${hour}${min}${sec}`
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
