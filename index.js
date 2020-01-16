function carouselInit() {

  var lArrow = document.getElementById("l-arrow");
  lArrow.addEventListener("click", function() {
    moveImage("l");
  });

  var rArrow = document.getElementById("r-arrow");
  rArrow.addEventListener("click", function() {
    moveImage("r");
  });

  var activeId = "i-1";

  function moveImage(direction) {
    console.log(direction);
    document.getElementById(activeId).classList.add("transition");
    setTimeout(function() {
      document.getElementById(activeId).classList.remove("transition");
      document.getElementById(activeId).classList.remove("active");
      var num = activeId.split("-");
      num = Number(num[1]);
      if (direction === "r") num = (num === 9) ? 1 : num += 1;
      if (direction === "l") num = (num === 1) ? 9 : num -= 1;
      activeId = "i-" + num;
      var active = document.getElementById(activeId);
      active.classList.add("active");
      active.blur();
      document.getElementById("image-holder").blur();
    }, 200);
  }
}

carouselInit();
