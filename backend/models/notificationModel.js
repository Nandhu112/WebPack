import mongoose from 'mongoose'

const notificationSchema=mongoose.Schema({
    link:{
        type:String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' 
    },
    unRead:{
        type:Boolean,
        default:true
    },
    videoCall:{
        type:Boolean,
        default:false
    },
    prescription:{
        type:Boolean,
        default:false
    },
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment' ,
    }, 
   
},{
    timestamps: true
})


const Notification=mongoose.model('Notification',notificationSchema)

export default Notification