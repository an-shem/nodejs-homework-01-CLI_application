const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

// Get all contacts
async function listContacts() {
  const contacts = await fs.readFile(contactsPath, 'utf8');
  const contactsParse = JSON.parse(contacts);
  return contactsParse;
}

// Get one contact by id
async function getContactById(contactId) {
  const contacts = await listContacts();
  const [contact] = contacts.filter((item) => item.id === contactId);
  if (!contact) return null;
  return contact;
}

//  Delete one contact by id
async function removeContact(contactId) {
  const contacts = await listContacts();
  const indexContact = contacts.findIndex((item) => item.id === contactId);
  if (indexContact === -1) return null;
  const removedСontact = contacts[indexContact];
  contacts.splice(indexContact, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedСontact;
}

// Add one contact to list
async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: Data.now(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };