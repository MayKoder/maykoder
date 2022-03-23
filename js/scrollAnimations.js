// var last_known_scroll_position = 0;
// var ticking = false;


// function doSomething(scroll_pos) {
//   // Hacer algo con la posición del scroll
//   console.log(document.getElementById("scrollspyHeading5").getBoundingClientRect().top);
// }

// window.addEventListener('scroll', function(e) {
//   last_known_scroll_position = window.scrollY;
//   if (!ticking) {
//     window.requestAnimationFrame(function() {
//       doSomething(last_known_scroll_position);
//       ticking = false;
//     });
//   }
//   ticking = true;
// });