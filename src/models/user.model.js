import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    apiKey: { type: String, default: null }
}, {
    timestamps: true
});

const Users = mongoose.model("Users", userSchema);

export default Users;