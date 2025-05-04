# Contenido
Realizado en frontend
1. Página /pages/HomePage.jsx con
  1. useTranslation para el manejo de idiomas (creados ficheros .json con los idiomas en /utils/locales).
  2. variable language que maneja el idioma y que se pasa como prop al componente hijo /components/Login.jsx
  3. 2 botones para cambiar de idioma que se guarde el dato del idioma en el localStorage.
2. Componente /components/Login.jsx con
  1. ventana login con MUI
  2. useTranslation para el manejo de idiomas cambiando todo el texto al idioma del prop pasado por /pages/HomePage.jsx
  3. llamadas a api en backend http://localhost:5000/api/v1/login para el login
  4. llamadas a api en backend http://localhost:5000/api/v1/login/signup para el signup
Realizado en backend
1. Ruta para el login con comprobación de usuario
2. Ruta para el signup con comprobación de usuario
3. Rutas para get de todos los "login", delete para borrar un "login"

