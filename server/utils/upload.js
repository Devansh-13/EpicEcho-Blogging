import {GridFsStorage} from 'multer-gridfs-storage';
import dotenv from "dotenv";
import multer from 'multer';

dotenv.config();

const dbname=process.env.DB_NAME;
const password=process.env.DB_PASS;

const storage=new GridFsStorage({
    url:`mongodb+srv://devansh12_02:${password}@cluster0.ylso8me.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=Cluster0`,
    options:{useNewUrlParser:true},
    file:(request,file)=>{
        const match=["image/png","image/jpeg"];

        if(match.indexOf(file.mimetype)===-1){
            return `${Date.now()}-blog-${file.originalname}`;
        }
        return {
            bucketName:"photos",
            filename:`${Date.now()}-blog-${file.originalname}`
        }
    }
})

export default multer({storage});