import mongoose from "mongoose";
const bookingSchema = ({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hoteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  startDate:{
    type:Date,
    required:true
  },
  endData:{
    type:Date,
    required:true
  },
  status:{
    type:String,
    enum:["Confirmed", "Cancelled" ,"Pending"],
    default:"Pending"
}
},{timestamp:true})

const Booking = mongoose.model("Booking" , bookingSchema)
 export default Booking;