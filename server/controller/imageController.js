import grid from "gridfs-stream";
import mongoose from "mongoose";

const url="http://localhost:1400";


let gfs,gridfsBucket;
const con=mongoose.connection;
con.once('open',()=>{
    gridfsBucket=new mongoose.mongo.GridFSBucket(con.db,{
        bucketName:'photos'
    });
    gfs = grid(con.db,mongoose.mongo);
    gfs.collection( "photos");
})


export const uploadImage=(req,res)=>{
    if(!req.file){
        return res.status(404).json({msg:"File not Found"});
    }

    const imageUrl=`${url}/file/${req.file.filename}`;
    return res.status(200).json({imageUrl});
}


export const getImage=async(req,res)=>{
    try{
       
        const file= await gfs.files.findOne({filename:req.params.filename});
        
        const readStream=gridfsBucket.openDownloadStream(file._id);  //chunks or stream
        readStream.pipe(res);
    }
    catch(error){
        return res.status(500).json({message:error.message});
    }
}
