import db from '../db.js';  // importar PouchDB
const DOC_TYPE = "event";  

// Lógica de negocios
// aqui va la conexion a la base datos y poder trabajar con ella

// Function to create a new Event
const createEvent = async (eventData) => {
    const evento = {
        type: DOC_TYPE,  // Distinguishes this doc as a 'Event'
        ...eventData,
    };
    const response = await db.post(evento); // let PouchDB generate the _id
    return { _id: response.id, _rev: response.rev, ...evento,  };
};
  
// Function to get all Events
const getEvents = async () => {
const result = await db.allDocs({ include_docs: true });
return result.rows
    .map(row => row.doc)
    .filter(doc => doc.type === DOC_TYPE);
};
//   // Function to get one event
const getEvent = async (id) => {
    try {
        const evento = await db.get(id)   // cogemos documento (event)
        return { _id: evento.id, _rev: evento.rev, ...evento,  }

    } catch (error) {
        return { error: error.message }
    }
}; 

const deleteEvent = async(id) => {
    try {
        const evento = await db.get(id)   // cogemos documento (car)
        await db.remove(evento)   // borra documento
        return { _id: evento.id, _rev: evento.rev, ...evento,  }

    } catch (error) {
       return { error: 'Failed to delete login' };
    }
};

// router.put('/:id', async (req, res) => {
const updateEvent = async(id, body) => {
    try {
        const updatedEvento = body;  // The updated event data from the request body
        console.log("imprimo updatedEvento: ", updatedEvento)
        // Fetch the current evento data using the ID
        const existingEvento = await db.get(id);
        
        // Update the existing evento's data with the new data
        const updatedDoc = {
            ...existingEvento,
            ...updatedEvento, // This will overwrite any matching fields
        };

        // Save the updated document back to the database
        const response = await db.put(updatedDoc);

        return { _id: response.id, _rev: response.rev, ...updatedEvento,  }
    } catch (error) {
        return { error: 'Failed to update evento' };
    }
};


export { createEvent, getEvents, getEvent, deleteEvent, updateEvent };