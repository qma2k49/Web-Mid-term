import Posts from "../models/post.model.js";

// Tạo bài viết mới
export const createPost = async (req, res) => {
    try {
        const { userId, content } = req.body;

        if (!userId || !content) {
            return res.status(400).json({ message: "userId và content là bắt buộc" });
        }

        if (userId !== req.user._id.toString()) {
            return res.status(403).json({ message: "Bạn không thể tạo bài viết cho tài khoản khác" });
        }

        const newPost = await Posts.create({
            userId,
            content
        });

        return res.status(201).json({
            message: "Tạo bài viết thành công",
            post: newPost
        });
    } catch (error) {
        console.error("Lỗi tạo bài viết:", error);
        return res.status(500).json({ message: "Đã xảy ra lỗi trên hệ thống khi tạo bài viết" });
    }
};

// Cập nhật bài viết
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ message: "Nội dung bài viết (content) là bắt buộc" });
        }

        const post = await Posts.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Bài viết không tồn tại" });
        }

        if (post.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Bạn không có quyền chỉnh sửa bài viết này" });
        }

        post.content = content;
        await post.save();

        return res.status(200).json({
            message: "Cập nhật bài viết thành công",
            post
        });
    } catch (error) {
        console.error("Lỗi cập nhật bài viết:", error);

        if (error.name === "CastError") {
            return res.status(400).json({ message: "ID bài viết không hợp lệ" });
        }

        return res.status(500).json({ message: "Đã xảy ra lỗi trên hệ thống khi cập nhật bài viết" });
    }
};
