const dbConnection = require('../database/db-connection.js')

const uploadRepository = {
   newImage: async (image) => {
        const query = 
        'INSERT INTO upload (user_id, original_name, hash_name, image_path) VALUES ($1, $2, $3, $4) RETURNING *';
        try{
            const { rows } = await dbConnection.query(query, [image.user_id, image.original_name, image.hash_name, image.image_path]);
            return rows;
        } catch(error){
            throw new Error("Erro ao inserir imagem no banco de dados", error)
        }
    }
   
}

module.exports = uploadRepository;