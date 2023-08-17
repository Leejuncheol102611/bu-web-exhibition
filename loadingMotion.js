const motionContainers = document.querySelectorAll('.pageLoading');
const animationDuration = 300; // 애니메이션 지속 시간 (300ms)
const cubicBezier = 'cubic-bezier(0.22, 0.01, 0.01, 1)';
const delay = 0; // 지연 시간 (50ms)

function completeAnimations(animations) {
    return animations.map(animation => {
      if (!animation.x) animation.x = '0';
      if (!animation.y) animation.y = '0';
      return animation;
    });
  }


  function animateRect(rect, animations) {
    let animationIndex = 0;
    let isAnimating = true; // 애니메이션 진행 여부
  
    function playAnimation() {
      if (!isAnimating) return; // 애니메이션이 중지되었으면 종료
  
      if (animationIndex >= animations.length) {
        animationIndex = 0; // 모든 애니메이션 실행 완료 시 처음 상태로 돌아감
  
        // 모든 애니메이션 완료 후, 초기 상태로 되돌리는 작업 추가
        rect.style.transition = 'none';
        rect.style.removeProperty('fill'); // 초기 색상 설정
        rect.style.removeProperty('width'); // 초기 너비 설정
        rect.style.removeProperty('height'); // 초기 높이 설정
        rect.style.removeProperty('x'); // 초기 x 위치 설정
        rect.style.removeProperty('y'); // 초기 y 위치 설정
      } else {
        const animation = animations[animationIndex];
        const transitionValues = Object.keys(animation)
          .map(prop => `${prop} ${animationDuration}ms ${cubicBezier}`)
          .join(', ');
  
        rect.style.transition = transitionValues;
  
        Object.assign(rect.style, animation);
  
        animationIndex++;
      }
  
      setTimeout(() => {
        rect.style.transition = 'none';
        requestAnimationFrame(playAnimation); // 다음 애니메이션 시작
      }, animationDuration);
    }
  
    // 최초 애니메이션 시작
    playAnimation();
  
    // 애니메이션 중지 버튼 등의 이벤트에 따라 isAnimating 값을 변경하여 애니메이션을 제어할 수 있음
  }

motionContainers.forEach((container) => {
  const rects = container.querySelectorAll('rect');

  const animations = [
    // Define animations for rect1, rect2, rect3, rect4 respectively
    completeAnimations(
    [
      { fill: '#00AB61',},
      { fill: '#00AB61' },
      { fill: '#00AB61', width: '280px' },
      { fill: '#00AB61', x: '77', width: '203px' },
      { fill: '#00AB61', x: '77', width: '203px' },
      { fill: '#00AB61', x: '217', width: '63px' },
      { fill: '#00AB61', x: '217', height: '280px' },
      { fill: '#00AB61', x: '217', y: '147', height: '133px' },
      { fill: '#00AB61', x: '217', y: '147' },
      { fill: '#00AB61', x: '217', y: '147' },
      { fill: '#00AB61', x: '77', y: '147',width: '203px' }
    ]),
    completeAnimations(
    [
      // rect2 animations
      { fill: '#00162C', x: '217' },
      { fill: '#00162C', x: '217', height: '280px' },
      { fill: '#00162C', x: '217', y: '147', height: '133px' },
      { fill: '#00162C', x: '217', y: '147' },
      { fill: '#00162C', x: '217', y: '147' },
      { fill: '#00162C', x: '77', y: '147', width: '203px' },
      { fill: '#00162C', x: '77', y: '147', width: '126px' },
      { fill: '#00162C', x: '77', y: '147', width: '126px' },
      { fill: '#00162C', x: '77', y: '147', width: '126px' },
      { fill: '#00162C', y: '147', width: '203px' },
      { fill: '#00162C', y: '147', width: '63px' }
    ]),
    completeAnimations([
      // rect3 animations
      { fill: '#00162C', y: '147' },
      { fill: '#00162C', y: '147' },
      { fill: '#00162C', y: '147' },
      { fill: '#00162C', y: '', width: '63px', height: '280px' },
      { fill: '#00162C', width: '63px', height: '133px' },
      { fill: '#00162C', width: '203px' },
      { fill: '#00162C', width: '203px' },
      { fill: '#00162C', width: '280px' },
      { fill: '#00162C', x: '77', width: '203px' },
      { fill: '#00162C', x: '77', width: '203px' },
      { fill: '#00162C', x: '217', width: '63px' }
    ]),
    completeAnimations(
    [
      // rect4 animations
      { fill: '#00AB61', x: '77', y: '147' },
      { fill: '#00AB61', x: '77', y: '147', width: '126px' },
      { fill: '#00AB61', x: '77', y: '147', width: '126px' },
      { fill: '#00AB61', x: '77', y: '147', width: '126px' },
      { fill: '#00AB61', y: '147', width: '203px' },
      { fill: '#00AB61', y: '147', width: '63px' },
      { fill: '#00AB61', y: '147', width: '63px' },
      { fill: '#00AB61', y: '147', width: '63px' },
      { fill: '#00AB61', width: '63px', height: '280px' },
      { fill: '#00AB61', width: '63px', height: '133px' },
      { fill: '#00AB61', width: '203px' }
    ])
  ];

  rects.forEach((rect, index) => {
    animateRect(rect, animations[index]);
  });

  
});

