const booksIcons = document.querySelectorAll('.books-icon');

booksIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        if (!icon.classList.contains('active')) {
            // 클릭한 아이콘을 활성화하고 나머지 아이콘은 비활성화
            booksIcons.forEach(otherIcon => {
                if (otherIcon !== icon) {
                    otherIcon.classList.remove('active');
                    otherIcon.classList.add('inactive');
                }
            });
            icon.classList.remove('inactive');
            icon.classList.add('active');
        }
    });
});


const boxes = document.querySelectorAll('.box');
const animationDuration = 150; // 애니메이션 지속 시간 (0.2초)
const delayBetweenBoxes = 500; // 박스 간 지연 (2초)

function animateBox(index) {
  if (index >= boxes.length) {
    setTimeout(() => {
      animateBox(0); // 모든 박스를 순환한 후 지연시간을 주고 다시 첫 번째 박스부터 시작
    }, delayBetweenBoxes);
    return;
  }

  boxes[index].classList.add('animate');

  setTimeout(() => {
    boxes[index].classList.remove('animate');
    animateBox(index + 1); // 다음 박스의 애니메이션 시작
  }, animationDuration);
}

animateBox(0);