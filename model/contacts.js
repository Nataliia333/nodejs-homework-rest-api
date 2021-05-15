const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join("./model", "contacts.json");
const { v4: uuid } = require("uuid");

const listContacts = async () => {
  const res = await fs.readFile(contactsPath);
  return JSON.parse(res);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => String(id) === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => String(id) === contactId);
  if (!contact) return;
  const newContacts = contacts.filter(({ id }) => String(id) !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return contact;
};

const addContact = async (body) => {
  const id = uuid();
  const contacts = await listContacts();
  const newContact = { id, ...body };
  const newContacts = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => String(id) === contactId);
  if (index === -1) return;
  contacts[index] = { ...contacts[index], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
