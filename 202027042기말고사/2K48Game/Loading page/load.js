const loadbar=document.getElementById("loading-bar");
const percent=document.getElementById("percent");
var a=0;
let progress=0;
const interval=setInterval(() => {
    progress+=1;
    loadbar.style.width=progress+"%";
    a++;
    percent.textContent=(`${a}%`);
    if(progress>=100){
        clearInterval(interval);
        window.location.href="D:\\MJGITHUB\\202027042기말고사\\2K48Game\\Main Page\\main.html";
    }
}, 30);