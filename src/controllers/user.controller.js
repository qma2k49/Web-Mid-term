import bcrypt from "bcrypt";
import Users from "../models/user.model.js";

const register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            return res.status(400).json({ message: "userName, email và password là bắt buộc" });
        }

        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email đã tồn tại trong hệ thống" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Users.create({
            userName,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "Đăng ký tài khoản thành công",
            user: {
                _id: newUser._id,
                userName: newUser.userName,
                email: newUser.email,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt
            }
        });
    } catch (error) {
        console.error("Lỗi đăng ký:", error);
        return res.status(500).json({ message: "Đã xảy ra lỗi trên hệ thống khi đăng ký" });
    }
};

// Đăng nhập người dùng
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email và password là bắt buộc" });
        }

        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email hoặc mật khẩu không chính xác" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Email hoặc mật khẩu không chính xác" });
        }

        const randomstring = `${Math.random().toString(16).substring(2, 7)}-${Math.random().toString(16).substring(2, 6)}-${Math.random().toString(16).substring(2, 5)}-${Math.random().toString(16).substring(2, 6)}-${Math.random().toString(16).substring(2, 10)}`;
        const apiKey = `mern-$${user._id}$-$${user.email}$-$${randomstring}$`;

        user.apiKey = apiKey;
        await user.save();

        return res.status(200).json({
            message: "Đăng nhập thành công",
            apiKey,
            user: {
                _id: user._id,
                userName: user.userName,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Đã xảy ra lỗi trên hệ thống khi đăng nhập" });
    }
};


export {
    register,
    login
}