//Cache image in browser

function preloadImages(array) {
    if (!preloadImages.list) {
        preloadImages.list = [];
    }
    var list = preloadImages.list;
    for (var i = 0; i < array.length; i++) {
        var img = new Image();
        img.onload = function() {
            var index = list.indexOf(this);
            if (index !== -1) {
                // remove image from the array once it's loaded
                // for memory consumption reasons
                list.splice(index, 1);
            }
        }
        list.push(img);
        img.src = array[i];
    }
}

preloadImages(["../img/photos/photo2.jpg", "../img/photos/photo3.jpg", "../img/photos/photo4.jpg", "../img/photos/photo5.jpg", "../img/photos/photo6.jpg", "../img/photos/photo7.jpg", "../img/photos/photo8.jpg", "../img/photos/photo9.jpg", "../img/photos/photo2-thumb.jpg", "../img/photos/photo3-thumb.jpg", "../img/photos/photo4-thumb.jpg", "../img/photos/photo5-thumb.jpg", "../img/photos/photo6-thumb.jpg", "../img/photos/photo7-thumb.jpg", "../img/photos/photo8-thumb.jpg", "../img/photos/photo9-thumb.jpg"]);


///////////////or wait for rest of page to load first
///


// function preloadImages(array, waitForOtherResources, timeout) {
//     var loaded = false, list = preloadImages.list, imgs = array.slice(0), t = timeout || 15*1000, timer;
//     if (!preloadImages.list) {
//         preloadImages.list = [];
//     }
//     if (!waitForOtherResources || document.readyState === 'complete') {
//         loadNow();
//     } else {
//         window.addEventListener("load", function() {
//             clearTimeout(timer);
//             loadNow();
//         });
//         // in case window.addEventListener doesn't get called (sometimes some resource gets stuck)
//         // then preload the images anyway after some timeout time
//         timer = setTimeout(loadNow, t);
//     }
//
//     function loadNow() {
//         if (!loaded) {
//             loaded = true;
//             for (var i = 0; i < imgs.length; i++) {
//                 var img = new Image();
//                 img.onload = img.onerror = img.onabort = function() {
//                     var index = list.indexOf(this);
//                     if (index !== -1) {
//                         // remove image from the array once it's loaded
//                         // for memory consumption reasons
//                         list.splice(index, 1);
//                     }
//                 }
//                 list.push(img);
//                 img.src = imgs[i];
//             }
//         }
//     }
// }
//
// preloadImages(["../img/photos/photo2.jpg", "../img/photos/photo3.jpg", "../img/photos/photo4.jpg", "../img/photos/photo5.jpg", "../img/photos/photo6.jpg", "../img/photos/photo7.jpg", "../img/photos/photo8.jpg", "../img/photos/photo9.jpg", "../img/photos/photo2-thumb.jpg", "../img/photos/photo3-thumb.jpg", "../img/photos/photo4-thumb.jpg", "../img/photos/photo5-thumb.jpg", "../img/photos/photo6-thumb.jpg", "../img/photos/photo7-thumb.jpg", "../img/photos/photo8-thumb.jpg", "../img/photos/photo9-thumb.jpg"], true);
//preloadImages(["url99.jpg", "url98.jpg"], true);
