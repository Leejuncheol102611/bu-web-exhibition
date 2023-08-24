// 선택 옵션 및 모달 관련 코드
const selectBg = document.querySelector(".selectBg");
const selectListModal = document.querySelector(".selectListModal");
const openSelectBtn = document.querySelector(".openSelectBtn");
const modalContent = document.querySelector(".select.active.default");

let isModalOpen = false;

openSelectBtn.addEventListener("click", () => {
  if (isModalOpen) {
    closeModal();
  } else {
    openModal();
  }
});

selectListModal.addEventListener("click", (event) => {
  const clickedOption = event.target.closest(".select");
  if (clickedOption) {
    const optionName = clickedOption.querySelector(".selectText p").textContent;
    modalContent.querySelector(".selectText p").innerHTML = `<p>${optionName}</p>`;
    
    closeModal();
  }
});

function openModal() {
  selectBg.style.zIndex = "3";
  selectListModal.style.display = "block";
  isModalOpen = true;
  openSelectBtn.classList.add("open");
}

function closeModal() {
  selectBg.style.zIndex = "1";
  selectListModal.style.display = "none";
  isModalOpen = false;
  openSelectBtn.classList.remove("open");
}

document.addEventListener("click", (event) => {
  if (!selectListModal.contains(event.target) && event.target !== openSelectBtn) {
    closeModal();
  }
});





// 프로젝트 슬라이더 관련 코드
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

// 버튼 클릭 이벤트 리스너 등록
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

// 터치 이벤트 리스너 등록
if (isMobile) {
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

      const threshold = projectCardWidth / 4;
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



  
// selectList 요소 찾기
const selectList = document.querySelector(".selectList");

// underGraduate 섹션 내용 가져오기
const underGraduateSection = document.querySelector("#underGraduate");

// select 요소 생성 함수
function createSelectItem(item) {
  const selectItem = document.createElement("div");
  selectItem.classList.add("select");

  const minImg = document.createElement("img");
  minImg.classList.add("minImg");
  minImg.src = item.profile;
  minImg.alt = "";

  const selectText = document.createElement("div");
  selectText.classList.add("selectText");
  const nameText = document.createElement("p");
  nameText.textContent = item.name;

  selectText.appendChild(nameText);

  selectItem.appendChild(minImg);
  selectItem.appendChild(selectText);



  selectItem.addEventListener("click", () => {
    // 기존 .active 제거
    const activeSelect = selectList.querySelector(".select.active");
    if (activeSelect) {
      activeSelect.classList.remove("active");
    }

    // 선택한 select에 .active 추가
    selectItem.classList.add("active");

    // 모달 내용 업데이트
    updateModalContent(item);
  });

  return selectItem;
}

// 모달 내용 업데이트 함수
function updateModalContent(item) {
  const activeSelectModal = selectListModal.querySelector(".select.active");
  if (activeSelectModal) {
    activeSelectModal.classList.remove("active");
  }

  const modalSelect = selectListModal.querySelector(`.select[data-name="${item.name}"]`);
  if (modalSelect) {
    modalSelect.classList.add("active");
  }

  // 프로젝트 카드 내용 업데이트
  updateProjectCards(item);
}

// 프로젝트 카드 업데이트 함수
function updateProjectCards(item) {
  const projectsSlider = underGraduateSection.querySelector(".projectsSlider");
  const projectCards = projectsSlider.querySelectorAll(".projectCard");

  projectCards.forEach((card, index) => {
    const mainName = card.querySelector("h3.bold");
    const projectImg = card.querySelector(".projectImg");
    const description = card.querySelector("p");

    if (index === 0) {
      mainName.textContent = `${index + 1}체커 - ${item.name} 서비스`;
      projectImg.src = item.main;
      description.textContent = "작품설명 3줄 작성 작품설명 3줄 작성 작품설명 3줄 작성";
    } else if (index === 1) {
      mainName.textContent = `${index + 1}체커 - ${item.name} 서비스`;
      projectImg.src = item.sub1;
      description.textContent = "작품설명 3줄 작성 작품설명 3줄 작성 작품설명 3줄 작성";
    } else if (index === 2) {
      mainName.textContent = `${index + 1}체커 - ${item.name} 서비스`;
      projectImg.src = item.sub2;
      description.textContent = "작품설명 3줄 작성 작품설명 3줄 작성 작품설명 3줄 작성";
    }
  });
}

// 미리 정의된 데이터를 기반으로 select 요소 생성 및 추가
data.forEach((item) => {
  const selectItem = createSelectItem(item);
  selectItem.dataset.name = item.name; // data-name 속성 추가
  selectList.appendChild(selectItem);
  selectListModal.appendChild(selectItem.cloneNode(true)); // 모바일 모달에도 추가
});

// 최초로 첫 번째 항목 선택
const firstSelect = selectList.querySelector(".select");
firstSelect.classList.add("active");
updateModalContent(data[0]);





// select 요소 클릭 시 데이터 업데이트 및 모달 내용 업데이트
selectList.addEventListener("click", (event) => {
  const clickedOption = event.target.closest(".select");
  if (clickedOption) {
    // 기존 .active 제거
    const activeSelect = selectList.querySelector(".select.active");
    if (activeSelect) {
      activeSelect.classList.remove("active");
    }

    // 선택한 select에 .active 추가
    clickedOption.classList.add("active");

    // 데이터 가져와서 모달 내용 업데이트
    const activeData = getDataFromActiveElement();
    updateModalWithData(activeData);
  }
});



// 데이터의 name을 이용하여 해당 데이터를 가져오는 함수
function getDataByName(name) {
    return data.find(item => item.name === name);
  }


// 선택 옵션 클릭 시 모달 내용 업데이트
selectListModal.addEventListener("click", (event) => {
    const clickedOption = event.target.closest(".select");
    if (clickedOption) {
      // 기존 .select.active 제거
      const activeSelect = selectListModal.querySelector(".select.active");
      if (activeSelect) {
        activeSelect.classList.remove("active");
      }
  
      // 선택한 select에 .select.active 추가
      clickedOption.classList.add("active");
  
      // 선택된 데이터를 가져와서 모달 내용 및 projectCard 업데이트
      const selectedData = getDataByName(clickedOption.querySelector(".selectText p").textContent);
      updateModalAndProjectCardData(selectedData);
  
      closeModal(); // 옵션을 선택하면 모달 닫기
    }
  });
  


// 모달 내용을 선택된 데이터로 업데이트
function updateModalContentWithSelectedData(data) {
    if (data) {
      const selectText = modalContent.querySelector(".selectText p");
      selectText.innerHTML = `<p>${data.name}</p>`;
      
      const minImg = modalContent.querySelector(".minImg");
      minImg.src = data.profile;
    }
  }

  // .selectListModal에서 선택된 요소의 데이터 업데이트 함수
function updateModalAndProjectCardData(selectedData) {
    if (selectedData) {
      // 모달 내용 업데이트
      updateModalContentWithSelectedData(selectedData);
  
      // projectCard의 데이터도 업데이트
      updateProjectCards(selectedData);
    }
  }

  // 뷰포트 너비가 488px 이하일 때 .selectArea 초기화 함수
function resetSelectAreaWithActiveData() {
    const activeSelect = selectListModal.querySelector(".select.active");
    if (activeSelect) {
      const activeData = getDataByName(activeSelect.querySelector(".selectText p").textContent);
      updateDefaultSelectWithData(activeData);
    }
  }


  // 모바일에서 .selectArea 초기화
  if (isMobile) {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 488) {
        resetSelectAreaWithActiveData();
      }
    });
  }



// active인 요소에서 데이터 가져오는 함수
function getDataFromActiveElement() {
    const activeElement = selectList.querySelector(".select.active");
    if (activeElement) {
      const name = activeElement.querySelector(".selectText p").textContent;
      const profileImgSrc = activeElement.querySelector(".minImg").src;
      const minImgSrc = activeElement.querySelector(".minImg").src;
  
      return {
        name: name,
        profileImgSrc: profileImgSrc,
        minImgSrc: minImgSrc
      };
    }
    return null; // active 요소가 없을 경우
  }
  

  // active인 요소의 데이터를 업데이트하는 함수
  function updateModalWithData(data) {
    if (data) {
      const modalName = selectListModal.querySelector(".select.active .selectText p").textContent;
      const modalProfileImg = selectListModal.querySelector(".select.active .profileImg").src;
      const modalMinImg = selectListModal.querySelector(".select.active .minImg").src;
  
      modalName.textContent = data.name;
      modalProfileImg.src = data.profileImgSrc;
      modalMinImg.src = data.minImgSrc;
    }
  }


// .select.active.default 요소 업데이트 함수
function updateDefaultSelectWithData(data) {
    const defaultSelect = document.querySelector(".select.active.default");
    if (defaultSelect) {
      const minImg = defaultSelect.querySelector(".minImg");
      const selectText = defaultSelect.querySelector(".selectText p");
  
      minImg.src = data.minImgSrc;
      selectText.textContent = data.name;
    }
  }

// 초기에도 모달 내용 업데이트
const initialData = data[0]; // 예시로 첫 번째 데이터를 초기 데이터로 설정
updateModalContentWithSelectedData(initialData);
updateDefaultSelectWithData(initialData);

// 이미지 소스도 초기에 설정 **프로필 미니 이미지는 클래스명이 minImg, 데이터는 profile
const initialMinImg = document.querySelector(".select.active.default .minImg");
initialMinImg.src = initialData.profile;