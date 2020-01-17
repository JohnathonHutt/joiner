//carousel
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

function lazyLoadInit() {
  document.addEventListener("DOMContentLoaded", function() {
    var lazyloadImages = document.querySelectorAll("[data-src]");

    if ("IntersectionObserver" in window) {
      var imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var image = entry.target;
            console.log(image.id);
            image.src = image.dataset.src;
            imageObserver.unobserve(image);
          }
        });
      });

      lazyloadImages.forEach(function(image) {
        imageObserver.observe(image);
      });
    } else {
      var lazyloadThrottleTimeout;

      function lazyload () {
        if(lazyloadThrottleTimeout) {
          clearTimeout(lazyloadThrottleTimeout);
        }

        lazyloadThrottleTimeout = setTimeout(function() {
          var scrollTop = window.pageYOffset;
          lazyloadImages.forEach(function(img) {
              if(img.offsetTop < (window.innerHeight + scrollTop)) {
                img.src = img.dataset.src;
              }
          });
          if(lazyloadImages.length == 0) {
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

// lazyLoadInit();
