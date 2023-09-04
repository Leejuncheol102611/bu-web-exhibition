
const guestbooksUrl = serverUrl + '/guestbooks';



document.addEventListener('DOMContentLoaded', () => {
    const commentsList = document.getElementById('commentsList');
    const commentForm = document.getElementById('commentForm');
    const nicknameInput = document.getElementById('nickname');
    const passwordInput = document.getElementById('password');
    const commentInput = document.getElementById('comment');

    // 댓글 작성 폼 제출 처리
    commentForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const guestname = nicknameInput.value;
        const password = passwordInput.value;
        const guestbook = commentInput.value;



        const response = await fetch(guestbooksUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({ guestname, password, guestbook })
        });

        if (response.ok) {
            // 댓글 작성 성공 시 화면 갱신
            loadComments();
            alert('댓글이 작성되었습니다.');
        } else {
            // 댓글 작성 실패 시 처리
            console.error('댓글 작성 실패');
            alert('서버에 문제가 발생하여 댓글 작성에 실패하였습니다. 다시 시도해주세요.'); // 실패 알람
        }
    });


    // 댓글 목록 가져오기 및 HTML 생성
    async function loadComments() {
        const response = await fetch(guestbooksUrl);
        const comments = await response.json();

        const commentsListContainer = document.getElementById('commentsList');
        commentsListContainer.innerHTML = ''; // 이전 댓글 목록 삭제

        comments.forEach(comment => {

            if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(comment.updated)) {
                const updatedDate = new Date(comment.updated);
                const formattedUpdatedDate = `${updatedDate.getFullYear()}-${String(updatedDate.getMonth() + 1).padStart(2, '0')}-${String(updatedDate.getDate()).padStart(2, '0')} ${String(updatedDate.getHours()).padStart(2, '0')}:${String(updatedDate.getMinutes()).padStart(2, '0')}`;

                comment.updated = formattedUpdatedDate;
            }


            const commentContainer = document.createElement('div');
            commentContainer.classList.add('comment-container');
            const ul = document.createElement('ul');

            const li1 = document.createElement('li');
            li1.innerHTML = `${comment.guestname}<samp>${comment.updated}</samp>`;
            ul.appendChild(li1);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '삭제하기';


            deleteButton.addEventListener('click', async () => {
                const deletePassword = prompt('비밀번호를 입력하세요.');
                if (deletePassword) {
                    const deleteResponse = await fetch(`${guestbooksUrl}/${guestbooks.guestbook_id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Origin': 'https://web-bu-web-exhibition-fq2r52kllqhhlnh.sel3.cloudtype.app'

                        },
                        mode: 'cors',
                        body: JSON.stringify({ password: deletePassword })
                    });

                    if (deleteResponse.ok) {
                        loadComments(); // 댓글 삭제 성공 시 화면 갱신
                        alert('댓글이 삭제되었습니다.');
                    } else {
                        console.error('댓글 삭제 실패');
                        alert('비밀번호가 일치하지 않습니다.');
                    }
                }
            });

            ul.appendChild(deleteButton);

            commentContainer.appendChild(ul);

            const li3 = document.createElement('li');
            li3.textContent = comment.guestbook;
            commentContainer.appendChild(li3);

            commentsListContainer.appendChild(commentContainer);
        });
    }

    // 초기화: 댓글 목록 불러오기
    loadComments();



    // URL에서 파라미터 가져오는 함수
    //function getParameterByName(name) {
    //    const url = new URL(window.location.href);
    //    return url.searchParams.get(name);
    //}

});

