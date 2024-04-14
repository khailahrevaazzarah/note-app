// class AuthenticationHandler  {
//     constructor(authService, userService, tokenManager, validator){
//         this._authService = authService
//         this._userService = userService
//         this._tokenManager = tokenManager
//         this._validator = validator



//         this.postAuthHandler = this.postAuthHandler.bind(this)
//         this.putAuthHandler = this.putAuthHandler.bind(this)
//         this.deleteAuthHandler = this.deleteAuthHandler.bind(this)
//     }

    
// }
const { generateToken } = require("../../tokenize/TokenManager")

class AuthHandler {
    constructor(UserService){
        this._UserService = UserService

        this._loginHandler = this.loginHandler.bind(this)
    }

    loginHandler = async (request,h) => {
        const {email, password} = request.payload

        const userDb = await this._UserService.getUserByEmail(email)

        if (userDb.length == 0){
            const response = h.response({
                status: 'gagal',
                message: 'User tidak ditemukan'
            })
            response.code(404)
            return response
        }
        if (userDb[0].password == password) {
            const token = generateToken({id: userDb[0].id})
            const response = h.response ({

                status: 'sukses',
                message: 'Anda berhasil login',
                data: {
                    token
                }
            })
            response.code(200)
            return response 
        } else {
           const response = h.response ({
                status: 'gagal',
                message: 'Password tidak valid'
            })
            response.code(200)
            return response 
        }
        
    }
}

module.exports = AuthHandler