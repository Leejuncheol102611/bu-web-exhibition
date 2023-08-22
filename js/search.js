const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

const data = [
  "권정연",
  "김동우",
  "김민혁",
  "김주희",
  "방민수",
  "백홍은",
  "소리엘",
  "손경주",
  "여초교",
  "오성우",
  "오수빈",
  "이광원",
  "이다빈",
  "이다연",
  "이주언",
  "정미정",
  "조진호",
  "주혜원",
  "최지수"
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

  searchInput.addEventListener("input", function(event) {
    if (searchResults.innerHTML.trim() !== "") {
      handleInput();
    }
  });

  function handleInput() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const matchedData = data.filter(item => item.toLowerCase().includes(searchTerm));

    displayAutocomplete(matchedData);
  }

  function displayAutocomplete(matchedData) {
    searchResults.innerHTML = "";

    if (matchedData.length > 0) {
      const autocompleteList = document.createElement("ul");
      autocompleteList.classList.add("autocompleteList");

      matchedData.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = item;

        listItem.addEventListener("click", () => {
          searchInput.value = item;
          searchResults.innerHTML = "";
        });

        autocompleteList.appendChild(listItem);
      });

      searchResults.appendChild(autocompleteList);
    }
  }