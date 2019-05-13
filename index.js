"use strict";

var vanillaSlide = (function(slideConfig) {
  var slideWrap = document.querySelector(slideConfig.slide),
    slide = slideWrap.querySelector(".slide_area"),
    slideLength = slide.children.length,
    controlEl =
      slideConfig.controlEl === undefined
        ? null
        : {
            prev: document.querySelector(slideConfig.controlEl.prev),
            next: document.querySelector(slideConfig.controlEl.next)
          },
    auto = slideConfig.auto,
    directionFlag = 0;

  // 슬라이드 제어
  var moveEvent = function(direction, autoNext) {
    if (direction === controlEl.next) {
      if (auto && autoNext && -directionFlag >= slide.clientWidth * (slideLength - 1)) {
        directionFlag = 0;
      } else if (-directionFlag >= slide.clientWidth * (slideLength - 1)) {
        directionFlag = -(slide.clientWidth * (slideLength - 1));
      } else {
        directionFlag = directionFlag - slide.clientWidth;
      }
    } else if (direction === controlEl.prev) {
      directionFlag >= 0
        ? (directionFlag = 0)
        : (directionFlag = directionFlag + slide.clientWidth);
    }
    var animate = function(callback) {
      slide.style.transitionDuration = "200ms";
      slide.style.transform = "translate3d(" + directionFlag + "px, 0, 0)";
      callback();
    };
    animate(function() {
      setTimeout(function() {
        slide.style.transitionDuration = "0ms";
      }, 200);
    });
  };

  // auto 활설화
  if (auto) {
    var setInterv = null;
    var autoStart = function() {
      setInterv = setInterval(function() {
        moveEvent(controlEl.next, true);
      }, 3000);
    };
    autoStart();
    slideWrap.addEventListener("mouseover", function() {
      clearInterval(setInterv);
    });
    slideWrap.addEventListener("mouseleave", function() {
      autoStart();
    });
  }
  // 클릭 이벤트
  if (controlEl !== null) {
    controlEl.next.addEventListener("click", function() {
      moveEvent(controlEl.next);
    });
    controlEl.prev.addEventListener("click", function() {
      moveEvent(controlEl.prev);
    });
  }
})({
  slide: ".slide_wrap",
  controlEl: {
    prev: ".btn_prev",
    next: ".btn_next"
  },
  auto: true
});
