
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const personalProfile = document.getElementById("personalProfile");


const data = [
    { name: "권정연", profile: "./profileimg/권정연.jpg", main: "./main/권정연-main.jpg", sub1: "./sub1/권정연-sub1.jpg", sub2: "./sub2/권정연-sub2.jpg" },
    { name: "김동우", profile: "./profileimg/김동우.jpg", main: "./main/김동우-main.jpg", sub1: "./sub1/김동우-sub1.jpg", sub2: "./sub2/김동우-sub2.jpg" },
    { name: "김민혁", profile: "./profileimg/김민혁.jpg", main: "./main/김민혁-main.jpg", sub1: "./sub1/김민혁-sub1.jpg", sub2: "./sub2/김민혁-sub2.jpg" },
    { name: "김주희", profile: "./profileimg/김주희.jpg", main: "./main/김주희-main.jpg", sub1: "./sub1/김주희-sub1.jpg", sub2: "./sub2/김주희-sub2.jpg" },
    { name: "방민수", profile: "./profileimg/방민수.jpg", main: "./main/방민수-main.jpg", sub1: "./sub1/방민수-sub1.jpg", sub2: "./sub2/방민수-sub2.jpg" },
    { name: "백홍은", profile: "./profileimg/백홍은.jpg", main: "./main/백홍은-main.jpg", sub1: "./sub1/백홍은-sub1.jpg", sub2: "./sub2/백홍은-sub2.jpg" },
    { name: "소리엘", profile: "./profileimg/소리엘.jpg", main: "./main/소리엘-main.jpg", sub1: "./sub1/소리엘-sub1.jpg", sub2: "./sub2/소리엘-sub2.jpg" },
    { name: "손경주", profile: "./profileimg/손경주.jpg", main: "./main/손경주-main.jpg", sub1: "./sub1/손경주-sub1.jpg", sub2: "./sub2/손경주-sub2.jpg" },
    { name: "여초교", profile: "./profileimg/여초교.jpg", main: "./main/여초교-main.jpg", sub1: "./sub1/여초교-sub1.jpg", sub2: "./sub2/여초교-sub2.jpg" },
    { name: "오성우", profile: "./profileimg/오성우.jpg", main: "./main/오성우-main.jpg", sub1: "./sub1/오성우-sub1.jpg", sub2: "./sub2/오성우-sub2.jpg" },
    { name: "오수빈", profile: "./profileimg/오수빈.jpg", main: "./main/오수빈-main.jpg", sub1: "./sub1/오수빈-sub1.jpg", sub2: "./sub2/오수빈-sub2.jpg" },
    { name: "이광원", profile: "./profileimg/이광원.jpg", main: "./main/이광원-main.jpg", sub1: "./sub1/이광원-sub1.jpg", sub2: "./sub2/이광원-sub2.jpg" },
    { name: "이다빈", profile: "./profileimg/이다빈.jpg", main: "./main/이다빈-main.jpg", sub1: "./sub1/이다빈-sub1.jpg", sub2: "./sub2/이다빈-sub2.jpg" },
    { name: "이다연", profile: "./profileimg/이다연.jpg", main: "./main/이다연-main.jpg", sub1: "./sub1/이다연-sub1.jpg", sub2: "./sub2/이다연-sub2.jpg" },
    { name: "이주언", profile: "./profileimg/이주언.jpg", main: "./main/이주언-main.jpg", sub1: "./sub1/이주언-sub1.jpg", sub2: "./sub2/이주언-sub2.jpg" },
    { name: "정미정", profile: "./profileimg/정미정.jpg", main: "./main/정미정-main.jpg", sub1: "./sub1/정미정-sub1.jpg", sub2: "./sub2/정미정-sub2.jpg" },
    { name: "조진호", profile: "./profileimg/조진호.jpg", main: "./main/조진호-main.jpg", sub1: "./sub1/조진호-sub1.jpg", sub2: "./sub2/조진호-sub2.jpg" },
    { name: "주혜원", profile: "./profileimg/주혜원.jpg", main: "./main/주혜원-main.jpg", sub1: "./sub1/주혜원-sub1.jpg", sub2: "./sub2/주혜원-sub2.jpg" },
    { name: "최지수", profile: "./profileimg/최지수.jpg", main: "./main/최지수-main.jpg", sub1: "./sub1/최지수-sub1.jpg", sub2: "./sub2/최지수-sub2.jpg" }
  // ... 미리 정의된 데이터를 추가하세요
];


  document.addEventListener("click", function(event) {
    if (!searchResults.contains(event.target) && event.target !== searchInput) {
      searchResults.innerHTML = "";
    }
  });

  searchInput.addEventListener("click", function(event) {
    if (searchResults.innerHTML.trim() === "") {
      handleInput();
    }
  });

  searchButton.addEventListener("click", showProfiles);

  function showProfiles() {
    const inputName = searchInput.value.trim();
    const matchedData = data.filter(item => item.name === inputName);
  
    if (matchedData.length > 0) {
      // 검색어를 encodeURIComponent를 사용하여 URL에 인코딩하여 전달
      const encodedName = encodeURIComponent(inputName);
      window.location.href = `search.html?name=${encodedName}`;
    } else {
      personalProfile.innerHTML = "검색 결과가 없습니다.";
    }
  }

  searchInput.addEventListener("input", handleInput);

  function handleInput() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const matchedData = data.filter(item => item.name.toLowerCase().includes(searchTerm));

    displayAutocomplete(matchedData);
  }

  function displayAutocomplete(matchedData) {
    searchResults.innerHTML = "";

    if (matchedData.length > 0) {
      const autocompleteList = document.createElement("ul");
      autocompleteList.classList.add("autocompleteList");

      matchedData.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = item.name;

        listItem.addEventListener("click", () => {
          searchInput.value = item.name;
          searchResults.innerHTML = "";
          showProfiles();
        });

        autocompleteList.appendChild(listItem);
      });

      searchResults.appendChild(autocompleteList);
    }
  }

  function displayProfiles(profileData) {
    personalProfile.innerHTML = "";

    profileData.forEach(profile => {
      const profileCard = document.createElement("div");
      profileCard.classList.add("profileCard");

      const profileImg = document.createElement("img");
      profileImg.src = profile.profile;
      profileImg.alt = profile.name;
      profileImg.classList.add("profileImg");

      const profileName = document.createElement("p");
      profileName.textContent = profile.name;
      profileName.classList.add("profileCardName")

      profileCard.appendChild(profileImg);
      profileCard.appendChild(profileName);
      personalProfile.appendChild(profileCard);
    });
  }

