const yargs = require("yargs");
const Case = require("./node_modules/case")
const app = require("./app")
const fs = require("fs")

yargs.version('1.1.0')

//console.log(process.argv[2]);

yargs.command({
    command:'weather',
    
    builder:{
        city:{
            describe:"City Name",
            demandOption:true,
            type:'string'
        },
        country:{
            describe:"Country Code",
            demandOption:true,
            type:'string'

        }
    },
    handler: (argv) => app.getweather((Case.capital(argv.city)),((argv.country).toUpperCase())),
    
 }
)
yargs.parse()





