 import mongoose from "mongoose";
 const hotelSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    descripation:{
        type:String,
 
    },
    location :{
        type:String
    },
    pricePerNight:{
        type:String,
        required:true
    },
    roomsAvailable:{
        type:String,
        required:true
    }
    
 } ,{timestamps:true})


 const Hotel = mongoose.model("Hotel",  hotelSchema )