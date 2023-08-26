// 댓글 목록을 표시하는 함수
function displayComments(comments) {
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = '';

    comments.forEach(comment => {
        const li = document.createElement('li');
        li.textContent = `작성자: ${comment.nickname}, 내용: ${comment.comment}`;
        commentsList.appendChild(li);
    });
}

// 페이지 로드 시 댓글 목록을 가져와 표시
window.addEventListener('load', async () => {
    try {
        const response = await fetch('/comments/1'); // 1은 target_id
        const comments = await response.json();
        displayComments(comments);
    } catch (error) {
        console.error('댓글 목록 가져오기 오류:', error);
    }
});

// 댓글 작성 폼 제출 처리
const commentForm = document.getElementById('commentForm');
commentForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nickname = document.getElementById('nickname').value;
    const password = document.getElementById('password').value;
    const comment = document.getElementById('comment').value;

    const data = {
        target_id: 1, // 1은 target_id
        nickname,
        password,
        comment
    };

    try {
        const response = await fetch('/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const newComment = await response.json();
            displayComments([newComment]); // 새 댓글을 표시
            commentForm.reset();
        } else {
            console.error('댓글 작성 실패');
        }
    } catch (error) {
        console.error('댓글 작성 오류:', error);
    }
});