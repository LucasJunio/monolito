import CommonService from './CommonService'
import AuthService from "./AuthService";

export default class AuthenticationProviderService extends CommonService {
  constructor(repository, models) {
    super(repository, models)
  }

  async upsertUser(userData = {}) {
    let user = await this.models.User.findOne({where: {email: userData.email}})
    if (user) {
      const keys = Object.keys(userData)
      keys.forEach(( el) => user[el] = userData[el])
      await user.save()
    } else {
      user = await this.models.User.create(userData)||{}
    }
    return (user.toJSON)? user.toJSON(): user
  }

  async create(object, req, options = {}) {
    const user = await this.upsertUser({email: req.body.email, name: req.body.name, type: 1})

    const authenticationProvider = await this.models.AuthenticationProvider.findOne({where: { provider_type: req.body.provider_type, id_provider: req.body.id_provider}})
    if (!authenticationProvider) await super.create({...object, id_user: user.id}, req, options);
    return {user: {name: user.name, email: user.email}, jwt: AuthService.signToken(user)}
  }
}
