
const fs = require("fs/promises");
const path = require('path');
const { nanoid } = require("nanoid");
const contactsPath = path.join("db", "contacts.json");

/**
 * Create a function to get all contacts
 */

 async function listContacts() {
     const data = await fs.readFile(contactsPath);
     return JSON.parse(data);
}

/**
 * 
 * if there is an id, then it returns the contacts. Otherwise, return null
 * @param {id} contactId 
 */

async function getContactById(iD) {
    const data = await listContacts();
    const trueId = await data.find(({id}) => id === iD);
    return trueId || null;
}

async function removeContact(contactId) {
    const data = await listContacts();
    const index = await data.findIndex(({ id }) => id === contactId);
    if (index === -1) {
        return null;
    }
    const [res] = data.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2))
    return res;

    
}



async function addContact(data) {
    const allContacts = await listContacts();
    const newContact = {
        id:nanoid(),
        ...data,
    }
    allContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return newContact;

}



module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}



