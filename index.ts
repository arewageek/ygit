import Conf from "conf";
import degit from "degit";
import yargs from "yargs";
import {hideBin} from 'yargs/helpers'

const config = new Conf({projectName: 'ygit'})

yargs(hideBin(process.argv))
    .command({
        command: 'config <key> <value>',
        describe: 'configure git source',
        handler: (argv: any) => {
            console.log('Configuring git source...');
            config.set(argv.key, argv.value)
        },
    })
    .command({
        command: 'clone <template> <destination>',
        describe: 'Scaffold a new project at the given destination',
        builder: (yargs: yargs) => yargs
            .option('cache', {
                type: 'boolean',
                alias: 'c',
                description: 'Use cache',
                default: false,
            })
            .option('force', {
                type: 'boolean',
                alias: 'f',
                description: 'Force overwrite if destination exists',
                default: false,
            })
            .option('verbose', {
                type: 'boolean',
                alias: 'v',
                description: 'Enable verbose logging',
                default: false,
            })
            .option('src', {
                type: 'string',
                alias: 's',
                default: config.get('src') || 'github',
                description: 'Source platform (github, gitlab, bitbucket)',
            })
            .option('user', {
                type: 'string',
                default: config.get('user') || 'arewageek',
                description: 'Username or organization name',
            }),
        handler: async (argv: any) => {
            const baseUrl = `${argv.src}:${argv.user}/`;
            console.log("Cloning repository...");

            const emitter = degit(`${baseUrl}${argv.template}`, {
                cache: argv.c === true || argv.cache === true,
                force: argv.f === true || argv.force === true,
                verbose: argv.v === true || argv.verbose === true,
            })

            try{
                await emitter.clone(argv.destination)
                console.log("Repository cloned successfully!");
            }
            catch(error: any){
                console.error("Error cloning repository:", error.message);
            }
        },
    })
    .demandCommand(1, 'You need to specify a command')
    .help()
    .parse();