// 영역 1 요소
const userIdInput = document.getElementById('userId');
const loginButton = document.getElementById('loginButton');
const userInfo = document.getElementById('userInfo');
const nicknameSpan = document.getElementById('nickname');
const profileImage = document.getElementById('profileImage');
const logoutButton = document.getElementById('logoutButton');

// 영역 2, 3 요소
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const content = document.getElementById('content');

// 버튼 내용 저장 변수
let button1Content = "저는 지명준이라고 합니다.";
let button2Content = "지난주에 코로나에 걸려서 강의를 통으로 빠졌지요.";
let button3Content = '';

// 로그인 상태 변수
let isLoggedIn = false;

// 영역 1: 로그인 및 로그아웃 기능
loginButton.addEventListener('click', () => {
    if (!isLoggedIn) {
        // 로그인
        const userId = 'wpzmfhtm';
        if (userId) {
            // 로그인 성공
            nicknameSpan.textContent = "Ricky1071"; // 닉네임 표시
            profileImage.src = 'Nika.jpg'; // 프로필 이미지 설정
            loginButton.textContent = '로그아웃'; // 버튼 텍스트 변경
            logoutButton.style.display = 'none'; // 로그아웃 버튼 표시
            isLoggedIn = true;
        }
    } else {
        // 로그아웃
        userIdInput.value = '';
        nicknameSpan.textContent = '';
        profileImage.src = '';
        loginButton.textContent = '로그인'; // 버튼 텍스트 변경
        logoutButton.style.display = 'none'; // 로그아웃 버튼 숨김
        isLoggedIn = false;
    }
});

// 영역 2: 버튼 클릭 시 내용 표시 및 훔치기
button1.addEventListener('click', () => {
    if (button1Content !== "") {
        content.textContent = button1Content;
    } else {
        if (button2Content !== "") {
            button1Content = button2Content;
            button2Content = "";
            button2.textContent = "버튼 2"; // 버튼2의 텍스트를 초기화합니다.
            content.textContent = button1Content;
        } else if (button3Content !== "") {
            button1Content = button3Content;
            button3Content = "";
            button3.textContent = "버튼 3"; // 버튼3의 텍스트를 초기화합니다.
            content.textContent = button1Content;
        } else {
            content.textContent = '내용이 없습니다.';
            alert('내용이 없습니다.');
        }
    }
});

button2.addEventListener('click', () => {
    if (button2Content !== "") {
        content.textContent = button2Content;
    } else {
        if (button1Content !== "") {
            button2Content = button1Content;
            button1Content = "";
            button1.textContent = "버튼 1"; // 버튼1의 텍스트를 초기화합니다.
            content.textContent = button2Content;
        } else if (button3Content !== "") {
            button2Content = button3Content;
            button3Content = "";
            button3.textContent = "버튼 3"; // 버튼3의 텍스트를 초기화합니다.
            content.textContent = button2Content;
        } else {
            content.textContent = '내용이 없습니다.';
            alert('내용이 없습니다.');
        }
    }
});

button3.addEventListener('click', () => {
    if (content.textContent !== '내용이 없습니다.') {
        button3Content = content.textContent;
        content.textContent = '저장되었습니다.';
        alert('저장되었습니다.');
        
        // 버튼1의 내용을 초기화합니다.
        button1Content = "";
        button1.textContent = "버튼 1"; // 버튼1의 텍스트를 초기화합니다.
    }
});
