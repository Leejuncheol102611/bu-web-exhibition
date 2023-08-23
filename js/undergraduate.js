
const projectsSlider = document.querySelector(".projectsSlider");
const leftBtn = document.querySelector(".cardBtn.left");
const rightBtn = document.querySelector(".cardBtn.right");
const projectCardWidth = document.querySelector(".projectCard").offsetWidth;

let currentIndex = 0;
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;

// 뷰포트 너비가 488px 이하일 경우에만 슬라이드 동작 활성화
const isMobile = window.innerWidth <= 488;

// 슬라이더의 현재 인덱스 값에 따라 버튼의 가시성을 업데이트하는 함수
function updateButtonVisibility() {
    if (currentIndex === 0) {
      leftBtn.classList.add("fade-out");
    } else {
      leftBtn.classList.remove("fade-out");
    }
  
    if (currentIndex === projectsSlider.children.length - 1) {
      rightBtn.classList.add("fade-out");
    } else {
      rightBtn.classList.remove("fade-out");
    }
  }
  
  // 초기 버튼 가시성 설정
  updateButtonVisibility();
  

if (isMobile) {
  leftBtn.addEventListener("click", () => {
    currentIndex = Math.max(currentIndex - 1, 0);
    updateSlide();
    updateButtonVisibility();
  });

  rightBtn.addEventListener("click", () => {
    currentIndex = Math.min(currentIndex + 1, projectsSlider.children.length - 1);
    updateSlide();
    updateButtonVisibility();
  });
}

if (isMobile) {
    leftBtn.addEventListener("click", () => {
      currentIndex = Math.max(currentIndex - 1, 0);
      updateSlide();
      updateButtonVisibility();
    });
  
    rightBtn.addEventListener("click", () => {
      currentIndex = Math.min(currentIndex + 1, projectsSlider.children.length - 1);
      updateSlide();
      updateButtonVisibility();
    });
  
    projectsSlider.addEventListener("touchstart", (e) => {
      isDragging = true;
      startPosition = e.touches[0].clientX;
      animationID = requestAnimationFrame(animation);
      projectsSlider.style.transition = "none";
      updateButtonVisibility();
    });
  
    projectsSlider.addEventListener("touchmove", (e) => {
      if (isDragging) {
        const diffX = e.touches[0].clientX - startPosition;
        currentTranslate = prevTranslate + diffX;
        projectsSlider.style.transform = `translateX(${currentTranslate}px)`;
        updateButtonVisibility();
      }
    });
  
    document.addEventListener("touchend", (e) => {
      if (isDragging) {
        cancelAnimationFrame(animationID);
        isDragging = false;
  
        const threshold = projectCardWidth / 2;
        const diffX = e.changedTouches[0].clientX - startPosition;
        const nextIndex = currentIndex + (diffX < 0 ? 1 : -1);
  
        if (nextIndex >= 0 && nextIndex < projectsSlider.children.length) {
          currentIndex = nextIndex;
        }
  
        updateSlide();
        updateButtonVisibility();
      }
    });
  }

function animation() {
  projectsSlider.style.transform = `translateX(${currentTranslate}px)`;
  animationID = requestAnimationFrame(animation);
}

function updateSlide() {
  prevTranslate = currentTranslate = -currentIndex * projectCardWidth;
  projectsSlider.style.transition = "transform 0.3s ease-in-out";
  projectsSlider.style.transform = `translateX(${currentTranslate}px)`;
}