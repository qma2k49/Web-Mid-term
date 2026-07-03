import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    content: { type: String, required: true }
}, {
    timestamps: true
});

export default mongoose.model("Posts", postSchema);
