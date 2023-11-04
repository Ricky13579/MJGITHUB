const express = require('express');
const app = express();
const port = 3000;

app.get('/hi', (req, res) => {
    res.json({ message: '안녕하세요, 클라이언트!' });
});

app.listen(port, () => {
    console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});