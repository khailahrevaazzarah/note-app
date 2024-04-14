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
            auth: 'notes_jwt',
            validate:{
                payload: Joi.object({
                    title: Joi.string().required(),
                    content: Joi.string().required(),
                    penulis: Joi.number()
                })
            }
        }
    },
    {
        method: 'GET',
        path: '/notes',
        handler: handler.getNotesHandler,
        options: {
            auth: 'notes_jwt',
        }
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: handler.updateNoteHandler,
        options: {
            auth: 'notes_jwt',
            validate:{
                params: Joi.object({
                    id: Joi.required()
                })
            }
        }
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: handler.deleteNoteHandler,
        options: {
            auth: 'notes_jwt',
            validate:{
                params: Joi.object({
                    id: Joi.required()
                })
            }
        }
    },
]

module.exports = routes