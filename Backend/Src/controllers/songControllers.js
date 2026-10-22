export const getAllSong = (req, res) => {
    res.status(200).send("Cơn mưa ngang qua");
}

export const postAllSong = (req, res) => {
    res.status(200).json("Thêm bài hát mới thành công");
}

export const updateSong = (req, res) => {
    res.status(200).json("cập nhật bài hát mới thành công");
}
export const deleteSong = (req, res) => {
    res.status(200).json("bài hát đã được xóa");
}