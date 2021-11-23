const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// Get all contacts
async function listContacts() {
  const contacts = await fs.readFile(contactsPath, 'utf8');
  if (!contacts) return null;
  const contactsParse = JSON.parse(contacts);
  return contactsParse;
}

// Get one contact by id
async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find((item) => item.id === Number(contactId));
  if (!contactById) return null;
  return contactById;
}

//  Delete one contact by id
async function removeContact(contactId) {
  const contacts = await listContacts();
  const indexContact = contacts.findIndex((item) => item.id === Number(contactId));
  if (indexContact === -1) return null;
  const removedСontact = contacts[indexContact];
  contacts.splice(indexContact, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedСontact;
}

// Add one contact to list
async function addContact(name, email, phone) {
  if (!name || !email || !phone) return null;
  const contacts = await listContacts();
  const newContact = {
    id: Date.now(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
