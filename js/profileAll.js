const usersUrl = serverUrl + '/users';


// 서버에서 사용자 정보를 가져오는 비동기 함수
async function fetchUserData(userId) {
    try {
        const response = await fetch(`${usersUrl}/${userId}`); // API 엔드포인트를 적절히 수정
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', async () => {

    // URL에서 id 파라미터 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id'); // 예: URL에 "?id=1"과 같이 전달될 것입니다.

    // 사용자 데이터 가져오기
    const userData = await fetchUserData(userId);
    console.log(userData);
    if (userData) {
        // 프로필 정보 업데이트
        console.log(userData);
        document.getElementById('profileImage').src = userData.user.profileimg;
        document.getElementById('userPhone').textContent = userData.user.user_phone;
        document.getElementById('userEmail').textContent = userData.user.user_email;
        document.getElementById('profileUsername').textContent = userData.user.username;
        document.getElementById('profileTeam').textContent = userData.user.team;
        document.getElementById('profileJob').textContent = userData.user.job;
        document.getElementById('profileHashtags').textContent = userData.user.ctag;
        document.getElementById('commentUsername').textContent = userData.user.username + " 님에게 응원의 한마디를 남겨보세요";
        document.getElementById('optionValue').value = userData.user.id;

        const mainProjectTitle = document.getElementById('mainProjectTitle');
        const subProjectTitles = document.getElementById('subProjectTitles');
        mainProjectTitle.textContent = userData.user.mainProject;
        subProjectTitles.textContent = userData.user.subProject;

        // 프로필 소개, 수상 내역, 작업 이미지 등을 데이터에서 채우기
        document.getElementById('profileIntro').textContent = userData.user.profile_intro;

        // 수상 내역 업데이트
        const awardsList = document.getElementById('awardsList');
        awardsList.innerHTML = '';
        for (let i = 1; i <= 5; i++) {
            const awardKey = `award_${i}`;
            if (userData.user[awardKey]) {
                const li = document.createElement('li');
                li.textContent = userData.user[awardKey];
                awardsList.appendChild(li);
            }
        }

        // 작업 제목 설정
        const worksTitle = document.getElementById('worksTitle');
        const worksTitleMobile = document.getElementById('worksTitleMobile');

        worksTitle.innerHTML = '';
        worksTitleMobile.innerHTML = '';

        userData.works.forEach((work, index) => {
            const li = document.createElement('li');
            li.textContent = work.workname;
            worksTitle.appendChild(li);

            // 모바일용 선택 목록에도 추가
            const option = document.createElement('option');
            option.value = index + 1; // 예: 1부터 시작
            option.textContent = work.workname;
            worksTitleMobile.appendChild(option);
        });



        // 작업 이미지 및 작업 제목 설정 함수
        function updateWork(workIndex) {
            const work = userData.works[workIndex];

            // 작업 이미지 업데이트
            const workImage = document.getElementById('workImage');
            workImage.src = work.workimg;

            // 작업 제목 업데이트
            const worksTitle = document.getElementById('worksTitle');
            const worksTitleMobile = document.getElementById('worksTitleMobile');

            // 모든 작업 제목 li 요소에서 .active 클래스 제거
            const titleItems = worksTitle.getElementsByTagName('li');
            for (let i = 0; i < titleItems.length; i++) {
                titleItems[i].classList.remove('active');
            }

            // 현재 작업 제목 li 요소에 .active 클래스 추가
            titleItems[workIndex].classList.add('active');

            // 작업 내용 업데이트
            const workBody = document.getElementById('work_body');
            workBody.textContent = work.workbody;

            // 링크 업데이트
            const links = document.querySelectorAll('.links a');
            links[0].href = work.prototypelink;
            links[1].href = work.weblink;
            links[2].href = work.link;

            const usetools = document.getElementById('useTools');
            usetools.innerHTML = '';
            for (let i = 1; i <= 5; i++) {
                const usetoolKey = `usetool_${i}`;
                if (work[usetoolKey]) {
                    const img = document.createElement('img');
                    img.src = work[usetoolKey];
                    usetools.appendChild(img);
                }
            }
        }

        // 페이지 로드 시 첫 번째 작업 정보로 초기화
        updateWork(0);

        // 웹용 작업 제목 클릭 이벤트 처리

        worksTitle.addEventListener('click', (event) => {
            if (event.target.tagName === 'LI') {
                const clickedIndex = Array.from(worksTitle.children).indexOf(event.target);
                updateWork(clickedIndex);
            }
        });

        // 모바일용 작업 제목 변경 이벤트 처리
        worksTitleMobile.addEventListener('change', (event) => {
            const selectedIndex = event.target.value - 1;
            updateWork(selectedIndex);
        });
    }


    const isMobile = window.innerWidth <= 488;

    if (isMobile) {
        const introBtn = document.getElementById('introBtn');
        const awardsBtn = document.getElementById('awardsBtn');
        const profileIntro = document.getElementById('profileIntro');
        const awardsList = document.getElementById('awardsList');

        introBtn.addEventListener('click', () => {
            // 프로필 소개 확장 및 축소 토글
            if (profileIntro.classList.contains('collapsed')) {
                profileIntro.classList.remove('collapsed');
                profileIntro.classList.add('expanded');
                introBtn.classList.add('expanded'); // 아이콘 상하반전 클래스 추가
            } else {
                profileIntro.classList.remove('expanded');
                profileIntro.classList.add('collapsed');
                introBtn.classList.remove('expanded'); // 아이콘 상하반전 클래스 제거
            }
        });

        awardsBtn.addEventListener('click', () => {
            // 수상 내역 확장 및 축소 토글
            if (awardsList.classList.contains('collapsed')) {
                awardsList.classList.remove('collapsed');
                awardsList.classList.add('expanded');
                awardsBtn.classList.add('expanded'); // 아이콘 상하반전 클래스 추가
            } else {
                awardsList.classList.remove('expanded');
                awardsList.classList.add('collapsed');
                awardsBtn.classList.remove('expanded'); // 아이콘 상하반전 클래스 제거
            }
        });
    }


});