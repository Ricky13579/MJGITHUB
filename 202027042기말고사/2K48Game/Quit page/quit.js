document.addEventListener("DOMContentLoaded",function() {
    const yesButton = document.getElementById("yes");
    const noButton = document.getElementById("no");

    yesButton.addEventListener("click", function() {
        document.body.style.display="none";
        alert("게임에서 나가셨습니다.");
    });

    noButton.addEventListener("click",function(){
        window.location.href="D:\\MJGITHUB\\202027042기말고사\\2K48Game\\Main Page\\main.html";
    })
});
