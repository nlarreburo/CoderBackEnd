const { commander } = require('../utils/commander');
const { createLogger, transports, format } = require('winston')

const { mode } = commander.opts()

const customLevelsOptions = {
    // Definir niveles de prioridad
    levels : {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    
    // Colores para cada nivel de prioridad
    colors : {
      debug: 'blue',
      http: 'green',
      info: 'cyan',
      warning: 'yellow',
      error: 'red',
      fatal: 'magenta'
    }
}


// Configuración del logger para desarrollo
const developmentLogger = createLogger({
  levels: customLevelsOptions.levels,
  transports: [
      new transports.Console({
          level: 'debug',
          format: format.combine(
            format.colorize({ colors: customLevelsOptions.colors}),
            format.simple()
          )
        })
    ]
});

const productionLogger = createLogger({
  levels: customLevelsOptions.levels,
  transports: [
      new transports.Console({
          level: 'info',
          format: format.combine(
            format.colorize({ colors: customLevelsOptions.colors}),
            format.simple()
          )
        }),
        new transports.File({
            level: 'error',
            filename: 'errors.log'
        })
    ]
});

// Exportamos los dos loggers
exports.addLogger = (req,res,next) => {
  console.log(mode);
    if(mode === 'development'){
      req.logger = developmentLogger
    }else{
      req.logger = productionLogger
    }
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()
}
