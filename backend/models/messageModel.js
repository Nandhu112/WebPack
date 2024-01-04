import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatRoom'
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
},
hospital:{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Hospital' 
},
isUser:{
  type:Boolean,
  default:false  
},
  content: {
    type: String,
    trim:true
  }
},
  {
    timestamps: true
});

const Message = mongoose.model('ChatMessage', chatMessageSchema);

export default Message;