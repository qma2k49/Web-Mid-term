import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    content: { type: String, required: true }
}, {
    timestamps: true
});

const Posts = mongoose.model("Posts", postSchema);

export default Posts;
