const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join("./model", "contacts.json");
const { v4: uuid } = require("uuid");

const listContacts = async () => {
  const res = await fs.readFile(contactsPath);
  return JSON.parse(res);
};

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const addContact = async (body) => {
  const id = uuid();
  const contacts = await listContacts();
  const newContact = { id, ...body };
  const newContacts = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
