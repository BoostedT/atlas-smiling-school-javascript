// JS for Dropdown menu for task #5
function renderStars(count) {
  return '<img src="images/star_on.png" width="15px">'.repeat(count) +
    '<img src="images/star_off.png" width="15px">'.repeat(5 - count);
}

function renderVideoCard(video) {
  return `
    <div class="col-12 col-sm-6 col-lg-3 d-flex justify-content-center">
      <div class="card">
        <img src="${video.thumb_url}" class="card-img-top" alt="${video.title}" />
        <div class="card-img-overlay text-center">
          <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
        </div>
        <div class="card-body">
          <h5 class="card-title font-weight-bold">${video.title}</h5>
          <p class="card-text text-muted">${video['sub-title']}</p>
          <div class="creator d-flex align-items-center">
            <img src="${video.author_pic_url}" width="30px" class="rounded-circle" />
            <h6 class="pl-3 m-0 main-color">${video.author}</h6>
          </div>
          <div class="info pt-3 d-flex justify-content-between">
            <div class="rating">${renderStars(video.star)}</div>
            <span class="main-color">${video.duration}</span>
          </div>
        </div>
      </div>
    </div>`;
}


function fetchCourses() {
  const q = $('.search-text-area').val();
  const topic = $('#dropdown-topic').attr('data-selected');
  const sort = $('#dropdown-sort').attr('data-selected');

  $('#videos-loader').show();
  $('#video-list').empty();

  $.ajax({
    url: 'https://smileschool-api.hbtn.info/courses',
    method: 'GET',
    data: { q, topic, sort },
    success: function (data) {
      $('.video-count').text(`${data.courses.length} videos`);
      data.courses.forEach(video => {
        $('#video-list').append(renderVideoCard(video));
      });
    },
    error: function (err) {
      console.error('Fetch error:', err);
    },
    complete: function () {
      $('#videos-loader').css({ display: 'none', visibility: 'hidden', opacity: 0 });
    }
  });
}


function initFilters() {
  $.get('https://smileschool-api.hbtn.info/courses', (data) => {
    const topicMenu = $('#dropdown-topic .dropdown-menu').empty();
    const sortMenu = $('#dropdown-sort .dropdown-menu').empty();

    data.topics.forEach(t => {
      const label = t.charAt(0).toUpperCase() + t.slice(1);
      topicMenu.append(`<a class="dropdown-item" href="#" data-value="${t}">${label}</a>`);
    });


    data.sorts.forEach(s => {
      const label = s.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      sortMenu.append(`<a class="dropdown-item" href="#" data-value="${s}">${label}</a>`);
    });


    fetchCourses();
  });
}

$(document).ready(() => {
  // Assign dropdown IDs if not already set
  $('.box2 .dropdown').attr('id', 'dropdown-topic');
  $('.box3 .dropdown').attr('id', 'dropdown-sort');

  // Dropdown interaction
  $(document).on('click', '.dropdown-menu .dropdown-item', function () {
    const label = $(this).text();
    const value = $(this).data('value');
    const dropdown = $(this).closest('.dropdown');

    dropdown.find('span').text(label);
    dropdown.attr('data-selected', value);

    fetchCourses();
  });

  // Search field interaction
  $('.search-text-area').on('input', function () {
    fetchCourses();
  });

  initFilters();
});
