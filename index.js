//placeholders are default hidden for noscript case - remove class if js is enabled
function showPlaceholders() {
  //removes hide-for-no-script class from images
  var img = document.querySelectorAll(".hide-for-no-script");
  for(var i=0; i<img.length; i++) img[i].classList.remove("hide-for-no-script");
}

showPlaceholders();


//carousel
function carouselInit() {
  var time = 200;

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
    document.getElementById(activeId).classList.remove("show");
    var num = activeId.split("-");
    num = Number(num[1]);
    var next;
    if (direction === "r") next = (num === 9) ? 1 : num += 1;
    if (direction === "l") next = (num === 1) ? 9 : num -= 1;
    next = "i-" + next;
    setTimeout(function() {
      document.getElementById(activeId).classList.remove("active");
      document.getElementById(next).classList.add("active");
      //need to add delay for transition effect to work - as far as I can tell
      setTimeout(function() {
        document.getElementById(next).classList.add("show");
        //reset activeId for next round
        activeId = next;
      }, 200);
    }, time);
  }
}

carouselInit();


function lazyLoadInit() {
  document.addEventListener("DOMContentLoaded", function() {
    //Select all placeholder images by data-src
    var lazyloadImages = document.querySelectorAll("[data-src]");
    //If browser supports IntersectionObserver
    if ("IntersectionObserver" in window) {
      var imageObserver = new IntersectionObserver(function(entries, observer) {
        for (var i=0; i<entries.length; i++) {
          if (entries[i].isIntersecting) {
            var image = entries[i].target;
            console.log(image.id);
            image.src = image.dataset.src;
            imageObserver.unobserve(image);
          }
        }
      });
      //Observe all placeholder images
      for (var j=0; j<lazyloadImages.length; j++) imageObserver.observe(lazyloadImages[j]);
    } else {
      //Broser does NOT support IntersectionObserver
      var lazyloadThrottleTimeout;
      function lazyload() {
        if(lazyloadThrottleTimeout) {
          clearTimeout(lazyloadThrottleTimeout);
        }
        lazyloadThrottleTimeout = setTimeout(function() {
          var scrollTop = window.pageYOffset;
          for (var k=0; k<lazyloadImages; k++) {
            if (lazyloadImages[k].offsetTop < (window.innerHeight + scrollTop)) {
              lazyloadImages[k].src = lazyloadImages[k].dataset.src;
            }
          }
          if (lazyloadImages.length == 0) {
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationChange", lazyload);
          }
        }, 20);
      }
      document.addEventListener("scroll", lazyload);
      window.addEventListener("resize", lazyload);
      window.addEventListener("orientationChange", lazyload);
    }
  });
}


lazyLoadInit();
