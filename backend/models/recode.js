import mongoose from 'mongoose'

const recordSchema=mongoose.Schema({

    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient' 
    },

    ailments:{
        type: Array,
    },
    allergies:{
        type:Array
    },
    
},{
    timestamps: true
})


const Record=mongoose.model('Record',recordSchema)

export default Record