import db from '../db.js';  // importar PouchDB
const DOC_TYPE = "event";  

// Lógica de negocios
// aqui va la conexion a la base datos y poder trabajar con ella

// Function to create a new Event
const createEvent = async (EventData) => {
    const Event = {
        type: DOC_TYPE,  // Distinguishes this doc as a 'Event'
        ...EventData,
    };
    const response = await db.post(Event); // let PouchDB generate the _id
    return { _id: response.id, _rev: response.rev, ...Event,  };
  };
  
  // Function to get all Events
  const getEvents = async () => {
    const result = await db.allDocs({ include_docs: true });
    return result.rows
        .map(row => row.doc)
        .filter(doc => doc.type === DOC_TYPE);
  };
//   // Function to get one user
const getEvent = async (id) => {
  // const {id} = req.params
  try {
      const evento = await db.get(id)   // cogemos documento (event)
      // await db.remove(user)   // borra documento
      res.status(200).json(evento)

  } catch (error) {
      res.status(500).json({ ...evento });
  }
}; 
export { createEvent, getEvents, getEvent };