const User = require("../models/user");
const getUsers = (req, res) => {
  return User.find({})
    .then((users) => {
      if (!users) {
        const err = new Error("Ocorreu um erro ao buscar usuários");
        err.status = 500;
        throw err;
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
  const { name, about, avatar, email, password } = req.body;
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
// const createUser = (req, res) => {
//   const { name, about, avatar, email, password } = req.body;

//   if (!email|| !about || !avatar) {
//     return res.status(400).send({ error: "Dados inválidos..." });
//   }

//   return User.create({
//     name,
//     about,
//     avatar,
//   })
//     .then((user) => {
//       if (!user) {
//         const err = new Error("Ocorreu um erro ao criar usuário");
//         err.status = 500;
//         throw err;
//       }
//       res.send({ data: user });
//     })
//     .catch((err) => {
//       console.log("createUser Error:", err);
//       res.status(err.status).send({ error: err.message });
//     });
// };
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

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
