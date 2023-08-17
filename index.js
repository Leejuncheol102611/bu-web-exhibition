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