import {useState} from 'react';

const usePasswordValidation = (initialPassword = "") => {

    const [password, setPassword] = useState(initialPassword);
    const [error, setError] = useState("");

    const handlePasswordChange = (e) => {

        const existingPassword = e.target.value;
        setPassword(existingPassword);

        if (!validatePassword(existingPassword)) {
            setError("La contraseña no es válida");
        }
        else {
            setError("");
        }
    }

    // TO DO Crear una funcion para validar la longitud de la contraseña
    // const validatePassword = (newPassword) => { ....
    const validatePassword = (newPassword) => {
        return newPassword.length < 8 ? false : true
    }
    
    
    return {
      password, 
      handlePasswordChange, 
      error
    }

}

export default usePasswordValidation;