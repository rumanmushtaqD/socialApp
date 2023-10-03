const User = require("./../../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("./../../utils");
const { UserInputError } = require("apollo-server");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
};
const userQueryMutat = {
  Query: {
    getUsers: async (req, res) => {
      try {
        const users = await User.find();
        console.log(users);
        return users;
      } catch (err) {
        console.log(err);
      }
    },
    getUser: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
        console.log(user);
        return user;
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    register: async (
      _,
      { registerInput: { username, email, password, confirmedPassword } }
    ) => {
      ///CHECK FIELDS
      if (username && email && password && confirmedPassword) {
        console.log("Please enter the all fields below");
      }
      if (password === confirmedPassword) {
        console.log("password do not match with confirmed password");
      }
      const checkEmail = await User.findOne({ email });
      if (checkEmail) {
        console.log("This email is already registered");
      }
      const usernameCheck = await User.findOne({ username });
      if (usernameCheck) {
        console.log("This username is already registered");
      }

      const { valid, errors } = validateRegisterInput(
        username,
        password,
        email,
        confirmedPassword
      );
      password = await bcrypt.hash(password, 12);
      if (!valid) {
        throw new UserInputError("Error", { errors });
      }
      const newUser = await User.create({
        username: username,
        email: email,
        password: password,
        createdAt: new Date().toISOString(),
      });
      const token = generateToken(newUser);
      return {
        newUser,
        token,
      };
    },
    login: async (
      _,
      { registerInput: { username, email, password, confirmedPassword } }
    ) => {
      ///CHECK FIELDS

      const { valid, errors } = validateLoginInput(password, email);
      const user = await User.findOne({ email });
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }
      const token = generateToken(user);
      return {
        user,
        token,
      };
    },
  },
};
module.exports = userQueryMutat;
