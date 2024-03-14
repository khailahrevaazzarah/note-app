'use strict';

const Hapi = require('@hapi/hapi');
const notesPlugin = require('./plugins/notes')
const userPlugin = require('./plugins/user');
const { pool } = require('./utils/database/pool');
const NotesService = require('./services/mysql/noteService');


const init = async () => {

    const noteServices = new NotesService(pool)

    const server = Hapi.server({
        port: 1234,
        host: 'localhost'
    });

    await server.register(
        {
            plugin  : notesPlugin,
            options : {
                service: noteServices
            }
        }
        )
        await server.register(
            {
                plugin : userPlugin,
                options : {}
            }
        )


        await server.start();
        console.log('Server running on %s', server.info.uri);
    };

    process.on('unhandledRejection', (err) => {

        console.log(err);
        process.exit(1);
    });




    init();