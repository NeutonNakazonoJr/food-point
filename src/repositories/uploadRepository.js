const dbConnection = require('../database/db-connection.js')
const fs = require('fs');
const path = require('path');

const uploadRepository = {

    newImage: async (image) => {
        const query =
            'INSERT INTO upload (user_id, hash_name, image_path) VALUES ($1, $2, $3) RETURNING *';
        try {
            const { rows } = await dbConnection.query(query, [image.user_id, image.hash_name, image.image_path]);
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
    updateImage: async (image) => {
        const query = 'UPDATE upload SET hash_name = $1, image_path = $2, uploaded = CURRENT_TIMESTAMP WHERE user_id = $3 RETURNING *';
        try{
            const {rows} = await dbConnection.query(query, [image.hash_name, image.image_path, image.user_id])
        return rows[0]
        }
        catch (error) {
            throw new Error("Erro ao atualizar imagem no banco de dados", error) 
        }
    },
    deleteImage: async (oldName) => {
        const imagePath = path.join(__dirname, '../../public/assets/uploads/', oldName);
        try {
            if (!fs.existsSync(imagePath)) {
            throw new Error()
            } 
            fs.unlinkSync(imagePath);
        }
        catch(error){
            console.error("Erro ao apagar arquivo imagem", error);
        }
    }

}

module.exports = uploadRepository;