// @include "../../jquery.js"

$(document).ready(function () {

  $('xbody').prepend(`
    <div id="frontend-pannel">
      <div class="fe__load-images">
        <h3>load images</h3>
        <div class="fe__images">
        </div>
      </div>
    </div>
  `)

  $('.fe__load-images h3').on('click', function () {
    getImg();
  })

  function getImg() {
    var images = [];

    // clear current images from html
    $('#frontend-pannel .fe__load-images .fe__images').html('')


    $('*').each(function () {
      var elementType = this.nodeName.toLowerCase();

      var imgSrc = $(this).attr('src');
      var bgImgUrl = $(this).css('background-image').slice(5, -2);
      

      if (elementType == 'img') {
        // check if image is already exist 
        if (!images.includes(imgSrc)) {
          images.push(imgSrc);
        }        
      }


      if (elementType == 'div') {

        if (bgImgUrl != 'none' && !images.includes(bgImgUrl) && bgImgUrl.length != 0) {
          images.push(bgImgUrl);
        }
      }

    })

    console.log(images)


    // show image
    for (var i = 0; i < images.length; i++) {
      $('#frontend-pannel .fe__load-images .fe__images').append('<a href="' + images[i] + '" target="_blank" class="fe__image img-contain" style="background-image: url(' + images[i] + ')"></a>')
    }
  }


});