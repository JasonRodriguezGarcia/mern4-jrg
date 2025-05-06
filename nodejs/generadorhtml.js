import prompt from 'prompt-sync';
import fs from 'fs'

const input= prompt();

const titulo = input("Introducir título: ");
const autor = input("Introducir autor: ");
const contenido = input("Introducir contenido: ");

const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="author" content=${autor}>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${titulo}</title>
    </head>
    <body>
        <h1>${titulo}</h1>
        <p>${contenido}</p>
        <footer><small>Created by ${autor}</small></footer>
    </body>
    </html>
`
fs.writeFile("miIndex.html", html, { encoding: "utf8"}, (error) => {
    if (error) {
        console.log("Error")
    }
})
