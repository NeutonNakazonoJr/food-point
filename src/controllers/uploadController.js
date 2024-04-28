const { image } = require("pdfkit");
const { newImage } = require("../repositories/uploadRepository");

const uploadController = {
    uploadImage: async (req, res) => {
        try {
            const image = {
                user_id: req.userId,
                original_name: req.file.originalname,
                hash_name: req.file.filename,
                image_path: req.file.path
            };

            const updatedImage = await newImage(image);
            res.status(201).json(updatedImage)
        }
        catch (error) {
            return res.status(500).json({ message: "Erro interno, não foi possivel salvar a imagem" })
        }

        
    }
}

module.exports = uploadController;