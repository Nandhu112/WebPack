import mongoose from 'mongoose'

const verificationSchema=mongoose.Schema({
 
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital' 
    },
    certificate:{
        type:String,
      },
      status:{
        type:String,
        default:'pending'
      }, 
},{
    timestamps: true
})


const Verification=mongoose.model('Verification',verificationSchema)

export default Verification