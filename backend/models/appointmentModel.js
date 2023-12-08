import mongoose from 'mongoose'

const appointmentSchema=mongoose.Schema({

    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor' 
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital' 
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department' 
    },
    slot:{
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


const Appointment=mongoose.model('Appointment',appointmentSchema)

export default Appointment