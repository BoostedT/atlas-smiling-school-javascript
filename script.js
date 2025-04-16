// Quotes Carousel
$(document).ready(function () {
  const carouselInner = $("#carouselExampleControls .carousel-inner");
  const loader = $(`
      <div class="text-center py-5" id="quotes-loader">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    `);

  carouselInner.append(loader);

  $.get("https://smileschool-api.hbtn.info/quotes", function (data) {
    $("#quotes-loader").remove();
    carouselInner.empty();

    data.forEach((quote, index) => {
      const isActive = index === 0 ? "active" : "";
      const quoteItem = `
          <div class="carousel-item ${isActive}">
            <div class="row mx-auto align-items-center">
              <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                <img src="${quote.pic_url}" class="d-block align-self-center rounded-circle" alt="${quote.name}" width="160" />
              </div>
              <div class="col-12 col-sm-9 col-lg-8">
                <div class="quote-text">
                  <p class="text-white font-italic">« ${quote.text} »</p>
                  <h4 class="text-white font-weight-bold mb-0">${quote.name}</h4>
                  <span class="text-white">${quote.title}</span>
                </div>
              </div>
            </div>
          </div>
        `;
      carouselInner.append(quoteItem);
    });
  }).fail(function () {
    $("#quotes-loader").html('<div class="text-danger">Failed to load quotes.</div>');
  });
});

// Popular tutorials
$(document).ready(function () {
  const $loader = $('#popular-loader');
  const $carousel = $('#slick-carousel');

  $.get('https://smileschool-api.hbtn.info/popular-tutorials', function (data) {
    $loader.hide();
    $carousel.removeClass('d-none');

    data.forEach((video) => {
      const card = `
        <div>
          <div class="card mx-2">
            <img src="${video.thumb_url}" class="card-img-top" alt="${video.title}">
            <div class="card-img-overlay text-center">
              <img src="images/play.png" alt="Play" width="64px" class="play-overlay">
            </div>
            <div class="card-body">
              <h5 class="card-title font-weight-bold">${video.title}</h5>
              <p class="card-text text-muted">${video['sub-title']}</p>
              <div class="creator d-flex align-items-center">
                <img src="${video.author_pic_url}" alt="${video.author}" width="30" class="rounded-circle">
                <h6 class="pl-2 m-0 main-color">${video.author}</h6>
              </div>
              <div class="info pt-3 d-flex justify-content-between">
                <div class="rating">
                  ${'<img src="images/star_on.png" width="15">'.repeat(video.star)}
                  ${'<img src="images/star_off.png" width="15">'.repeat(5 - video.star)}
                </div>
                <span class="main-color">${video.duration}</span>
              </div>
            </div>
          </div>
        </div>`;

      $carousel.append(card);
    });

    $carousel.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: true,
      arrows: true,
      prevArrow: '<button type="button" class="slick-prev"><img src="images/arrow_black_left.png" /></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="images/arrow_black_right.png" /></button>',
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  });
});
