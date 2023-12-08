import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const patientSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User' 
      
    },
    gender:{
        type:String,
        required:true,
    },
    dateOfBirth:{
        type:String,
        required:true,
     
    },
    bloodGroup:{
        type:String,
        required:true
    },
    appointments:{
        type:Array,
  
    },
    history:{
        type:Array,
    },
        medicalConditions:{
        type: Array,
    },
    allergies:{
        type:Array
    },
    profileImage: {
        type: String,
      },

},{
    timestamps: true
})


const Patient=mongoose.model('Patient',patientSchema)

export default Patient