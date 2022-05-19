const { Router } = require("express");
const { signinController } = require("../controllers/signin.controller");

const router = Router();

router.post("/signin", signinController.signIn);

module.exports = router;
