const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());
const filePath = 'D:\\MJGITHUB\\202027042기말고사\\2K48Game\\gameRecords.txt';
app.post('/saveGameRecord', (req, res) => {
    const gameData = req.body;
    const { date, gameTime, score, gamesize, result } = gameData;
    const record = `날짜: ${date}\t\t|\t\t게임시간: ${gameTime}\t\t|\t\t점수: ${score}\t\t|\t\t게임크기: ${gamesize}\t\t|\t\t승리여부: ${result}\t\t\n`;

    fs.appendFile(filePath, record, (err) => {
        if (err) {
            console.error('파일에 데이터를 추가하는 중 에러 발생:', err);
            res.status(500).send('서버 에러: 게임 기록을 저장하지 못했습니다.');
        } else {
            console.log('게임 기록을 성공적으로 저장했습니다.');
            res.status(200).send('게임 기록 저장 완료');
        }
    });
});
app.get('/viewGameRecords', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('파일을 읽는 중 에러 발생:', err);
            res.status(500).send('서버 에러: 게임 기록을 읽어오지 못했습니다.');
        } else {
            console.log('게임 기록을 성공적으로 읽어왔습니다.');
            const records = data.split('\n');
            
            // Create an HTML list by wrapping each record in <li> tags
            const htmlRecords = records.map(record=> `<li>${record}</li>`).join('');

            // Send the HTML list as a response
            const htmlResponse = `<ul>${htmlRecords}</ul>`;
            res.status(200).send(htmlResponse);
        }
    });
});
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중...`);
});
