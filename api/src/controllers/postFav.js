const Favorite = require('../DB_connection');

const postFav = async (req, res)=>{
    try {
        const {name, origin, status, image, species, gender} = req.body;

        if(!name || !status || !origin || !image || !species || !gender){
           return res.status(401).json({message: 'Faltan Datos'});
        }

        const [favorite, created] = await Favorite.findOrCreate({
            where: { name }, // Busca por el campo name
            defaults: {
              name,
              origin,
              status,
              image,
              species,
              gender,
            }, // Establece los valores si el personaje no existe
          });
      
          // Busca todos los personajes favoritos guardados en la base de datos
          const allFavorites = await Favorite.findAll();
      
          // Responde con el arreglo de personajes favoritos
          res.status(200).json(allFavorites);
        } catch (error) {
          // Maneja los errores y responde con un status 500
          res.status(500).json({ error: error.message });
        }
      };
      
module.exports = postFav;      