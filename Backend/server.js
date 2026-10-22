import express from 'express';

const app = express();

app.listen(5001, () => {
    console.log('server bắt đầu trên cổng 5001')
})

app.get("/api/song", (request, response) => {
    response.send("Âm thầm bên em")
});