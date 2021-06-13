const express = require("express");
const router = express.Router();
const ctrl = require("../../../controllers/users.js");
const guard = require("../../../helpers/guard");
const upload = require("../../../helpers/upload");

router.get("/verify/:verificationToken", ctrl.verify);
router.post("/verify", ctrl.repeatSendEmailVerify);
router.post("/register", ctrl.signup);
router.post("/login", ctrl.login);
router.post("/logout", guard, ctrl.logout);
router.get("/current", guard, ctrl.сurrent);
router.patch("/avatars", [guard, upload.single("avatar")], ctrl.avatars);

module.exports = router;
