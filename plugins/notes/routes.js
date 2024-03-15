// const { addNoteHandler, showNoteHandler, updateNoteHandler, deleteNoteHandler, getNoteHandler } = require("./handler");

const Joi = require("joi")
const { options } = require("joi")

// const routes = [{
//     method: 'POST',
//     path: '/notes',
//     handler: addNoteHandler
    
// },
// {
//     method: 'GET',
//     path: '/showNotes',
//     handler: showNoteHandler
// },
// {
//     method: 'PUT',
//     path: '/notes/{id}',
//     handler: updateNoteHandler
// },
// {
//     method: 'DELETE',
//     path: '/notes/delete/{id}',
//     handler: deleteNoteHandler
// },
// {
//     method: 'GET',
//     path: '/getnotes/{id}',
//     handler: getNoteHandler
// }


// ] 


// module.exports = routes

const routes = (handler) => [
    {
        method: 'POST',
        path: '/notes',
        handler: handler.addNoteHandler,
        options: {
            validate:{
                payload: Joi.object({
                    title: Joi.string()
                })
            }
        }
    },
    {
        method: 'GET',
        path: '/notes',
        handler: handler.getNotesHandler
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: handler.updateNoteHandler
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: handler.deleteNoteHandler
    },
]

module.exports = routes