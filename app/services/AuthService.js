// const mailservice = require('../services/mailservice')
// import CacheMemory from '../helper/CacheMemory'

const bcrypt = require('bcrypt')
// const config = require('../../config/config')[process.env.NODE_ENV || 'production']
const jwt = require('jsonwebtoken')

export default class AuthService {
  constructor(userRepository, models) {
    AuthService.models = models
    AuthService.userRepository = userRepository
  }

  static signToken (object) {
    let user = {...object}
    delete user.password
    return jwt.sign({ data: user }, process.env.JWT_SECRET, {
      expiresIn: 21600
    })
  }

  static authenticate (req, user) {
    return new Promise((resolve, reject) => {
      resolve(AuthService.signToken(user))
    })
  }

  static async getUserByEmail(email) {
    return AuthService.models.User.findOne({ where: { email } })
        .then(el => (el)? el.toJSON(): el)
  }

  // static async verifyToken(token, models, options = {}) {
  //   return new Promise((resolve, reject) => {
  //     jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
  //       if (err) reject(err)
  //       else {
  //         let operations = CacheMemory.get(decoded.data.group_id)
  //         if (!operations) {
  //           const resulting = await models.Group.findAll({
  //             where: {id: decoded.data.group_id},
  //             include: [{ model: models.Operation }],
  //             ...options})
  //             .then(arr => (arr.length >= 1)? arr[0].toJSON(): undefined)
  //           CacheMemory.set(decoded.data.group_id, (resulting||{Operations: []}).Operations)
  //           resolve({...decoded, operations: (resulting||{Operations: []}).Operations})
  //         } else {
  //           resolve({...decoded, operations})
  //         }
  //       }
  //     })
  //   })
  // }

  static async verifyPassword(candidate, actual) {
    return await bcrypt.compare(candidate, actual)
  }

  static async login(req, res, next) {
    const {email, password} = req.body
    const user = await AuthService.getUserByEmail(email||'')
    const authenticationError = () => {
      return res
        .status(401)
        .json({ success: false, message: 'Login inválido!' })
    }

    if (!user || !(await AuthService.verifyPassword(password, user.password))) {
      console.error('Passwords do not match')
      return authenticationError()
    }
    let token
    try {
      token = await AuthService.authenticate(req, user)
    } catch (e) {
      if (e) {
        console.error('Log in error', e)
        return authenticationError()
      }
    }

    // CacheMemory.set(user.group_id, (user.Group||{}).Operations)
    return res
      .status(200)
      .cookie('jwt', token, { httpOnly: true })
      .json({ success: true, redirect: '/', jwt: token, user: {name: user.name, type: user.type}})
  }

  static async logout(userId) {
    // TODO implement this interface
    throw new Error('implement this interface')
    let result = await AuthService.userRepository.find(userId)
    return result
  }
}
