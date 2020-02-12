(function () {

  let firstAPICall = axios.get('http://www.omdbapi.com?i=tt6751668&&apikey=3cccb84d')
  let secondAPICall = axios.get('http://www.omdbapi.com?i=tt2584384&&apikey=3cccb84d')
  let thirdAPICall = axios.get('http://www.omdbapi.com?i=tt2935510&&apikey=3cccb84d')
  let fourthAPICall = axios.get('http://www.omdbapi.com?i=tt0312098&&apikey=3cccb84d')

  Promise.all([firstAPICall, secondAPICall, thirdAPICall, fourthAPICall])
    .then(response => {
      let movies = response;
      let output = '';
      $.each(movies, (index, movie) => {

        output += `<div class="col-md-3">
                    <div class="well text-center">
                      <div class="img-hover-zoom">
                        <img src="${movie.data.Poster}">
                        <div class="button1"><a onclick="movieSelected('${movie.data.imdbID}')"  href="#"> DETAILS </a></div>
                        <div class="button2"><a href="#"> ADD </a></div>
                      </div>
                      <p>${movie.data.Title}</p>
                    </div>
                  </div>`;
      });
      $('#movieLibrary').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
})();

$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText){
  axios.get('http://www.omdbapi.com?s='+searchText+'&&apikey=3cccb84d')
    .then((response) => {
      console.log(response);
      let movies = response.data.Search;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <div class="img-hover-zoom">
                <img src="${movie.Poster}">
                <div class="button1"><a onclick="movieSelected('${movie.imdbID}')"  href="#"> DETAILS </a></div>
                <div class="button2"><a href="#"> ADD </a></div>
              </div>
              <p>${movie.Title}</p>
            </div>
          </div>
        `;
      });

      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');

  axios.get('http://www.omdbapi.com?i='+movieId+'&&apikey=3cccb84d')
    .then((response) => {
      console.log(response);
      let movie = response.data;
      let output =`
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>
      `;

      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
