document.addEventListener("DOMContentLoaded", function() {
    const gameScreen = document.getElementById("game-screen");
    const gameSize = document.getElementById("game-size");
    const decreaseSizeButton = document.getElementById("decrease-size");
    const increaseSizeButton = document.getElementById("increase-size");
    const startButton = document.getElementById("startbutton");
    const quit=document.getElementById("circle1");
    const howtoplay=document.getElementById("circle2");
    const record=document.getElementById("circle3");

    let currentSize = 4; // 초기 크기 4X4

    // 게임 화면 크기를 업데이트하는 함수
    function updateGameSize(size) {
        gameSize.textContent = `${size} X ${size}`;
        // 게임 화면 이미지를 업데이트하는 로직 추가
        gameScreen.style.width = `${size * 45}px`;
        gameScreen.style.height = `${size * 45}px`;
    }
    // 초기 페이지 로드 시 4X4 게임 화면 생성
    updateGameSize(currentSize);

    quit.addEventListener('click',function(){
        window.location.href="D:\\MJGITHUB\\202027042기말고사\\2K48Game\\Quit page\\quit.html"
    });

    howtoplay.addEventListener('click',function(){
        window.location.href="D:\\MJGITHUB\\202027042기말고사\\2K48Game\\Tutorial page\\tutorial.html"
    });

    record.addEventListener('click',function(){
        window.location.href="http://localhost:5000/viewGameRecords";
    })

    decreaseSizeButton.addEventListener("click", function() {
        if (currentSize == 6) {
            gameScreen.style.backgroundImage='url("D:/MJGITHUB/202027042기말고사/2K48Game/Main Page/5x5.png")';
            gameScreen.style.backgroundSize='225px 225px'
            currentSize -= 1;
            updateGameSize(currentSize);
        }
        else if(currentSize==5){
            currentSize -= 1;
            updateGameSize(currentSize);
            gameScreen.style.backgroundSize='180px 180px';
            gameScreen.style.backgroundImage='url("D:/MJGITHUB/202027042기말고사/2K48Game/Main Page/4X4.png")';
        }
    });

    increaseSizeButton.addEventListener("click", function() {
        if (currentSize == 4) {
            currentSize += 1;
            updateGameSize(currentSize);
            gameScreen.style.backgroundSize='225px 225px'
            gameScreen.style.backgroundImage='url("D:/MJGITHUB/202027042기말고사/2K48Game/Main Page/5X5.png")';
        }
        else if(currentSize==5){
            currentSize += 1;
            updateGameSize(currentSize);
            gameScreen.style.backgroundSize='270px 270px'
            gameScreen.style.backgroundImage='url("D:/MJGITHUB/202027042기말고사/2K48Game/Main Page/6X6.png")';
        }
    });

    startButton.addEventListener("click", function() {
        if(currentSize==4){
            window.location.href="D:\\MJGITHUB\\202027042기말고사\\2K48Game\\Game Page\\game(4).html";
        }
        else if(currentSize==5){
            window.location.href="D:\\MJGITHUB\\202027042기말고사\\2K48Game\\Game Page\\game(5).html";
        }
        else if(currentSize==6){
            window.location.href="D:\\MJGITHUB\\202027042기말고사\\2K48Game\\Game Page\\game(6).html";
        }
    });
});
