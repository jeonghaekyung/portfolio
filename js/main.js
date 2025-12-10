/*모바일용 헤더*/
$(function () {
  $(".btn_hamburger").click(function () {
    $(".mo_menu_container").toggleClass("open");
    $(this).toggleClass("open");
  });
  $(".btn_hamburger.open").click(function () {
    $(".mo_menu_container").removeClass("open");
    $(".btn_hamburger").removeClass("open");
  });
  $(".mo_gnb ul > li").click(function () {
    $(this).find(".depth02").stop().slideToggle();
  });
});

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

/*모달 팝업*/
document.addEventListener('DOMContentLoaded', (event) => {
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const closeBtn = document.querySelector('.close-btn');
  const modalOverlay = document.querySelector('.modal-overlay');

  // '이미지 보기' 버튼모두 선택
  const allVisitButtons = document.querySelectorAll('.btn_visit');

  // 팝업 닫기 함수
  const closeModal = () => {
    // is-open 클래스를 제거하여 모달을 숨김
    modal.classList.remove('is-open');
    document.body.style.overflow = ''; // 뒷 배경 스크롤 재개
  };

  // 팝업 닫기 이벤트 등록
  closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);

  // Esc 키로 닫기
  window.addEventListener('keydown', function (event) {
    // is-open 클래스가 있는지 확인하여 닫기
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  // 버튼 종류에 따라 동작 분기 로직
  allVisitButtons.forEach(button => {
    button.addEventListener('click', function (event) {

      // 버튼에 target="_blank" 속성 확인
      const isExternalLink = this.getAttribute('target') === '_blank';
      const imagePath = this.getAttribute('data-image'); // data-image 속성 확인

      // --------------------------------------------------------
      // 1. 외부 링크 (target="_blank"가 있거나 data-image가 없으면)
      // --------------------------------------------------------
      if (isExternalLink || !imagePath) {
        return; // 기본 동작(링크 이동) 허용
      }

      // --------------------------------------------------------
      // 2. 모달 팝업 (target="_blank"가 없고 data-image가 있는 경우)
      // --------------------------------------------------------

      event.preventDefault(); // 기본 링크 이동 동작 방지

      // 필수: 이미지 경로 설정
      modalImage.src = imagePath;

      // 필수: is-open 클래스를 추가하여 모달을 띄우고 중앙 정렬
      modal.classList.add('is-open');

      document.body.style.overflow = 'hidden'; // 뒷 배경 스크롤 방지
    });
  });
});