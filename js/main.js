/*모바일용 헤더
$(function(){
     $(".btn_hamburger").click(function () {
       $(".mo_menu_container").toggleClass("open");
       $(this).toggleClass("open");
     });
     $(".btn_hamburger.open").click(function () {
       $(".mo_menu_container").removeClass("open");
       $(".btn_hamburger").removeClass("open");
     });
     $(".mo_gnb ul > li").click(function(){
       $(this).find(".depth02").stop().slideToggle();
     });
   });*/

/*스킬바 효과버튼*/
document.addEventListener('DOMContentLoaded', () => {
  // ✨ 수정: 모든 .skill-item 요소를 선택합니다. (left/right 열 모두 포함)
  const skillItems = document.querySelectorAll('.skill-item');

  // 숫자 카운팅 애니메이션 함수 (이전과 동일)
  function animateCounting(element, end, duration) {
    let current = 0;
    const range = end;
    const stepTime = Math.abs(Math.floor(duration / range));

    // span의 left 위치를 설정하는 내부 함수
    const setSpanPosition = (percent) => {
      element.style.left = percent + '%';
    }

    element.textContent = '0%';
    setSpanPosition(0); // 시작 위치 (0%) 설정

    const timer = setInterval(() => {
      current += 1;
      element.textContent = current + '%';

      // 카운팅과 동시에 span 위치 업데이트
      setSpanPosition(current);

      if (current >= end) {
        element.textContent = end + '%';
        setSpanPosition(end);
        clearInterval(timer);
      }
    }, stepTime);
  }

  // Intersection Observer 설정
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // entry.target은 이제 skill-item 입니다.
        const barWrap = entry.target.querySelector('.bar-wrap');
        const bar = barWrap.querySelector('.bar');
        const percentageSpan = barWrap.querySelector('.percentage');

        const targetPercent = parseInt(bar.getAttribute('data-percent'));

        // 1. bar-wrap에 'animated' 클래스 추가
        barWrap.classList.add('animated');

        // 2. 바의 width를 설정하여 애니메이션 시작
        bar.style.width = targetPercent + '%';

        // 3. 퍼센트 텍스트 카운팅 및 위치 애니메이션 시작
        animateCounting(percentageSpan, targetPercent, 1500);

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5 // 각 skill-item의 50%가 보이면 실행
  });

  // ✨ 수정: 모든 skill-item에 Observer 연결
  skillItems.forEach(item => {
    observer.observe(item);
  });
});

/*top버튼*/
$(function () {
  $(window).scroll(function () {
    if ($(window).scrollTop() >= 20) {
      $("#btn_top").fadeIn();
      $("#header").addClass("fixed");
    } else {
      $("#btn_top").fadeOut();
      $("#header").removeClass("fixed");
    }
  });
});