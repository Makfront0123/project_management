import User from "../models/User.js";

class AuthRepository {
  async register(user) {
    return await User.create(user);
  }

  async findUserByEmail(email) {
    return await User.findOne({ email });
  }
}

const authRepository = new AuthRepository();
export default authRepository;
