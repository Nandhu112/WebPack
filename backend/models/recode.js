import mongoose from 'mongoose'

const recordSchema=mongoose.Schema({

    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient' 
    },

    medicalConditions:{
        type: Array,
    },
    allergies:{
        type:Array
    },
    sugar: {
        type: Array,
    },
    Cholesterol: {
        type: Array,
    },
    medicationList: {
        type: Array,
 
    },
    medicalConditions:{
        type:Array, 
    },
    method:{
      type:String
    },
    status:{
        type:String,
        default:'Pending'
      },
    patient:{
        type:mongoose.Schema.Types.ObjectId, 
        ref: 'Patient'  
      },
      date:{
        type:String, 
    },
    time:{
        type:String, 
    },
    
},{
    timestamps: true
})


const Record=mongoose.model('Record',recordSchema)

export default Record