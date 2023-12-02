import mongoose from 'mongoose'

const appointmentSchema=mongoose.Schema({

    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor' 
    },
    slot:{
        type:Array, 
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


const Appointment=mongoose.model('Appointment',appointmentSchema)

export default Appointment