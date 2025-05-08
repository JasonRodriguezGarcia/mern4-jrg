import React from 'react';
import usePasswordValidation from '../hooks/usePasswordValidation';

const PasswordForm = () => {

  // TO DO definir los constante para usar el password, error y handlePasswordChange del hook usePasswordValidation
  const {password, error, handlePasswordChange} = usePasswordValidation('')

  return (
    <form>
      <div>
        <label>Password</label>
        <input 
          type="password" 
          value={password} 
          onChange={handlePasswordChange} 
        />
        {error && <p>{error}</p>} {/* Display error if exists */}
      </div>
      <button type="submit" disabled={!!error}>Submit</button>
    </form>
  );
};

export default PasswordForm;