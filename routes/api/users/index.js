const express = require("express");
const router = express.Router();
const ctrl = require("../../../controllers/users.js");

router.post("/register", ctrl.signup);
router.post("/login", ctrl.login);
router.post("/logout", ctrl.logout);

module.exports = router;
