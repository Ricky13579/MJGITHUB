document.addEventListener('DOMContentLoaded',function(){
    const cell = document.querySelectorAll(`.cell`);
    let cellLength = cell.length;
    let board=new Array(7);
    const scoreText = document.querySelector('#score');
    const starttext=document.getElementById('start-text');
    const user=document.getElementById('user');
    const villian=document.getElementById('villian');
    const actiontext=document.getElementById('action-text');
    const bullet=document.getElementById('bullet');
    const userRect = user.getBoundingClientRect();
    const villianRect=villian.getBoundingClientRect();

    const currentDate=new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds=String(currentDate.getSeconds()).padStart(2,'0');
    
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

    let score = 0;
    let time=0;
    let result='';
    let characterStand=true;
    let overCheck = 1;
    let numCheck = 1;
    let size='5X5';
    let endtext='';
    let gameEnded=false;
    for(let i=0;i<7;i++){
        board[i]=new Array(7);
    }
    
    for(let i = 0; i < 7; i++) {
        for(let j = 0; j < 7; j++) {
            if(i == 0 || j == 0 || i == 6 || j == 6) {
                board[i][j] = 1;
            }
        }
    }

    console.log(board);
    init();
   
    //게임의 초기화 함수
    function init() {
        for(let i = 1; i < 6; i++) {
            for(let j = 1; j < 6; j++) {
                board[i][j] = 0;
            }
        }
        randomNum();
        randomNum();
        update();
    }
    function changeChar(){
        if(starttext){
            starttext.style.display='none';
        }
        if(characterStand){
            user.src='D:\\MJGITHUB\\202027042기말고사\\2K48Game\\Game page\\주인공\\1.스탠딩포즈(위아래)\\02앉았다.png'
            villian.src='D:\\MJGITHUB\\202027042기말고사\\2K48Game\\Game page\\빌런\\빌런스탠딩(앉았다일어나)\\빌런앉아.png'
        }
        else{
            user.src='D:\\MJGITHUB\\202027042기말고사\\2K48Game\\Game page\\주인공\\1.스탠딩포즈(위아래)\\01일어났다.png'
            villian.src='D:\\MJGITHUB\\202027042기말고사\\2K48Game\\Game page\\빌런\\빌런스탠딩(앉았다일어나)\\빌런일어나.png'
        }
        characterStand=!characterStand;
    }
   setTimeout(function() {
    if(starttext){
        starttext.style.display='block';
    }
    setInterval(changeChar,150);
   }, 500);
    function updateTime() {
        time++; // 시간을 1초씩 증가시킵니다.
        const minutes = Math.floor(time / 60); // 분 계산
        const seconds = time % 60; // 초 계산
    
        const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // 포맷팅된 시간 문자열 생성
    
        const timeText = document.getElementById('time-text'); // HTML의 시간을 나타내는 요소 가져오기
        timeText.textContent = `Time: ${formattedTime}`; // 시간 업데이트
    }
    setInterval(updateTime, 1000); // 1초마다 updateTime 함수 호출하여 시간 업데이트

    // bullet을 이동시키는 함수
function moveBullet(userRect, villianRect) {
    bullet.style.display='block';
    bullet.src='D:\\MJGITHUB\\202027042기말고사\\2K48Game\\Game page\\주인공\\4.일반.특수투사체,특수투사체 마크\\일반투사체.png';
    bullet.style.position='absolute';

    const userCenterX = userRect.left + userRect.width / 2;
    const userCenterY = userRect.top + userRect.height / 2;
    const villianCenterX = villianRect.left + villianRect.width / 2;
    const villianCenterY = villianRect.top + villianRect.height / 2;

    const bulletSpeed = 5; // 원하는 속도로 조절해주세요.
    
    let bulletX = userCenterX;
    let bulletY = userCenterY;

    const deltaX = (villianCenterX - userCenterX) / bulletSpeed;
    const deltaY = (villianCenterY - userCenterY) / bulletSpeed;

    bullet.style.left = `${bulletX}px`;
    bullet.style.top = `${bulletY}px`;
    const moveBulletInterval = setInterval(() => {
        bulletX += deltaX;
        bulletY += deltaY;

        bullet.style.left = `${bulletX}px`;
        bullet.style.top = `${bulletY}px`;

        // bullet이 villian에 도달했을 때
        const distance = Math.sqrt((bulletX - villianCenterX) ** 2 + (bulletY - villianCenterY) ** 2);
        if (distance <10) { // 원하는 threshold 값을 해주세요.
            clearInterval(moveBulletInterval);
            villian.src='D:\\MJGITHUB\\202027042기말고사\\2K48Game\\Game page\\빌런\\빌런피격\\빌런피격.png'
            bullet.style.display='none';
        }
    }, 150); // 이동 속도 조절에 따라서 60fps로 움직이도록 설정합니다.
}
    function update() {  
        //html 셀 내용 업데이트 후 값에 따라 coloring 함수의 조건에 맞는 색을 다르게 입힘
        let cnt = 0;
        for(let i = 1; i < 6; i++) {
            for(let j = 1; j < 6; j++) {
                cell[cnt].innerHTML = board[i][j] == 0 ? "" : board[i][j];
                coloring(cnt);
                cnt++;
            }
        }
        setScore();
    }
    
    function setScore() {
        scoreText.innerHTML = "Score : " + score;
    }
    
    //값에 따라 색을 바꿔주는 함수
    function coloring(cnt) { 
        cell[cnt].style.border = "solid black 1px";
        switch(cell[cnt].innerHTML) {
            case "2":
                cell[cnt].style.backgroundColor = "#0278AE";
                break;
            case "4":
                cell[cnt].style.backgroundColor = "#51ADCF";
                break;
            case "8":
                cell[cnt].style.backgroundColor = "#3D72A6";
                break;    
            case "16":
                cell[cnt].style.backgroundColor = "#7579E7";
                break;
            case "32":
                cell[cnt].style.backgroundColor = "#9AB3F5";
                break;
            case "64":
                cell[cnt].style.backgroundColor = "#B088F9";
                break;
            case "128":
                cell[cnt].style.backgroundColor = "#c4fb6d";
                break;
            case "256":
                cell[cnt].style.backgroundColor = "#0be881";
                break;
            case "512":
                cell[cnt].style.backgroundColor = "#34e7e4";
                break;
            case "1024":
                cell[cnt].style.backgroundColor = "#cd84f1";
                break;
            case "2048":
                cell[cnt].style.backgroundColor = "#F8EFBA";
                break;
            default:
                if(cell.innerHTML > 2048) {
                    cell[cnt].style.backgroundColor = "#7d5fff";
                }
                else {
                    cell[cnt].style.backgroundColor = "#9d7e7e";
                }    
        }
    }
    
    //빈 타일에 숫자2에 해당하는 타일을 랜덤으로 생성시키는 함수
    function randomNum() {
        ranPlaceX = Math.floor(Math.random() * 5 + 1);
        ranPlaceY = Math.floor(Math.random() * 5 + 1);
        if(board[ranPlaceX][ranPlaceY] == 0) {
            board[ranPlaceX][ranPlaceY] = 2;
        }
        else {
            randomNum();
        }
        update();
    }
    
    function moveLeftNum() {
        let k;
    
        numCheck = 1
    
        for(let i = 1; i < 6; i++) {
            for(let j = 1; j < 6; j++) {
                if(board[i][j] != 0) {
                    k = j;
                    while(1) {
                        if(board[i][k-1] != 0) {
                            break;
                        }
                        board[i][k-1] = board[i][k];
                        board[i][k] = 0;
                        k--;
                        numCheck = 0;
                    }
                }
            }
        }
    }
    
    function moveLeft() {
        gameOver();
        moveLeftNum();
    
        for(let i = 1; i < 6; i++) {
            for(let j = 1; j < 5; j++) {
                if(board[i][j] == board[i][j+1] && board[i][j] != 0) {
                    numCheck = 0;
                    score += board[i][j];
                    board[i][j] *= 2;
                    board[i][j+1] = 0;
                    moveBullet(userRect,villianRect);
                }
            }
        }
        if(!numCheck) {
            moveLeftNum();
            randomNum();
            update();
        }
    }
    
    function moveUpNum() {
        let k;
    
        numCheck = 1;
    
        for(let i = 1; i < 6; i++) {
            for(let j = 1; j < 6; j++) {
                if(board[j][i] != 0) {
                    k = j;
                    while(1) {
                        if(board[k-1][i] != 0) {
                            break;
                        }
                        board[k-1][i] = board[k][i];
                        board[k][i] = 0;
                        k--;
                        numCheck = 0;
                    }
                }
            }
        }
    }
    
    function moveUp() {
        gameOver();
        moveUpNum();
    
        for(let i = 1; i < 6; i++) {
            for(let j = 1; j < 5; j++) {
                if(board[j][i] == board[j+1][i] && board[j][i] != 0) {
                    score += board[j][i];
                    board[j][i] *= 2;
                    board[j+1][i] = 0;
                    numCheck = 0;
                    moveBullet(userRect,villianRect);
                }
            }
        }
        if(!numCheck) {
            moveUpNum();
            randomNum();
            update();
        }
    }
    
    function moveRightNum() {
        let k;
        numCheck = 1;
        for(let i = 1; i < 6; i++) {
            for(let j = 5; j > 0; j--) {
                if(board[i][j] != 0) {
                    k = j;
                    while(1) {
                        if(board[i][k+1] != 0) {
                            break;
                        }
                        board[i][k+1] = board[i][k];
                        board[i][k] = 0;
                        k++;
                        numCheck = 0;
                    }
                }
            }
        }
    }
    
    function moveRight() {
        gameOver();
        moveRightNum();
    
        for(let i = 1; i < 6; i++) {
            for(let j = 5; j >1; j--) {
                if(board[i][j] == board[i][j-1] && board[i][j] != 0) {
                    score += board[i][j];
                    board[i][j] *= 2;
                    board[i][j-1] = 0;
                    numCheck = 0;
                    moveBullet(userRect,villianRect);
                }
            }
        }
        if(!numCheck) {
            moveRightNum();
            randomNum();
            update();
        }
    }
    
    function moveDownNum() {
        let k;
    
        numCheck = 1;
    
        for(let i = 1; i < 6; i++) {
            for(let j = 5; j > 0; j--) {
                if(board[j][i] != 0) {
                    k = j;
                    while(1) {
                        if(board[k+1][i] != 0) {
                            break;
                        }
                        board[k+1][i] = board[k][i];
                        board[k][i] = 0;
                        k++; 
                        numCheck = 0;
                    }
                }
            }
        }
    }
    
    function moveDown(){
        gameOver();
        moveDownNum();
    
        for(let i = 1; i < 6; i++) {
            for(let j = 5; j > 1; j--) {
                if(board[j][i] == board[j-1][i] && board[j][i] != 0) {
                    score += board[j][i];
                    board[j][i] *= 2;
                    board[j-1][i] = 0;
                    numCheck = 0;
                    moveBullet(userRect,villianRect);
                }
            }
        }
        if(!numCheck) {     
            moveDownNum();
            randomNum();
            update();
        }
    }
    
    function rowCheck() {
        for(let i = 1; i < 6; i++) {
            for(let j = 1; j < 5; j++) {
                if(board[i][j] == board[i][j+1]) {
                    overCheck = 0;
                }
            }
        }
    }
    
    function columnCheck() {
        for(let i = 1; i < 6; i++) {
            for(let j = 1; j < 5; j++) {
                if(board[j][i] == board[j+1][i]) {
                    overCheck = 0;
                }
            }
        }
    }
    
    //게임 오버 함수
    function gameOver() {
        let fullCheck = 1;
        if(gameEnded){
            setTimeout(function(){
            villian.style.display='none';
            actiontext.style.color='#1f33e4';
            actiontext.style.textShadow='#113798';
            actiontext.textContent='You Win';
            },1000);
            setTimeout(function(){
                window.location.href="D:\\MJGITHUB\\202027042기말고사\\2K48Game\\Gameover Page\\gameover.html";
            },2000);
            result='승리';
            SendData();
        }
        else{
            for(let i = 1; i < 6; i++) {
                for(let j = 1; j < 6; j++) {
                    if(board[i][j] == 0) {
                        fullCheck = 0;
                    }
                }
            }
        }
        rowCheck();
        columnCheck();
        //상하좌우 어디로도 타일을 이동시키지 못할경우 게임오버페이지로 이동
        if(fullCheck && overCheck) {
            setTimeout(function(){
                user.style.display='none';
                actiontext.textContent='You Lose';
            }, 1000);
            setTimeout(function(){
                window.location.href="D:\\MJGITHUB\\202027042기말고사\\2K48Game\\Gameover Page\\gameover.html";
            }, 2000);
            result='패배';
            SendData();
        }
        overCheck=1;
    }
    function SendData() {
        // 게임이 종료되었을 때 서버로 데이터를 전송하는 부분
        const currentDate = new Date();
        const gamedata = {
            date: formattedDate,
            score: score,
            gameTime: time,
            gamesize:size,
            result:result
        };
    
        if (!gameEnded) { // gameEnded가 false인 경우에만 데이터 전송
            fetch('http://localhost:5000/saveGameRecord', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(gamedata)
                })
                .then(Response => {
                    if (Response.ok) {
                        return Response.text();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then(result => {
                    console.log('전송 결과:', result);
                })
                .catch(error => {
                    console.error('전송 실패:', error)
                });
    
            gameEnded = true; // 데이터를 전송한 후 gameEnded를 true로 변경하여 다시 호출되지 않도록 설정
        }
    }
    window.addEventListener("keydown", (e)=> {
        const keyCode = e.keyCode;
        if(keyCode == 37) {//위쪽 키
            moveUp();
        }
        else if(keyCode == 38) {//왼쪽 키
            moveLeft();
        }
        else if(keyCode == 39) {//아래쪽 키
            moveDown();
        }
        else if(keyCode == 40) {//오른쪽 키
            moveRight();
        }
    });
})