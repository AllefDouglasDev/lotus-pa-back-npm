import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'service',
  description:
    'Create a service and service type inside /services and /services/types folder',
  run: async toolbox => {
    const { print, parameters, createService } = toolbox

    const { first } = parameters

    if (!first) {
      print.error('Service name must be specified')
      return
    }

    createService(first)
  }
}

module.exports = command
