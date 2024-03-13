'use strict';

const Hapi = require ('@hapi/hapi');

const init = async () => {
    const server = Hapi.server({
        port: 7000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request,h) => {
            return '<h1>hohohooo</h1>';
        } 

    })

    server.route({
        method: 'GET',
        path: '/users',
        handler: (request,h) => {
            return h.redirect ('/');
        }
    })

    server.route({
        method: 'GET',
        path: '/{any*}',
        handler: (request,h) => {
            return "<h1>Kamu Tersesat!</h1>"
        }

    })

    await server.start();
    console.log('Server running on %s', server.info.uri);

};

process.on ('unhandledRejection', (err) => {
    console.log (err);
    process.exit(1)
})

init();