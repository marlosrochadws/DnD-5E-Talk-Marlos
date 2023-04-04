import Swiper from 'swiper/bundle';

let slideActive, animateInk;

var swiper = new Swiper(".mainSwiper", {
  loop: false,
  effect: 'fade',
  allowTouchMove: false,
  fadeEffect: {
    crossFade: true
  },
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // keyboard: {
  //   enabled: true,
  // },
});

function checkForScenes(sceneStep) {
  var hasScene = false;
  var activeSlide = document.querySelector(".swiper-slide-active");
  activeSlide.querySelectorAll("[data-scene-step]").forEach((elemStep) => {
    if(elemStep.getAttribute('data-scene-step') == sceneStep) {
      elemStep.classList.add('show');
      hasScene = true;
    }
  });
  return hasScene;
}

var sctiveSceneStep = 1;

// ###########################################################################################################################
// TIMELINE
// ###########################################################################################################################

var swiperTimeline = new Swiper(".timelineSwiper", {
  loop: false,
  allowTouchMove: false,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
  },
});

// ###########################################################################################################################
// ELETRONIC RPGs
// ###########################################################################################################################

var eletronicRPGsSwiper = new Swiper(".eletronicRPGsSwiper", {
  loop: false,
  effect: 'fade',
  allowTouchMove: false,
  fadeEffect: {
    crossFade: true
  },
});

document.querySelectorAll("[data-goto-slide]").forEach(function (buttonGoToSlide) {
  buttonGoToSlide.addEventListener( 'click', function (el) {
    var slideNumber = buttonGoToSlide.getAttribute('data-goto-slide');
    eletronicRPGsSwiper.slideTo(slideNumber, 0);
  });
})

// ###########################################################################################################################
// D&D TIMELINE
// ###########################################################################################################################

var dndTimelineSwiper = new Swiper(".dndTimelineSwiper", {
  loop: false,
  effect: 'fade',
  allowTouchMove: false,
  fadeEffect: {
    crossFade: true
  },
});

document.querySelectorAll("[data-dnd-slide]").forEach(function (buttonDndSlide) {
  buttonDndSlide.addEventListener( 'click', function (el) {
    var slideNumber = buttonDndSlide.getAttribute('data-dnd-slide');
    dndTimelineSwiper.slideTo(slideNumber, 0);
  });
})


// ###########################################################################################################################
// FOUR CARDS
// ###########################################################################################################################

var swiper4cards = new Swiper(".slide4cardsSwiper", {
  loop: false,
  direction: 'vertical',
  allowTouchMove: false,
  // pagination: {
  //   el: ".swiper-pagination",
  //   type: "fraction",
  // },
});

document.querySelectorAll("[data-four-card]").forEach((card) => {
  card.addEventListener("click", () => {
    if (card.classList.contains("active")) {
      card.classList.remove("active");
      document.querySelectorAll("[data-four-card]").forEach((e) => {
        e.classList.remove("disabled");
      });
    } else {
      card.classList.add("active");
      document.querySelectorAll("[data-four-card]").forEach((e) => {
        if(card != e) {
          e.classList.add("disabled");
        }
      });
    }
  })
});

function removeAnimationState() {
  document.querySelectorAll(".activated-by-key.swiper-slide-active").forEach(function (slideActive) {
    slideActive.querySelectorAll(".inkmask-container").forEach(function (el) {
      el.classList.remove("animate");
    });
    slideActive.classList.remove("animate-slide");        
  })
}

document.onkeydown = function (e) {
	e = e || window.event;
  

	switch (e.key) {
    case '.': //MAIN SLIDE NEXT
      removeAnimationState();
      swiper.slideNext();
			break;
    case ',': //MAIN SLIDE PREV
      removeAnimationState();
      swiper.slidePrev();
			break;
    case '[': //SUBSLIDE PREV
      removeAnimationState();
      swiper4cards.slidePrev();
      break;
    case ']': //SUBSLIDE NEXT
      removeAnimationState();
      swiper4cards.slideNext();
      break;
    case "a": //ANIMATE
      document.querySelectorAll(".activated-by-key.swiper-slide-active").forEach(function (slideActive) {
        slideActive.querySelectorAll(".inkmask-container").forEach(function (animateInk) {
          animateInk.classList.add("animate");
        });
        slideActive.classList.add("animate-slide");
      })
			break;
		case "d": //PUPPET DAVE OPEN
      document.querySelector("[data-puppet-dave]").classList.add("mouth-openned");
			break;
		case "g": //PUPPET GARY OPEN
      document.querySelector("[data-puppet-gary]").classList.add("mouth-openned");
			break;
		case "b":
      console.log('e onkeydown');
			break;
		case "c":
      console.log('r onkeydown');
			break;	
	}
}

document.onkeyup = function (e) {
	e = e || window.event;

	switch (e.key) {
		case "d": //PUPPET DAVE CLOSE
      document.querySelector("[data-puppet-dave]").classList.remove("mouth-openned");
			break;
		case "g": //PUPPET GARY CLOSE
      document.querySelector("[data-puppet-gary]").classList.remove("mouth-openned");
			break;
		case "b":
			console.log('e onkeyup');
			break;
		case "c":
			console.log('r onkeyup');
			break;	
	}
}

