import mongoose from "mongoose";

const Connection=async (dbName,pass)=>{
    
    let URL="mongodb+srv://devansh12_02:chichore123@cluster0.ylso8me.mongodb.net/Blog?retryWrites=true&w=majority&appName=Cluster0";

    // URL=URL.replace("<PASSWORD>",pass).replace("<DBNAME>",dbName);
    
    try{
        await mongoose.connect(URL);
        console.log("--------------- Database Connected --------------------");
    }
    catch(error){
        console.log(`Error ${error}`);
    }
}

export default Connection;