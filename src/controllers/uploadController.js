const { newImage, getImage, updateImage, deleteImage } = require("../repositories/uploadRepository");

const uploadController = {
    uploadImage: async (req, res) => {
        try {
            const user = req.userId;
            const image = {
                user_id: user,
                hash_name: req.file.filename,
                image_path: req.file.path
            };
            const existingImage = await getImage(user);
            if(existingImage.length > 0){
                const updatedImg = await updateImage(image)
                const oldName = existingImage[0].hash_name;
                await deleteImage (oldName)
                res.status(200).json(updatedImg)
            }
            else{
                const newImg = await newImage(image)
                res.status(201).json(newImg)
            }
        }
        catch (error) {
            return res.status(500).json({ message: "Erro interno, não foi possivel salvar a imagem" })
        }
    },

    getImage: async (req, res) => {
        try {
            const userID = req.userId;
            const image = await getImage(userID);
            return res.status(200).json(image)
            }
        catch (error) {
            return res.status(500).json({ message: "Erro interno, não foi possivel resgatar a imagem", error })
        }
    }
}

module.exports = uploadController;