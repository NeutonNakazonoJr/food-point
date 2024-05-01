const { newImage, getImage, getOldImage, deleteImage } = require("../repositories/uploadRepository");

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
    },

    getImage: async (req, res) => {
        try {
            const userID = req.userId;
            const image = await getImage(userID);
            if(image.length == 0){
                return res.status(200).json(image)
            }
            else if (image.length == 1) {
                return res.status(200).json(image)
            }
            else if (image.length > 1) {
                const oldImage = await getOldImage(userID);
                const oldName = oldImage[0].hash_name;
                await deleteImage(oldName);
                const imageCheck = await getImage(userID);
                return res.status(200).json(imageCheck);
            }else{
                throw new Error()
            }
        }
        catch (error) {
            return res.status(500).json({ message: "Erro interno, não foi possivel resgatar a imagem" })
        }
    }
}

module.exports = uploadController;