const Jwt = require('@hapi/jwt')

const TokenManager = {
    generateToken: payload => Jwt.token.generate(payload,'882cf3826475aeec414d83cfc3d34751051a2ed50e6e4b0190083eae78e01373207dd3e1644c65d5b45b07bf929533e42f0b3901300b87915b5cf604ce0fa061')
}

module.exports = TokenManager
