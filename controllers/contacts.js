const Contacts = require("../model/contacts");

const getAll = async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.json({ status: "success", code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);
    if (contact) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not Found" });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  if (JSON.stringify(req.body) === "{}") {
    return res.status(200).json({
      status: "no body",
      code: 400,
      message: "missing required name field",
    });
  }
  try {
    const contact = await Contacts.addContact(req.body);
    return res
      .status(201)
      .json({ status: "success", code: 201, data: { contact } });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);
    if (contact) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not Found" });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  if (JSON.stringify(req.body) === "{}") {
    return res
      .status(200)
      .json({ status: "no body", code: 400, message: "missing fields" });
  }
  try {
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body
    );
    if (contact) {
      return res
        .status(200)
        .json({ status: "success", code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not Found" });
  } catch (error) {
    next(error);
  }
};

// async (req, res, next) => {
//   if (JSON.stringify(req.body) === "{}") {
//     return res.status(200).json({
//       status: "no body",
//       code: 400,
//       message: "missing field favorite",
//     });
//   }
//   try {
//     const contact = await Contacts.updateContact(
//       req.params.contactId,
//       req.body
//     );
//     if (contact) {
//       return res
//         .status(200)
//         .json({ status: "success", code: 200, data: { contact } });
//     }
//     return res
//       .status(404)
//       .json({ status: "error", code: 404, message: "Not Found" });
//   } catch (error) {
//     next(error);
//   }
// };
module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
