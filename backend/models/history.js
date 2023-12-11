import mongoose from 'mongoose'

const historySchema=mongoose.Schema({

    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment' ,
        required:true
    },  
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient' ,
        required:true
    },
    pName: {
        type: String,
        required:true 
    },
    pImage: {
        type: String,  
    },
    pGender: {
        type: String,
        required:true  
    },
    pAge: {
        type: String, 
        required:true 
    },
    Blood: {
        type: String, 
        required:true 
    },
    ailments:{
        type: Array,
    },
    allergies:{
        type:Array
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor' ,
        required:true
    }, 
    dName: {
        type: String,
        required:true
    },
    dImage: {
        type: String,
    },
    dTitle: {
        type: String,
        required:true
    },
    department: {
        type: String,
        required:true
    },
    depatrmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department' ,
        required:true
    }, 
    hospital: {
        type: String,
        required:true
    },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital' ,
        required:true
    },
    testResults: {
        type: Array,
    },
    medicationList: {
        type: Array,
    },
    treatments: {
        type: Array,
    },
    description: {
        type: String,
    },
   
},{
    timestamps: true
})


const History=mongoose.model('History',historySchema)

export default History