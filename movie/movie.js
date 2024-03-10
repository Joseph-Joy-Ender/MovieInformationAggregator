let movieName = document.getElementById('movieName')
let searchBtn = document.getElementById('searchBtn')
let result = document.getElementById('result')

function extractedResult(data) {
    result.innerHTML = `
                <div class="info">
                    <img src=${data.Poster} alt="" class="poster">
                    <div>
                        <h2>${data.Title}</h2>
                        <div class="rating">
                        <img src="yellowStar.jpg" alt="">
                        <h4>${data.imdbRating}</h4>
                       </div>
                       <div class="details">
                         <span>${data.Rated}</span>
                         <span>${data.Released}</span>
                         <span>${data.Runtime}</span>
                       </div>
                       <div class="genre">
                         <div>${data.Genre.split(",").join("</div><div>")}</div>
                       </div>
                    </div>
                </div>
               <h3>Plot:</h3>
               <p>${data.Plot}</p>
               <h3>Cast:</h3>
               <p>${data.Actors}</p>
               <h3>Awards:</h3>
               <p>${data.Awards}</p>
                `;
}

let getMovie = () => {
    let movie = movieName.value;
    let url = `https://www.omdbapi.com/?t=${movie}&apiKey=${key}`;

    if (movie.length <= 0){
        result.innerHTML = `<h3 class="msg">Please Enter A Movie Name</h3>`;

    }else {
        fetch(url)
            .then((resp) => resp.json())
            .then((data) =>{
                if (data.Response === 'True'){
                    extractedResult(data);
                }
               else {
                   result.innerHTML = `<h3 class="msg">${data.ERROR.message}</h3>`;
                }
            })
            .catch(() => {
                result.innerHTML = `<h3 class="msg">Error Occurred</h3>`;
            });
    }
};
searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);