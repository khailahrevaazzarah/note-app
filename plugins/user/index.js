const routes = require("./routes")
const UserHandler = require('./handler')

const userPlugin = {
    name: 'user',
    version: '1.0.0',
    register: async(server,{service}) =>{
       const userHandler = new UserHandler(service)
       const userRoutes = routes(userHandler)
       server.route(userRoutes)
    }
    }


module.exports = userPlugin