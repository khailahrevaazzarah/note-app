//Ini saya komen yaa
class UserService {
    constructor(pool) {
      this._pool = pool
    }
  
    async getUserByEmail(email) {
      const [rows]= await this._pool.query('SELECT * FROM user WHERE email=:email', { email })
      return rows
    }

    async addUser({ nama, email, password }) {
        const [result] = await this._pool.execute('INSERT INTO user (nama, email, password) VALUES (:nama, :email, :password)', { nama, email, password })
        console.log(result)
        return result.insertId 
      }
    
      async getUser() {
        const [rows] = await this._pool.query('SELECT * FROM user')
        console.log(rows)
        return rows
      }
    
      async editUserById(id, {nama, email, password}) {
        const [result] = await this._pool.execute('UPDATE user SET nama=:nama, email=:email, password=:password WHERE id=:id', { nama, email, password, id })
        return [result].affectedRows
      }
    
      async deleteUserById(id) {
        const [result] = await this._pool.execute('DELETE FROM user WHERE id=:id', { id })
        return result.affectedRows
      }
    }
    
  
  module.exports = UserService;