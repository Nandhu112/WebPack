import mongoose from 'mongoose';

const chatSchema = mongoose.Schema(
    {
        user: 
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },

        //update
        hospital: 
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Hospital'
            },
        

        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        },
        unreaded: {
            type: Boolean,
            default: true,
        },
        time: {
            type: String,
            default: Date.now
        },
        read: {
            users: {
                read: {
                    type: Boolean,
                    default: false,
                },
                count: {
                    type: Number,
                    default: 0,
                },
            },
            restaurants: {
                read: {
                    type: Boolean,
                    default: false,
                },

                count: {
                    type: Number,
                    default: 0,
                },
            },
        },

    },
    {
        timestamps: true  // Add this line to enable automatic timestamps
    },

);
const ChatRoom = mongoose.model('ChatRoom', chatSchema);

export default ChatRoom;


