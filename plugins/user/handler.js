// const mysql = require('mysql2/promise');

// let user = []
// let id = 1

// const addUserHandler = async (request, h) => {
//    const connection = await mysql.createConnection({
//       host: 'localhost',
//       user: 'root',
//       password: 'khailah772345',
//       database: 'note'
//    });

//    const nama = request.payload.nama;
//    const email = request.payload.email;
//    const password = request.payload.password

//    try {
//       const sql =
//          'INSERT INTO `user`(`nama`, `email`, `password`) VALUES (?,?,?)';
//       const values = [nama, email, password];

//       const [result, fields] = await connection.execute(sql, values);

//       const response = h.response('USERNAME BERHASIL DITAMBAHKAN').code(200)
//       return response

//    } catch (err) {
//       console.log(err);
//    }
// }

// const showUserHandler = async (request, h) => {
//    const connection = await mysql.createConnection({
//       host: 'localhost',
//       user: 'root',
//       password: 'khailah772345',
//       database: 'note'
//    });
//    try {
//       const [results] = await connection.query(
//          'SELECT * FROM `user`'

//       );

//       return h.response(results)
//    } catch (err) {
//       console.log(err);
//    }

// }

// const updateUserHandler = async (request, h) => {
//    const connection = await mysql.createConnection({
//       host: 'localhost',
//       user: 'root',
//       password: 'khailah772345',
//       database: 'note'
//    });

//    const nama = request.payload.nama;
//    const email = request.payload.email;
//    const password = request.payload.password
//    const id = request.params.id

//    try {
//       const sql = 'UPDATE `user` SET `nama` = ?, `email`= ?, `password`= ? WHERE  `id` = ?';
//       const values = [nama, email, password, id];


//       const [result, fields] = await connection.query(sql, values);

//       const response = h.response('Username berhasil diubah').code(200)
//       return response

//    } catch (err) {
//       console.log(err);
//    }
// }

// const deleteUserHandler = async (request, h) => {
//    const connection = await mysql.createConnection({
//       host: 'localhost',
//       user: 'root',
//       password: 'khailah772345',
//       database: 'note'
//    });

//    const id = request.params.id

//    try {
//       const sql = 'DELETE FROM `user` WHERE `id` = ?';
//       const values = [id];


//       const [result, fields] = await connection.query(sql, values);

//       const response = h.response('Username berhasil dihapus').code(200)
//       return response

//    } catch (err) {
//       console.log(err);
//    }
// }
// module.exports = { addUserHandler, showUserHandler, updateUserHandler, deleteUserHandler } 

class UserHandler {
   constructor(service) {
       this._service = service
       this.addUserHandler = this.addUserHandler.bind(this)
       this.getUserHandler = this.getUserHandler.bind(this)
       this.updateUserHandler = this.updateUserHandler.bind(this)
       this.deleteUserHandler = this.deleteUserHandler.bind(this)
       this.getUserByEmailHandler = this.getUserByEmailHandler.bind(this)
   }



   addUserHandler = async (request, h) => {
  const { nama, email, password } = request.payload

  const userId = this._service.addUser({nama, email, password })


  const response = h.response({
      status: 'sukses',
      message: 'User berhasil ditambahkan',
      data: {
          userId
      }
  })

  response.code(201)
  return response
}

getUserHandler = async (request, h) => {

  const user = this._service.getUser()


  const response = h.response({
      status: 'sukses',
      data: {
          user
      }
  })

  response.code(201)
  return response
}

getUserByEmailHandler = async (request,h) => {
    try {

        const { email } = request.params
       
  
        const user = await this._service.getUserByEmail(email)
  
        return h.response({
            status: 'sukses',
            data: {
                user

            }
        })
    } catch (err) {
        return h.response({
            status: 'gagal',
            message: err.message,
        })
    }
}

updateUserHandler = async (request, h) => {

  try {

      const { id } = request.params
      const { nama, email, password } = request.payload

      this._service.editUserById(id, {nama, email, password})

      return h.response({
          status: 'sukses',
          message: 'User berhasil diubah',
      })
  } catch (err) {
      return h.response({
          status: 'gagal',
          message: err.message,
      })
  }
}

deleteUserHandler = async (request, h) => {

  
  try {
      const { id } = request.params
      this._service.deleteUserById(id)

      return h.response({
          status: 'sukses',
          message: 'User berhasil dihapus'
      })
  } catch (err) {
      return h.response({
          status: 'gagal',
          message: err.message,
      })
  }
}
}

module.exports = UserHandler