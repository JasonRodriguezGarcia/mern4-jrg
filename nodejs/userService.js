import fetch from 'node-fetch';

/**
 * Devuelve datos de un API de un usuario
 * Es una función privada
 * @param {*} userId - Usuario para conseguir datos
 * @returns {array} - Datos del usuario
 */
const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (!response.ok) {
      throw new Error('Unable to fetch user data');
    }
    return response.json();
  } catch (error) {
    throw new Error('Unable to fetch user data');
  }
};

/**
 * Manda userId a otra función que hace la llamada API
 * Es una función publica
 * @param {*} userId - Usuario para conseguir datos
 * @returns {string} - Datos del usuario
 */
export const getUserName = async (userId) => {
  const userData = await fetchUserData(userId);
  return `${userData.username}`;
};
export const getUserEmail = async (userId) => {
  const userData = await fetchUserData(userId);
  return `${userData.email}`;
};
export const getUserAddress = async (userId) => {
  const userData = await fetchUserData(userId);
  return `${JSON.stringify(userData.address)}`;
};
