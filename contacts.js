import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "url";
import colors from "colors";
import { v4 as uuidv4 } from "uuid"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contactsPath = path.join(__dirname, "db", "contacts.json");

console.log("Path către contacts.json:", contactsPath.green);

export async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, "utf-8"); 
        return JSON.parse(data); 
    } catch (error) {
        console.error("Eroare la citirea fișierului contacts.json:", error);
        return []; 
    }
}


export async function addContact(name, email, phone) {
    try {
        const contacts = await listContacts(); 
        const newContact = { id: uuidv4(), name, email, phone }; 

        contacts.push(newContact); 

        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        console.log("Contact adăugat:", newContact);

        return newContact;
    } catch (error) {
        console.error("Eroare la adăugarea contactului:", error);
    }
}


export async function getContactByID(contactId) {
    try {
        const contacts = await listContacts();
        const contact = contacts.find(contact => String(contact.id) === String(contactId));

        if (!contact) {
            console.log("Contactul nu a fost găsit!".yellow);
            return null;
        }

        console.log("Contact găsit:".blue, contact);
        return contact;
    } catch (error) {
        console.log("Eroare la căutarea contactului!".bgRed.white, error);
    }
}

export async function removeContact(contactId) {
    try {
        let contacts = await listContacts(); 
        const initialLength = contacts.length;

        contacts = contacts.filter(contact => String(contact.id) !== String(contactId));

        if (contacts.length === initialLength) {
            console.log("Contactul nu a fost găsit!");
            return;
        }

        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        console.log("Contact șters cu succes!");
    } catch (error) {
        console.error("Eroare la ștergerea contactului:", error);
    }
}
