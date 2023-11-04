const canvas = document.getElementById('Canvas');
const ctx = canvas.getContext('2d');
let gameover=false;

var mouseX = 0;
var mouseY = 0;

var player = {
    x: 100,
    y: 100,
    radius: 20,
    speed: 5,
    bodyParts: [],
};

var dirX=0;
var dirY=0;

var score=0;
var snakeLength = 3; // 뱀 길이 변수 추가
var startTime = Date.now(); // 시작 시간 기록

var apple = { x: 0, y: 0 }; // 과일을 저장할 객체
var appleRadius = 10;
var isAppleEaten = true; // 과일을 먹었는지 여부

var obstacles = []; // 장애물을 저장할 배열
var obstacleSpeed = 2; // 장애물의 속도
var speedIncreaseInterval = 10000; // 10초마다 속도를 증가시킬 간격 (밀리초)
var speedIncreaseAmount = 0.5; // 10초마다 속도를 증가시킬 양

// 초기화 함수
function init() {
    for (let i = 0; i < 3; i++) {
        player.bodyParts.push({ x: player.x - i * (player.radius * 2 / 3), y: player.y });
    }
    // 과일 생성
    createApple();
    setInterval(createObstacle,1500);
     // 10초마다 속도를 증가시키는 타이머
     setInterval(increaseSpeed, speedIncreaseInterval);
}

function createApple() {
    const appleX = Math.random() * canvas.width;
    const appleY = Math.random() * canvas.height;
    apple = { x: appleX, y: appleY };
    isAppleEaten = false;
}

//장애물 생성
function createObstacle() {
    const obstacleTypes = ['circle', 'triangle', 'rectangle'];
    const randomType = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
    const randomX = Math.random() * canvas.width;
    const randomY = Math.random() * canvas.height;
    const randomDirectionX = (Math.random() - 0.5) * 2; // -1에서 1 사이의 무작위 방향
    const randomDirectionY = (Math.random() - 0.5) * 2; // -1에서 1 사이의 무작위 방향
    const obstacle = {
        x: randomX,
        y: randomY,
        directionX: randomDirectionX,
        directionY: randomDirectionY,
        type: randomType,
    };
    obstacles.push(obstacle);
}

//장애물 충돌 검사
function checkObstacleCollision() {
    for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];

        //머리와 충돌할 경우 즉시 게임 종료
        if (collision(player.x, player.y, player.radius, obstacle.x, obstacle.y, 20)) {
            HeadEnd();
            return;
        }

        //몸통과 충돌할 경우 그 부분부터 꼬리부분까지 아예 제거
        for (let j = 0; j < player.bodyParts.length; j++) {
            const part = player.bodyParts[j];
            if (collision(part.x, part.y, player.radius, obstacle.x, obstacle.y, 20)) {
                player.bodyParts.splice(j);
                if (score >= 10) {
                    score -= 10; // 점수가 10점 미만이면 감소하지 않음
                } else {
                    score = 0;
                    BodyEnd();
                }
                break;
            }
        }
    }
}

//머리맞아서 사망했을 때 실행
function HeadEnd() {
    gameover=true;
    alert('뇌가 깨져서 사망!!!!!!!!!!!');
}

//몸통맞아서 사망했을 때 실행
function BodyEnd(){
    gameover=true;
    alert('남아나는 몸통이 없어서 사망!!!!!!!!');
}

function increaseSpeed() {
    obstacleSpeed += speedIncreaseAmount;
}

document.addEventListener('mousemove',updateMouseCursor);

// 좌클릭 시 스피드를 증가
document.addEventListener('mousedown', (event) => {
    if (event.button === 0) {
        player.speed = 10;
    }
});

// 좌클릭 떼면 스피드를 원래대로 돌림
document.addEventListener('mouseup', (event) => {
    if (event.button === 0) {
        player.speed = 5;
    }
});

// 충돌 검사 함수
function collision(x1, y1, r1, x2, y2, r2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < r1 + r2;
}

function updateMouseCursor(event) {
    mouseX = event.clientX; // 마우스 커서의 X 좌표
    mouseY = event.clientY; // 마우스 커서의 Y 좌표
}

function CalculateDirection() {
    dirX = mouseX - player.x;
    dirY = mouseY - player.y;
    scalar = Math.sqrt(dirX * dirX + dirY * dirY);

    if (scalar > 20) {
        const speedX = (dirX / scalar) * player.speed;
        const speedY = (dirY / scalar) * player.speed;

        player.x += speedX;
        player.y += speedY;
        let targetX = player.x;
        let targetY = player.y;

        for (let i = 0; i < player.bodyParts.length; i++) {
            const part = player.bodyParts[i];
            const tempX = part.x;
            const tempY = part.y;

            part.x += (targetX - part.x) * 0.2;
            part.y += (targetY - part.y) * 0.2;

            targetX = tempX;
            targetY = tempY;
        }
    } 
    else {
        // 마우스 커서와 뱀의 머리가 충돌하면 뱀을 멈춥니다.
        dirX = 0;
        dirY = 0;
    }

}

//장애물 그리기
function drawObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];
        ctx.beginPath();

        if (obstacle.type === 'circle') {
            ctx.arc(obstacle.x, obstacle.y, 20, 0, 2 * Math.PI); // 원의 크기를 20으로 변경
            ctx.fillStyle = 'purple';
        } else if (obstacle.type === 'triangle') {
            ctx.moveTo(obstacle.x, obstacle.y);
            ctx.lineTo(obstacle.x + 20, obstacle.y); // 삼각형의 크기를 키움
            ctx.lineTo(obstacle.x + 10, obstacle.y - 20); // 삼각형의 크기를 키움
            ctx.fillStyle='brown';
        } else if (obstacle.type === 'rectangle') {
            ctx.rect(obstacle.x, obstacle.y, 30, 20); // 사각형의 크기를 키움
            ctx.fillStyle='black';
        }
        ctx.fill();

        obstacle.y += obstacleSpeed;

        if (obstacle.y > canvas.height) {
            obstacles.splice(i, 1);
            i--;
        }
    }
}

function draw() {
    // Canvas 지우기
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    CalculateDirection();
    drawObstacles();
    // 과일 그리기
    if (!isAppleEaten) {
        ctx.beginPath();
        ctx.arc(apple.x, apple.y, appleRadius, 0, 2 * Math.PI);
        ctx.fillStyle = 'green';
        ctx.fill();

        // 플레이어가 과일을 먹으면
        if (collision(player.x, player.y, player.radius, apple.x, apple.y, appleRadius)) {
            isAppleEaten = true;
            player.bodyParts.push({ x: player.x, y: player.y }); // 몸통 추가
            createApple(); // 새로운 과일 생성
            score+=5;
            snakeLength=player.bodyParts.length;
        }
    }

    // 몸통 그리기
    for (let i = 0; i < player.bodyParts.length; i++) {
        const part = player.bodyParts[i];
        ctx.beginPath();
        ctx.arc(part.x, part.y, player.radius, 0, 2 * Math.PI);
        ctx.fillStyle = '#0000FF';
        ctx.fill();
    }

    // 머리 그리기
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#FF0000';
    ctx.fill();

    const currentTime = Date.now();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000); // 초 단위

    ctx.font='20px Bold';//글자 크기를 20px 그리고 굵게

    ctx.fillStyle = 'black';//글자색 검은색
    ctx.fillText('Score: ' + score, 10, 20);//캔버스에 스코어 출력
    ctx.fillText('Snake Length: ' + snakeLength, 10, 40);//캔버스에 뱀길이 출력
    ctx.fillText('Time: ' + elapsedTime + 's', 10, 60);//캔버스에 시간(초) 단위 출력

    checkObstacleCollision();
    if(!gameover){
        requestAnimationFrame(draw);
    }
}

init(); // 초기화 함수 호출
requestAnimationFrame(draw);