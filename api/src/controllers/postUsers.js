const User = require('../DB_connection');


// Define la función postUser
const postUser = async (req, res) => {
    try {
      // Obtiene el email y la password del cuerpo de la solicitud
      const { email, password } = req.body;
  
      // Verifica que ambos campos estén presentes
      if (!email || !password) {
        return res.status(400).json({ message: "Faltan datos" });
      }
  
      // Crea un nuevo usuario en la base de datos
      const user = await User.create({
        email,
        password // Establece la contraseña si el usuario no existe
      });
  
      // Devuelve el usuario creado o encontrado
      res.status(201).json(user);
    } catch (error) {
      // Maneja los errores y responde con un status 500
      res.status(500).json({ error: error.message });
    }
  };
  
module.exports = postUser;