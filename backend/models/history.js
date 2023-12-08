import mongoose from 'mongoose'

const historySchema=mongoose.Schema({

    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient' 
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor' 
    }, 
    pressure: {
        type: Array,
    },
    sugar: {
        type: String,
    },
    Cholesterol: {
        type: String,
    },
    medicationList: {
        type: String,
 
    },

    bloodTestResults:{
        type: Array,
    },
    testResults:{
        type:Array
    },
    
    time:{
        type:String, 
    },
    
},{
    timestamps: true
})


const History=mongoose.model('History',historySchema)

export default History