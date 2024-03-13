const mysql = require('mysql2/promise');

// let notes = []
// let id = 1

// const addNoteHandler = async (request, h) => {
//    const connection = await mysql.createConnection({
//       host: 'localhost',
//       user: 'root',
//       password: 'khailah772345',
//       database: 'note'
//    });

//    const title = request.payload.title;
//    const content = request.payload.content;
//    const penulis = request.payload.penulis


//    try {
//       const sql =
//          'INSERT INTO `notes`(`title`, `content`, `penulis`) VALUES (?,?,?)';
//       const values = [title, content, penulis];

//       const [result, fields] = await connection.execute(sql, values);

//       const response = h.response('Catatanya berhasil ditambahkan').code(200)
//       return response

//    } catch (err) {
//       console.log(err);
//    }
//    /*notes.push({
//       title: request.payload.title,
//       content: request.payload.content,
//       id: id++
//    })*/

// }

// const getNoteHandler = async (request, h) => {
//    const connection = await mysql.createConnection({
//       host: 'localhost',
//       user: 'root',
//       password: 'khailah772345',
//       database: 'note'
//    });

//    const id = request.params.id;

//    try {
//       const sql =
//          'SELECT * FROM `notes` WHERE `id`=? ';
//       const values = [id];

//       const [result] = await connection.execute(sql, values);

//       return h.response(result)
//    } catch (err) {
//       console.log(err);
//    }

// }


// const showNoteHandler = async (request, h) => {
//    const connection = await mysql.createConnection({
//       host: 'localhost',
//       user: 'root',
//       password: 'khailah772345',
//       database: 'note'
//    });
//    try {
//       const [results] = await connection.query(
//          'SELECT * FROM `notes`'

//       );

//       return h.response(results)
//    } catch (err) {
//       console.log(err);
//    }

// }

// const updateNoteHandler = async (request, h) => {
//    const connection = await mysql.createConnection({
//       host: 'localhost',
//       user: 'root',
//       password: 'khailah772345',
//       database: 'note'
//    });

//    const title = request.payload.title;
//    const content = request.payload.content;
//    const penulis = request.payload.penulis
//    const id = request.params.id

//    try {
//       const sql = 'UPDATE `notes` SET `title` = ?, `content`= ?, `penulis`= ? WHERE  `id` = ?';
//       const values = [title, content, penulis, id];


//       const [result, fields] = await connection.query(sql, values);

//       const response = h.response('Catatanya berhasil diubah').code(200)
//       return response

//    } catch (err) {
//       console.log(err);
//    }
//    /*const { id } = request.params;
//    const { title, content } = request.payload;
//    notes = notes.map(note => {
//       if (note.id == id) {
//          note.title = title,
//             note.content = content
//          return note

//       }
//       return note
//    })

//    return h.response(notes).code(202)*/

// }

// const deleteNoteHandler = async (request, h) => {
//    const connection = await mysql.createConnection({
//       host: 'localhost',
//       user: 'root',
//       password: 'khailah772345',
//       database: 'note'
//    });

//    const id = request.params.id

//    try {
//       const sql = 'DELETE FROM `notes` WHERE `id` = ?';
//       const values = [id];


//       const [result, fields] = await connection.query(sql, values);

//       const response = h.response('Catatanya berhasil dihapus').code(200)
//       return response

//    } catch (err) {
//       console.log(err);
//    }
//    /*const { id } = request.params
//    notes = notes.filter(note => note.id != id)
//    return h.response(notes).code(203)*/
// }

//module.exports = { addNoteHandler, showNoteHandler, updateNoteHandler, deleteNoteHandler, getNoteHandler }

class NoteHandler {
    constructor(service) {
        this._service = service

        // ini ditambahkan agar masing-masing method dapat mengakses 'this'
        this.addNoteHandler = this.addNoteHandler.bind(this)
        this.getNotesHandler = this.getNotesHandler.bind(this)
        this.updateNoteHandler = this.updateNoteHandler.bind(this)
        this.deleteNoteHandler = this.deleteNoteHandler.bind(this)
    }


addNoteHandler = async (request, h) => {
   const { title, content, penulis } = request.payload

   const noteId = this._service.addNote({ title, content, penulis })


   const response = h.response({
       status: 'success',
       message: 'Catatan berhasil dibuat',
       data: {
           noteId
       }
   })

   response.code(201)
   return response
}

getNotesHandler = async (request, h) => {

   const notes = this._service.getNotes()


   const response = h.response({
       status: 'sukses',
       data: {
           notes
       }
   })

   response.code(201)
   return response
}

updateNoteHandler = async (request, h) => {

   try {

       const { id } = request.params
       const { title, content, penulis } = request.payload

       this._service.editNoteById(id, { title, content, penulis })

       return h.response({
           status: 'sukses',
           message: 'Catatan berhasil diubah',
       })
   } catch (err) {
       return h.response({
           status: 'gagal',
           message: err.message,
       })
   }
}

deleteNoteHandler = async (request, h) => {

   
   try {
       const { id } = request.params
       this._service.deleteNoteById(id)

       return h.response({
           status: 'sukses',
           message: 'Catatan berhasil dihapus'
       })
   } catch (err) {
       return h.response({
           status: 'gagal',
           message: err.message,
       })
   }
}
}

module.exports = NoteHandler