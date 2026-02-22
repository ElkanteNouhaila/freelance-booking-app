import mongoose from "mongoose"

let isconnected = false

async function connectdb() {
    if(isconnected){
        console.log("Already connected!")
        return;
    }
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        isconnected = true;
        console.log(`Connected to MongoDB ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
    }
    
}

export default connectdb