import multer from 'multer'
import fs from 'fs'

const storage = multer.diskStorage({

    destination:"uploads",
      filename: (req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg','application/pdf']

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('File type not allowed'), false)
    }
}

const upload = multer({storage:storage,
    fileFilter:fileFilter,
    limits:{
        fileSize:5*1024*1024
    }
})

export default upload









