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

router.post("/signin", login);
router.post("/signup", createUser);

router.use(auth);

router.get("/me", getUsers);
router.get("/:userId", getUserById);
router.patch("/me", updateUserProfile);
router.patch("/me/avatar", updateUserAvatar);

module.exports = router;
