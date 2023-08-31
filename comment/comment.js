const server_url = 'https://port-0-bu-exhibition-backend-fq2r52kllqhhlnh.sel3.cloudtype.app';

const commentsUrl = server_url + '/comments';


console.log(commentsUrl);


document.addEventListener('DOMContentLoaded', () => {
    const commentsList = document.getElementById('commentsList');
    const commentForm = document.getElementById('commentForm');
    const nicknameInput = document.getElementById('nickname');
    const passwordInput = document.getElementById('password');
    const commentInput = document.getElementById('comment');
    const targetIdInput = document.getElementById('target_id');
    // 댓글 작성 폼 제출 처리
    commentForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const target_id = targetIdInput.value; //임시

        //const target_id = getParameterByName('id'); // URL에서 id 파라미터 가져오기
        const nickname = nicknameInput.value;
        const password = passwordInput.value;
        const comment = commentInput.value;



        const response = await fetch(commentsUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({ target_id, nickname, password, comment })
        });

        if (response.ok) {
            // 댓글 작성 성공 시 화면 갱신
            loadComments();
        } else {
            // 댓글 작성 실패 시 처리
            console.error('댓글 작성 실패');
        }
    });


    // 댓글 목록 가져오기 및 HTML 생성
    async function loadComments() {
        const response = await fetch(commentsUrl);
        const comments = await response.json();

        const commentsListContainer = document.getElementById('commentsList');
        commentsListContainer.innerHTML = ''; // 이전 댓글 목록 삭제

        comments.forEach(comment => {
            const commentContainer = document.createElement('div');
            commentContainer.classList.add('comment-container');

            const ul = document.createElement('ul');

            const li1 = document.createElement('li');
            li1.innerHTML = `${comment.nickname}<samp>${comment.updated}</samp>`;
            ul.appendChild(li1);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '삭제하기';


            deleteButton.addEventListener('click', async () => {
                const deletePassword = prompt('비밀번호를 입력하세요.');
                if (deletePassword) {
                    const deleteResponse = await fetch(`${commentsUrl}/${comment.comment_id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        mode: 'cors',
                        body: JSON.stringify({ password: deletePassword })
                    });

                    if (deleteResponse.ok) {
                        loadComments(); // 댓글 삭제 성공 시 화면 갱신
                    } else {
                        console.error('댓글 삭제 실패');
                    }
                }
            });

            const li2 = document.createElement('li');

            ul.appendChild(deleteButton);
            ul.appendChild(li2);

            commentContainer.appendChild(ul);

            const li3 = document.createElement('li');
            li3.textContent = comment.comment;
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