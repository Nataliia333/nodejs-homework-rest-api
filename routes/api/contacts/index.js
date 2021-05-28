const express = require("express");
const router = express.Router();
const ctrl = require("../../../controllers/contacts");

const {
  validateAddContact,
  validateUpdateContact,
  validateStatusFavoriteContact,
} = require("./validation");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateAddContact, ctrl.create);

router.delete("/:contactId", ctrl.remove);

router.put("/:contactId", validateUpdateContact, ctrl.update);

router.patch(
  "/:contactId/favorite",
  validateStatusFavoriteContact,
  ctrl.update
);

module.exports = router;
