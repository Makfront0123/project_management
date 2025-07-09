import User from "../models/user.js";

class AuthRepository {
  async register(user) {
    return await User.create(user);
  }

  async findUserByEmail(email) {
    return await User.findOne({ email });
  }

  async setLoginStatus(user,isLoggedIn) {
    return await User.findOneAndUpdate({ email: user.email }, { $set: { isLoggedIn: isLoggedIn } });
  }
}

const authRepository = new AuthRepository();
export default authRepository;
