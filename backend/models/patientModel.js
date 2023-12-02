import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const patientSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
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

},{
    timestamps: true
})


const Patient=mongoose.model('Patient',patientSchema)

export default Patient