import Users from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
    const { apiKey } = req.query;
    if (!apiKey) {
        return res.status(401).json({ message: "Không tìm thấy apiKey" });
    }

    try {
        let userId = "";
        let email = "";

        const matchWithDollar = apiKey.match(/^mern-\$([a-f\d]{24})\$-\$([^$]+)\$-\$(.+)\$$/);

        if (matchWithDollar) {
            userId = matchWithDollar[1];
            email = matchWithDollar[2];
        } else {
            const matchWithoutDollar = apiKey.match(/^mern-([a-f\d]{24})-([^@\s]+@[^@\s\-]+(?:\.[^@\s\-]+)*)-(.+)$/);
            if (matchWithoutDollar) {
                userId = matchWithoutDollar[1];
                email = matchWithoutDollar[2];
            } else {
                return res.status(401).json({ message: "apiKey không đúng định dạng" });
            }
        }

        const user = await Users.findOne({ _id: userId, email: email });
        if (!user) {
            return res.status(401).json({ message: "Người dùng không tồn tại hoặc thông tin email không khớp" });
        }

        if (user.apiKey !== apiKey) {
            return res.status(401).json({ message: "apiKey không hợp lệ hoặc đã hết hạn" });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Lỗi xác thực apiKey" });
    }
};

export default authMiddleware;
