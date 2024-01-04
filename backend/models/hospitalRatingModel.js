import mongoose from 'mongoose'

const hospitalRatingSchema=mongoose.Schema({
    hospital:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital' 
      },
    rating:{
        type:Number,
    },
    
},{
    timestamps: true
})


const HospitalRating=mongoose.model('HospitalRating',hospitalRatingSchema)

export default HospitalRating