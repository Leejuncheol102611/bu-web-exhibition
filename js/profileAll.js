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


        const mainProjectTitle = document.getElementById('mainProjectTitle');
        const subProjectTitles = document.getElementById('subProjectTitles');
        mainProjectTitle.textContent = userData.user.mainProject;
        subProjectTitles.textContent = userData.user.subProject;

        // 프로필 소개, 수상 내역, 작업 이미지 등을 데이터에서 채우기
        document.getElementById('profileIntro').textContent = userData.user.profile_intro;

        // 수상 내역 업데이트
        const awardsList = document.getElementById('awardsList');
        for (let i = 1; i <= 5; i++) {
            const awardKey = `award_${i}`;
            if (userData.user[awardKey]) {
                const li = document.createElement('li');
                li.textContent = userData.user[awardKey];
                awardsList.appendChild(li);
            }
        }

        // 작업 이미지 설정
        document.getElementById('workImage').src = userData.workimg;

        // 작업 제목 설정
        const worksTitle = document.getElementById('worksTitle');
        const worksTitleMobile = document.getElementById('worksTitleMobile');
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
    }


});