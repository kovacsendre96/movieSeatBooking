
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;
const clearBtn = document.getElementById('clear');
const screen = document.querySelector('.screen');
const movieContainer = document.querySelector('.movie-container');






/* populateUI(); */


function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);

}


//Update total and count
function updateSelectCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');


    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    if (movieSelect.value !== 'Choose a film') {

        count.innerText = selectedSeatsCount;
        total.innerText = selectedSeatsCount * ticketPrice;
    }
}


// Get data from local storage and opulate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Change screen background and blur color
function changeBackground(e) {
    if (e.target.selectedIndex === 1) {

        screen.style.background = "url(avengers.jpg)";
        screen.style.backgroundPosition = "center";
        screen.style.backgroundSize = "cover";
        screen.style.boxShadow = "0 3px 25px rgba(104,56,127,0.9)";
    }
    else if (e.target.selectedIndex === 2) {
        screen.style.background = "url(joker.jpg)";
        screen.style.backgroundPosition = "center";
        screen.style.backgroundSize = "cover";
        screen.style.boxShadow = "0 3px 25px #2B6881";
    }
    else if (e.target.selectedIndex === 3) {
        screen.style.background = "url(toy-story.jpg)";
        screen.style.backgroundPosition = "center";
        screen.style.backgroundSize = "cover";
        screen.style.boxShadow = "0 3px 25px #AC7135";
    }
    else if (e.target.selectedIndex === 4) {
        screen.style.background = "url(lion-king.jpg)";
        screen.style.backgroundPosition = "center";
        screen.style.backgroundSize = "cover";
        screen.style.boxShadow = "0 3px 25px #8399BB";
    }

}


//Movie select event
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    changeBackground(e)
    updateSelectCount();

})


//Seat click event 
container.addEventListener('click', (e) => {
    if (movieSelect.value === 'Choose a film') {

        movieSelect.classList =("movie error");
        movieContainer.classList.toggle("error");
    }
    else{
        movieSelect.classList.remove("error")
    }
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied') && movieSelect.value !== 'Choose a film') {
        e.target.classList.toggle('selected');
        updateSelectCount();

    }
});

// clear btn event
clearBtn.addEventListener('click', () => {
    let selected = document.querySelectorAll('.seat.selected');
    console.log(selected)
    selected.forEach(item => {
        if (item.id !== 'first') {

            item.classList.remove("selected");
        }
    })
    updateSelectCount()
})

//Initial count and total set

updateSelectCount();



console.log(movieSelect.value)