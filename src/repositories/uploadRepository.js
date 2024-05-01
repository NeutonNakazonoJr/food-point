const dbConnection = require('../database/db-connection.js')
const fs = require('fs');
const path = require('path');

const uploadRepository = {

    newImage: async (image) => {
        const query =
            'INSERT INTO upload (user_id, original_name, hash_name, image_path) VALUES ($1, $2, $3, $4) RETURNING *';
        try {
            const { rows } = await dbConnection.query(query, [image.user_id, image.original_name, image.hash_name, image.image_path]);
            return rows;
        } catch (error) {
            throw new Error("Erro ao inserir imagem no banco de dados", error)
        }
    },
    getImage: async (userId) => {
        const query = 'SELECT hash_name FROM upload WHERE user_id = $1';
        try {
            const { rows } = await dbConnection.query(query, [userId]);
            return rows;
        }
        catch (error) {
            throw new Error("Erro ao localizar imagem no banco de dados", error)
        }
    },
    getOldImage: async (userId) => {
        const query = 'SELECT hash_name FROM upload WHERE user_id = $1 ORDER BY uploaded ASC LIMIT 1';
        try {
            const { rows } = await dbConnection.query(query, [userId]);
            return rows;
        }
        catch (error) {
            throw new Error("Erro ao localizar imagem", error)
        }
    },
    deleteImage: async (oldName) => {
        const imagePath = path.join(__dirname, '../../public/assets/uploads/', oldName);
        const query = 'DELETE FROM upload WHERE hash_name = $1';
        try {
            if (!fs.existsSync(imagePath)) {
            throw new Error()
            } 
            fs.unlinkSync(imagePath);
            const { rows } = await dbConnection.query(query, [oldName]);
            return rows;
        }
        catch(error){
            console.error("Erro ao apagar imagem", error);
        }
    }

}

module.exports = uploadRepository;