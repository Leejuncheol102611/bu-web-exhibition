



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
projectsSlider.addEventListener("mousedown", (e) => {
    // 뷰포트 너비가 488px 이하일 경우에만 드래그 동작 활성화
    if (isMobile) {
      isDragging = true;
      startPosition = e.clientX;
      animationID = requestAnimationFrame(animation);
      projectsSlider.style.transition = "none";
      e.preventDefault();
      updateButtonVisibility();
    }
  });
  
  projectsSlider.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const diffX = e.clientX - startPosition;
      currentTranslate = prevTranslate + diffX;
      projectsSlider.style.transform = `translateX(${currentTranslate}px)`;
      e.preventDefault();
      updateButtonVisibility();
    }
  });
  
  document.addEventListener("mouseup", (e) => {
      if (isDragging) {
        cancelAnimationFrame(animationID);
        isDragging = false;
    
        const threshold = projectCardWidth / 2;
        const diffX = e.clientX - startPosition;
        const nextIndex = currentIndex + (diffX < 0 ? 1 : -1);
    
        if (nextIndex >= 0 && nextIndex < projectsSlider.children.length) {
          currentIndex = nextIndex;
        }
    
        updateSlide();
        updateButtonVisibility();
    
        e.preventDefault();
      }
    });
  
  document.addEventListener("mouseleave", (e) => {
    if (isDragging) {
      cancelAnimationFrame(animationID);
      isDragging = false;
      updateSlide();
      updateButtonVisibility();
  
      e.preventDefault();
    }
  });

function animation() {
  projectsSlider.style.transform = `translateX(${currentTranslate}px)`;
  animationID = requestAnimationFrame(animation);
}

function updateSlide() {
  prevTranslate = currentTranslate = -currentIndex * projectCardWidth;
  projectsSlider.style.transition = "transform 0.3s ease-in-out";
  projectsSlider.style.transform = `translateX(${currentTranslate}px)`;
}