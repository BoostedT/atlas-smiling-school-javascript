$(document).ready(function () {
  const carouselInner = $("#carouselExampleControls .carousel-inner");
  const loader = $("#pricing-loader");

  loader.show();
  carouselInner.empty();

  $.get("https://smileschool-api.hbtn.info/quotes")
    .done(function (quotes) {
      loader.hide();

      quotes.forEach((quote, index) => {
        const isActive = index === 0 ? "active" : "";
        const item = `
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
          </div>`;
        carouselInner.append(item);
      });
    })
    .fail(function () {
      loader.html('<p class="text-white text-center">Failed to load quotes.</p>');
    });
});
