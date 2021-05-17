import CommonService from './CommonService'
import * as bcrypt from "bcrypt";

export default class UserService extends CommonService {
  constructor(repository, models) {
    super(repository, models)
  }

  async findAndCountAll(req, options = {
    where: req.query.id ? {id: req.query.id} : undefined
  }) {

    return super.findAndCountAll(req, {...options,
      include: [this.models.Office, {model: this.models.Company, as: 'Company'}]
    });
  }

  async hashPassword (password) {
    if (!password) {
      throw new Error('Password was not provided')
    }
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
  }

  async update(object, req, options = {where: {}}) {
    let user = {...object}
    if (user.password) user.password = await this.hashPassword(user.password)
    return super.update(user, req, options);
  }

  async create(object, req, options = {}) {
    let user = {...object}
    if (user.password) user.password = await this.hashPassword(user.password)
    return super.create(user, req, options)
  }
}
