const Contacts = require("../model/contacts");
const { HttpCode } = require("../helpers/constants");

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { contacts, total, limit, offset } = await Contacts.listContacts(
      userId,
      req.query
    );
    return res.json({
      status: "success",
      code: HttpCode.OK,
      data: { total, limit, offset, contacts },
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.getContactById(userId, req.params.contactId);
    if (contact) {
      return res
        .status(HttpCode.OK)
        .json({ status: "success", code: HttpCode.OK, data: { contact } });
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Not Found",
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  if (JSON.stringify(req.body) === "{}") {
    return res.status(HttpCode.OK).json({
      status: "no body",
      code: HttpCode.BAD_REQUEST,
      message: "missing required name field",
    });
  }
  try {
    const userId = req.user.id;
    const contact = await Contacts.addContact({ ...req.body, owner: userId });
    return res
      .status(HttpCode.CREATED)
      .json({ status: "success", code: HttpCode.CREATED, data: { contact } });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.removeContact(userId, req.params.contactId);
    if (contact) {
      return res
        .status(HttpCode.OK)
        .json({ status: "success", code: HttpCode.OK, data: { contact } });
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Not Found",
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  if (JSON.stringify(req.body) === "{}") {
    return res.status(HttpCode.OK).json({
      status: "no body",
      code: HttpCode.BAD_REQUEST,
      message: "missing fields",
    });
  }
  try {
    const userId = req.user.id;
    const contact = await Contacts.updateContact(
      userId,
      req.params.contactId,
      req.body
    );
    if (contact) {
      return res
        .status(HttpCode.OK)
        .json({ status: "success", code: HttpCode.OK, data: { contact } });
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Not Found",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
