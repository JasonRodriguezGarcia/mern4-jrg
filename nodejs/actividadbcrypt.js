import prompt from 'prompt-sync';
import bcrypt from 'bcrypt'
// import {appendFileSync} from 'fs'
import fs from 'fs'

const input= prompt();

do {
    const username = input("Introducir un nombre de usuario: ");
    const password = input("Introducir contraseña: ")

    const hash = await bcrypt.hash(password, 14) // en es modules no hace falta envolver en funcion async

    
    console.log("\nHemos registrado al usuario: ", username)
    console.log("\nSu contraseña es: ", hash)

    fs.appendFileSync( "file.txt", 
        `Creado Sincrono: usuario: ${username}, password: ${hash}\n`,
    { encoding: "utf8"})

    // fs.appendFile("file.txt", `Creado Asincrono: usuario: ${username}, password: ${hash}\n`,
    //     { encoding: "utf8"},
    //         (err) => {
    //             if (err) {
    //                 console.log(err);
    //             }
    //             else {
    //                 // Get the file contents after the append operation 
    //                 console.log("\nFile Contents of file after append:\n",
    //                     fs.readFileSync("file.txt", "utf8"));
    //                 }
    //         });
    fs.appendFile("file.txt", `Creado Asincrono: usuario: ${username}, password: ${hash}\n`,
        { encoding: "utf8"},
            (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    // Get the file contents after the append operation 
                    console.log("\nFichero guardado");
                    }
            });
                
    const continuar = input("Deseas continuar (s/n)?: ");
    if (continuar == "n" || continuar == "N") break
    
} while (true);