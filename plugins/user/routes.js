const { addUserHandler, showUserHandler, updateUserHandler, deleteUserHandler } = require("./handler");

const routes = [{
    method: 'POST',
    path: '/adduser',
    handler: addUserHandler
},
{
    method: 'GET',
    path: '/showuser',
    handler: showUserHandler
},
{
    method: 'PUT',
    path: '/updateuser/{id}',
    handler: updateUserHandler
},
{
    method: 'DELETE',
    path: '/deleteuser/{id}',
    handler: deleteUserHandler
}
]

module.exports = routes