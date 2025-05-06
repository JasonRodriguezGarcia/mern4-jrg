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
  
// Function to get one user
const getUser = async (id) => {
    try {
        const user = await db.get(id)   // cogemos documento (user)
        return { _id: user.id, _rev: user.rev, ...user,  }

    } catch (error) {
        return { error: 'Failed to retrieve user' }

    }
};

const deleteUser = async(id) => {
    try {
        const user = await db.get(id)   // cogemos documento (car)
        await db.remove(user)   // borra documento
        return { _id: user.id, _rev: user.rev, ...user,  }

    } catch (error) {
       return { error: 'Failed to delete login' };
    }
};

// router.put('/:id', async (req, res) => {
const updateUser = async(id, body) => {
    try {
        const updatedUser = body;  // The updated user data from the request body
console.log("imprimo updatedUser: ", updatedUser)
        // Fetch the current user data using the ID
        const existingUser = await db.get(id);
        
        // Update the existing user's data with the new data
        const updatedDoc = {
            ...existingUser,
            ...updatedUser, // This will overwrite any matching fields
        };

        // Save the updated document back to the database
        const response = await db.put(updatedDoc);
        return { _id: response.id, _rev: response.rev, ...updatedUser,  }

    } catch (error) {
        return { error: 'Failed to update user' };

    }
};

export { createUser, getUsers, getUser, deleteUser, updateUser };