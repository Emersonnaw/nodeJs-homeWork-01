const {listContacts,getContactById,addContact,removeContact} = require('./contacts');
const { program } = require('commander');

program
    .option(' --action <type>')
    .option('--id <type>')
    .option('--name <type>')
    .option('--phone <type>')
    .option('--email <type');


program.parse();
const options = program.opts();


const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            const allContacts = await listContacts();
            console.log(allContacts);
            break;
         
        case 'get':
            const getId = await getContactById(id);
            console.log( getId);
            break;

        case 'add':
            const addCard = await addContact({ name, email, phone });
            console.log(addCard);
            break;
        
        case 'remove':
            const deledeContact = await removeContact(id);
            console.log(deledeContact);
            break;

    default:
      console.warn('\x1B[31m Unknown action type!');
    }
}


invokeAction(options); 

