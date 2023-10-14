document.addEventListener('DOMContentLoaded', function () {
    const fetchButton = document.getElementById('getDataButton');
    const resultParagraph = document.getElementById('responseData');

    fetchButton.addEventListener('click', async () => {
        try {
            const response = await fetch('http://localhost:${port}/hi'); // 서버의 URI로 GET 요청
            const data = await response.json();
            resultParagraph.textContent = data.message; // 결과를 p 태그에 표시
        } catch (error) {
            resultParagraph.textContent = 'Error fetching data';
        }
    });
});