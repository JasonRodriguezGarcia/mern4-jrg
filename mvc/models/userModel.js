import db from '../db.js';  // importar PouchDB
const DOC_TYPE = "user";  

// Lógica de negocios
// aqui va la conexion a la base datos y poder trabajar con ella

// Function to create a new user
const createUser = async (userData) => {
    const user = {
        type: DOC_TYPE,  // Distinguishes this doc as a 'user'
        ...userData,
    };
    const response = await db.post(user); // let PouchDB generate the _id
    return { _id: response.id, _rev: response.rev, ...user,  };
  };
  
  // Function to get all users
  const getUsers = async () => {
    const result = await db.allDocs({ include_docs: true });
    return result.rows
        .map(row => row.doc)
        .filter(doc => doc.type === DOC_TYPE);
  };
  
//   // Function to get one user
  const getUser = async (id) => {
    // const {id} = req.params
    try {
        const user = await db.get(id)   // cogemos documento (user)
        // await db.remove(user)   // borra documento
        res.status(200).json({message: "OK"})

    } catch (error) {
        res.status(500).json({ ...user });
    }
};

    // const result = await db.allDocs({ include_docs: true });

    // return result.rows
    //     .map(row => row.doc)
    //     .filter(doc => doc.type === DOC_TYPE);
  
export { createUser, getUsers, getUser };