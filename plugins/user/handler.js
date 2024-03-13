const mysql = require('mysql2/promise');

let user = []
let id = 1

const addUserHandler = async (request, h) => {
   const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'khailah772345',
      database: 'note'
   });

   const nama = request.payload.nama;
   const email = request.payload.email;
   const password = request.payload.password

   try {
      const sql =
         'INSERT INTO `user`(`nama`, `email`, `password`) VALUES (?,?,?)';
      const values = [nama, email, password];

      const [result, fields] = await connection.execute(sql, values);

      const response = h.response('USERNAME BERHASIL DITAMBAHKAN').code(200)
      return response

   } catch (err) {
      console.log(err);
   }
}

const showUserHandler = async (request, h) => {
   const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'khailah772345',
      database: 'note'
   });
   try {
      const [results] = await connection.query(
         'SELECT * FROM `user`'

      );

      return h.response(results)
   } catch (err) {
      console.log(err);
   }

}

const updateUserHandler = async (request, h) => {
   const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'khailah772345',
      database: 'note'
   });

   const nama = request.payload.nama;
   const email = request.payload.email;
   const password = request.payload.password
   const id = request.params.id

   try {
      const sql = 'UPDATE `user` SET `nama` = ?, `email`= ?, `password`= ? WHERE  `id` = ?';
      const values = [nama, email, password, id];


      const [result, fields] = await connection.query(sql, values);

      const response = h.response('Username berhasil diubah').code(200)
      return response

   } catch (err) {
      console.log(err);
   }
}

const deleteUserHandler = async (request, h) => {
   const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'khailah772345',
      database: 'note'
   });

   const id = request.params.id

   try {
      const sql = 'DELETE FROM `user` WHERE `id` = ?';
      const values = [id];


      const [result, fields] = await connection.query(sql, values);

      const response = h.response('Username berhasil dihapus').code(200)
      return response

   } catch (err) {
      console.log(err);
   }
}
module.exports = { addUserHandler, showUserHandler, updateUserHandler, deleteUserHandler } 