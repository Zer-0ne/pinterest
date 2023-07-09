import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please add a Title"]
    },
    Description: {
        type: String,
    },
    image: {
        type:String,
        required:[true, "Please add a Image"]
    },
    imageid: {
        type:String,
    },
    tag: String,
    authorId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [
        {
            comment: {
                type: String
            },
            userId: {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
            replies: [
                {
                  reply: {
                    type: String,
                  },
                  userId: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                  },
                },
              ],
        }
    ]

},{
    timestamps:true
});
export default mongoose.models.Pin || mongoose.model("Pin", postSchema);