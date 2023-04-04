function resetPopup() {
  document.querySelectorAll("[data-roll]").forEach(function (el){
    el.classList.remove("active");
  });
  document.querySelector("[data-player-pic]").setAttribute('data-player-pic','normal');
  document.querySelector("[data-enemy-pic]").setAttribute('data-enemy-pic','normal');
  document.querySelector(".test-difficulty").classList.remove("active");
  document.querySelector(".enemy-wrapper").classList.remove("active");
  document.querySelector(".test-saving").classList.remove("active");
  document.querySelector(".test-armor").classList.remove("active");
  document.querySelector(".test-result .result-value").innerHTML = '';
  document.querySelectorAll("[data-throw-result]").forEach(function (el){
    el.innerHTML = '';
  });
  document.querySelector(".test-result").classList.remove("active");
  document.querySelectorAll(".test-result .result").forEach(function (el){
    el.classList.remove("active");
  });
}

document.querySelectorAll("[data-close-popup]").forEach(function (buttonClosePopup) {
  buttonClosePopup.addEventListener( 'click', function (btn) {
    console.log('close popup');
    document.querySelector(".popup-overlay").classList.remove("active");
    document.querySelector(".popup-test").classList.remove("active");
    resetPopup();
  });
});

var openPopup = document.querySelectorAll("[data-popup-roll]").forEach(function (buttonPopup) {

  buttonPopup.addEventListener( 'click', function (btn) {
    var rollType = this.getAttribute("data-popup-roll");
    document.querySelector(".popup-overlay").classList.add("active");
    document.querySelector(".popup-test").classList.add("active");
    resetPopup();
    
    
    document.querySelectorAll("[data-roll=" + rollType + "]").forEach(function (el){
      el.classList.add("active");
    });

    switch (rollType) {
      case "perception":
        document.querySelector("[data-roll=d20]").classList.add("active");
        break;
      case "survival":
        document.querySelector("[data-roll=d20]").classList.add("active");
        document.querySelector(".test-difficulty").classList.add("active");
        break;
      case "stealth":
        document.querySelector("[data-roll=d20]").classList.add("active");
        document.querySelector(".enemy-wrapper").classList.add("active");
        document.querySelector(".test-saving").classList.add("active");
        break;
      case "attack":
        document.querySelector("[data-roll=d20]").classList.add("active");
        document.querySelector(".enemy-wrapper").classList.add("active");
        document.querySelector(".test-armor").classList.add("active");
        break;
      case "damage":
        document.querySelector("[data-roll=d8]").classList.add("active");
        break;
    };
  });
});
