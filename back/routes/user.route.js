const { usersController } = require("../controllers/user.controller");
const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const uploadImages = require("../middleware/uploadImages");

const router = Router();

router.post("/signup", usersController.signupUser);
router.get("/people", usersController.getUsers);
router.patch("/user/patch", authMiddleware, usersController.patchUser);
router.get("/user/:id", usersController.getUser);
router.delete("/delete/user/:id", usersController.deleteUser);
router.patch(
  "/patch/image",
  authMiddleware,
  uploadImages.single("images"),
  usersController.changeImage
);

module.exports = router;
