//Ini saya komen yaa
class NotesService {
    constructor(pool) {
      this._pool = pool
    }
  
    async addNote({ title, content, penulis }) {
      const [result] = await this._pool.execute('INSERT INTO notes (title, content, penulis) VALUES (:title, :content, :penulis)', { title, content, penulis })
      console.log(result)
      return result.insertId 
    }
  
    async getNotes() {
      const [rows] = await this._pool.query('SELECT * FROM notes')
      console.log(rows)
      return rows
    }
  
    async getNoteByUserId(userId) {
      const [rows] = await this._pool.query('SELECT * FROM notes WHERE penulis=:userId', { userId })
      console.log(rows)
      return rows
    }
  
    async editNoteById(id, { title, content, penulis }) {
      const [result] = await this._pool.execute('UPDATE notes SET title=:title, content=:content, penulis=:penulis WHERE id=:id', { title, content, penulis, id })
      return [result].affectedRows
    }
  
    async deleteNoteById(id) {
      const [result] = await this._pool.execute('DELETE FROM notes WHERE id=:id', { id })
      return result.affectedRows
    }
  }
  
  module.exports = NotesService;