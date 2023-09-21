// Importa el modelo User desde tu archivo DB_connection
const { User } = require('../DB_connection');

// Define la función login
const login = async (req, res) => {
  try {
    // Obtiene los datos de email y contraseña del cuerpo de la solicitud (request body)
    const { email, password } = req.query;

    // Verifica que ambos campos estén presentes
    if (!email || !password) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    // Busca un usuario con el mismo email en la base de datos
    const user = await User.findOne({
      where: { email }
    });

    // Si no se encuentra un usuario, responde con un status 404
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
    if (password !== user.password) {
      return res.status(403).json({ message: "Contraseña incorrecta" });
    }

    // Si las contraseñas coinciden, responde con un objeto de acceso
    res.json({ access: true });
  } catch (error) {
    // Maneja los errores y responde con un status 500
    res.status(500).json({ error: error.message });
  }
};

// Exporta la función login
module.exports = login;