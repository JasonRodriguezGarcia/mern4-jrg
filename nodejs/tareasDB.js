import PouchDB from 'pouchdb';
import prompt from 'prompt-sync';

const input = prompt();
const db = new PouchDB('./db/tareas');

const main = async () => {
  
  console.log('--- Gestor de tareas ---');
  console.log('1. Agregar una tarea');
  console.log('2. Listar tareas');
  console.log('3. Completar tarea'); // completar esta opción
  console.log('4. Borrar tarea'); // completar esta opción

  const choice = input('Elegir una opcion: ');

  if (choice === '1') {

    const description = input('Enter task description: '); 
    
    // guardar la tarea, su estado (completed) y un ID facil de usar en la base de datos
    // Insert new user into the database
    const tareaDoc = {
        description: description,
        completed: false
    }
    const response = await db.post(tareaDoc);
    console.log(response)
    console.log('✅ Task saved.');
    
  } else if (choice === '2') {
    try {
      
        // mostrando todas las tareas
        // Fetch all documents from the 'users_db'
        const result = await db.allDocs({ include_docs: true });
        // cogemos las columnas (rows)
        console.log(result.rows);
        // Filter the users if 'type' is used in the document
        const tasks = result.rows
        // .filter(row => row.doc.type === 'user')  // Ensure the document type is 'user'
    
 
        tasks.map((task, index) => {
            console.log(`${index + 1}. ${task.doc._id} ${task.doc.description} [${task.doc.completed ? '✓' : '✗'}]`);

        }) 
        
        // console.log(`${index + 1}. ${task.description} [${task.completed ? '✓' : '✗'}]`);
       
    } catch (err) {
      console.error('❌ Error retrieving tasks:', err);
    }
  } else if (choice == '3'){
      const tarea = input('Enter task nr to complete: ')
      try {
    
            var tareaDoc = await db.get(tarea)
            console.log(tareaDoc)

            tareaDoc.completed = true
            const response = await db.put(tareaDoc);
        } catch (err) {
          console.error('❌ Error retrieving tasks:', err);
        }
    } else if(choice == '4') {
        const tarea = input('Enter task nr to delete: ')
        try {
            var tareaDoc = await db.get(tarea)
            console.log(tareaDoc)

            const response = await db.remove(tareaDoc);
        } catch (err) {
          console.error('❌ Error retrieving tasks:', err);
        }

    }else {
    console.log('❓ Invalid choice.');
  }
};


main();