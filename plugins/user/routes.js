// const { addUserHandler, showUserHandler, updateUserHandler, deleteUserHandler } = require("./handler");

// const routes = [{
//     method: 'POST',
//     path: '/adduser',
//     handler: addUserHandler
// },
// {
//     method: 'GET',
//     path: '/showuser',
//     handler: showUserHandler
// },
// {
//     method: 'PUT',
//     path: '/updateuser/{id}',
//     handler: updateUserHandler
// },
// {
//     method: 'DELETE',
//     path: '/deleteuser/{id}',
//     handler: deleteUserHandler
// }
// ]

// module.exports = routes

const routes = (handler) => [
    {
        method: 'POST',
        path: '/user',
        handler: handler.addUserHandler
    },
    {
        method: 'GET',
        path: '/user',
        handler: handler.getUserHandler
    },
    {
        method: 'PUT',
        path: '/user/{id}',
        handler: handler.updateUserHandler
    },
    {
        method: 'DELETE',
        path: '/user/{id}',
        handler: handler.deleteUserHandler
    },
    {
        method: 'GET',
        path: '/user/{email}',
        handler: handler.getUserByEmailHandler
    }
]

module.exports = routes