import multer from 'multer';

const multerErrorHandle = (uploadFile) => {
    return (req, res, next) => {
        uploadFile(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: err.message });
        }
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        next();
    });
};
};
export default multerErrorHandle;