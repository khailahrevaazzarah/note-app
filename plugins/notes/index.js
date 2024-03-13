const routes = require("./routes")
const NotesHandler = require('./handler')

const notesPlugin = {
    name: 'notes',
    version: '1.0.0',
    register: async (server, {service}) => {

        const noteHandler = new NotesHandler(service)
        const noteRoutes = routes(noteHandler)
        server.route(noteRoutes)
    }
}

module.exports = notesPlugin