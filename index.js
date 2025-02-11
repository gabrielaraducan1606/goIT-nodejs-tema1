import { Command } from "commander";
import { listContacts, getContactByID, addContact, removeContact } from "./contacts.js";

const program = new Command();

program
  .option("-a, --action <type>", "Alege acțiunea: list, get, add, remove")
  .option("-i, --id <type>", "ID-ul contactului")
  .option("-n, --name <type>", "Numele contactului")
  .option("-e, --email <type>", "Email-ul contactului")
  .option("-p, --phone <type>", "Telefonul contactului");

program.parse(process.argv);
const options = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            console.table(await listContacts());
            break;
        case "get":
            await getContactByID(id);
            break;
        case "add":
            await addContact(name, email, phone);
            break;
        case "remove":
            await removeContact(id);
            break;
        default:
            console.warn("Acțiune necunoscută!");
    }
};

invokeAction(options);
