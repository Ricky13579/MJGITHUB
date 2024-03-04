document.addEventListener("DOMContentLoaded",function(){

    const Nobutton=document.getElementById("no");
    const Yesbutton=document.getElementById("yes");

    Nobutton.addEventListener('click',function(){
        document.body.style.display="none";
        alert("고생하셨습니다");
    });
    Yesbutton.addEventListener('click',function(){
        window.location.href="D:\\MJGITHUB\\202027042기말고사\\2K48Game\\Main Page\\main.html";
    });
});