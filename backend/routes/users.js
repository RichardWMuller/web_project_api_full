const router = require("express").Router();
const auth = require("../middleware/auth");

const {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login,
} = require("../controllers/users");

router.post("/signin", login); // Login — público
router.post("/signup", createUser); // Criação de usuário — público

router.use(auth); // A partir daqui, autenticação obrigatória

router.get("/", getUsers);
router.get("/me", getUserById);
router.patch("/me", updateUserProfile);
router.patch("/me/avatar", updateUserAvatar);

module.exports = router;
