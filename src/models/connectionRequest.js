const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        requried: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        requried: true,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["interested", "ignored", "accepeted", "rejected"],
            message: `{VALUE} is invalid status type`
        }
    }
},
{ timestamps: true }
);

connectionRequestSchema.index({ fromUserId: 1});
connectionRequestSchema.index({ toUserId: 1 });

connectionRequestSchema.pre("save", function(next) {
   const connectionRequest = this;

   if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send connection request to yourself!")
   }
   next();
});

const ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequestModel;