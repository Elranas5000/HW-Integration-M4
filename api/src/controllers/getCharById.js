const axios = require("axios"); //importamos axios para hacer peticiones en la api

//declaro mi constante getCharById, un controlador que luego importaré en index.js
const getCharById = async (res, id) => {

    const apiUrl = `https://rickandmortyapi.com/api/character/${id}`; //declaro la url de la api


    try {
    //ahora realizamos la pteicion GET a la api:
    const {data} = await axios.get(apiUrl) //hago la peticion a la api usando axios y promesas
        //creamos el objeto con las props del character
        const characterData = {
            id, 
            name: data.name,
            gender: data.gender,
            species: data.species,
            origin: data.origin,
            image: data.image,
            status: data.status
        }
        //respondemos usando sintaxis de express (?query)
        characterData.name ? res.status(200).json(characterData): res.status(404).send("Not found")
    
    } catch (error) {
        
        // En caso de error, envía una respuesta con status 500 y un mensaje de error
        res.status(500).json({message: error.message})
    }
    
    
    

    
};

module.exports = getCharById; //exportamos el controlador.
