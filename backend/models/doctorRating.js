import mongoose from 'mongoose'

const doctorRatingSchema=mongoose.Schema({
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor' 
      },
    rating:{
        type:Number,
    },
    
},{
    timestamps: true
})


const DoctorRating=mongoose.model('DoctorRating',doctorRatingSchema)

export default DoctorRating