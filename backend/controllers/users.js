const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsers = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      const err = new Error("Ocorreu um erro ao buscar usuários");
      err.status = 404;
      throw err;
    })
    .then((users) => {
      if (!users) {
      }
      res.send({ data: users });
    })
    .catch((err) => {
      console.log("getUsers Error:", err);
      res.status(err.status).send({ error: err.message });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  return User.findById(userId)
    .orFail(() => {
      const err = new Error("Usuário não encontrado");
      err.status = 404;
      throw err;
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      console.log("getUserById Error:", err);
      res.status(err.status).send({ error: err.message });
    });
};

function createUser(req, res, next) {
  const { name, about, avatar, email } = req.body;
  try {
    if (!email || !password) {
      const err = new Error("Dados inválidos...");
      err.statusCode = 400;
      throw err;
    }
  } catch (error) {
    next(error);
  }

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) => {
      res.status(201).send({
        data: {
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        },
      });
    })
    .catch(next);
}

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  const userUpdated = {};

  if (name) {
    userUpdated.name = name;
  }
  if (about) {
    userUpdated.about = about;
  }

  if (!name && !about) {
    return res.status(400).send({ error: "Dados inválidos..." });
  }

  return User.findByIdAndUpdate(userId, userUpdated, {
    new: true,
  })
    .orFail(() => {
      const err = new Error("Usuário não encontrado");
      err.status = 404;
      throw err;
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      console.log("updateUserProfile Error:", err);
      res.status(err.status).send({ error: err.message });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  if (!avatar) {
    return res.status(400).send({ error: "Dados inválidos..." });
  }

  return User.findByIdAndUpdate(
    userId,
    {
      avatar,
    },
    {
      new: true,
    }
  )
    .orFail(() => {
      const err = new Error("Usuário não encontrado");
      err.status = 404;
      throw err;
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      console.log("updateUserAvatar Error:", err);
      res.status(err.status).send({ error: err.message });
    });
};

login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      const error = new Error("E-mail ou senha incorretos");
      error.statusCode = 401;
      throw error;
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      const error = new Error("E-mail ou senha incorretos");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({ user, token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login,
};
