let openCards = [];
let moves = 0;
let goodCards = 0;
let wrongGuess = 0;

function init() {

    //  Create a list that holds all of your cards based on there font-awesome name.
    let cards = ['facebook', 'facebook', 'twitter', 'twitter', 'twitch', 'twitch', 'instagram', 'instagram', 'pied-piper-pp', 'pied-piper-pp', 'snapchat', 'snapchat', 'youtube', 'youtube', 'google-plus', 'google-plus'];


    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    // shuffle the list of cards
    shuffle(cards);
    
    let html = "";
    cards.forEach(function (item) { //loop through each card and create its HTML
        html += `<li class="card"><i class="fa fa-${item} fa-2x"></i></li>`;
    });

    // add html (the cards) to index.html
    document.getElementById("deck").innerHTML = html;

    //set up the event listener for a card
    $("ul").on('click', 'li', function () {
        if (!$(this).hasClass("open") && !$(this).hasClass("match") && !$(this).hasClass("wrong") && openCards.length <= 1) { // check if a tile already is clicked or if the user already clicked 2 cards.
            showCard(this);
            OpenCard($(this).html());
        }
    });

}

// add classes to card so the symbol will show up.
function showCard(card) {
    $(card).addClass("open show");
}

function OpenCard(card) {
    openCards.push(card);
    if(openCards.length === 1 && moves === 0){
        // start gimeTimer when first card is clicked.
        gameTimer();
    }
    if (openCards.length === 2) {
        if (openCards[0] === card) {
            setTimeout(cardsMatch, 200);
            goodCards += 2;
            if (goodCards === 16) {
                // all cards are guested right
                setTimeout(finished, 500);
            }
        } else {
            cardsWrong();
            wrongGuess+=1;
            setTimeout(cardsClose, 2000);
        }
        addMoves();
        checkWrongGuess();
    }

}

function cardsClose() {
    $(".open").toggleClass("open").removeClass("wrong");
    openCards.length = 0; // set openCards to zero so the user can pick a new card. It's on purpose at this spot, after te setTimeout otherwise the user can pick more than 2 cards in one turn.
}

function cardsWrong() {
    $(".open").toggleClass().delay(10).addClass("card open wrong").effect("shake");
}

function cardsMatch() {
    $(".open").toggleClass().addClass("card match").effect("pulsate");
    openCards.length = 0;// set openCards to zero so the user can pick a new card. It's on purpose at this spot, after te setTimeout otherwise the user can pick more than 2 cards in one turn.
}

function addMoves() {
    moves++;
    $(".moves").text(moves);
    if (moves === 1) {
        $(".movesText").text("move");
    } else {
        $(".movesText").text("moves");
    }
}

function checkWrongGuess(){
    // after 5 of 10 wrong guesses, a star will be removed.
    if(wrongGuess === 5){
        $('.stars li:nth-child(3)').removeClass("gold");
    } else if(wrongGuess === 10) {
        $('.stars li:nth-child(2)').removeClass("gold");
    }
}

function finished() {
    $('.container').fireworks({
        opacity: 0.9,
        height: '100%',
        width: '100%'
    });
    $(".turn").text(moves);
    $(".time").html($("#timer").html());
    $(".star").html($(".stars").html());
    setTimeout(showScoreboard, 4000);
}

function showScoreboard() {
    $('.finish').fadeIn(500).removeClass("noShow").on('click', function () {
        location.reload();
    });
}

// timer function from: https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
function gameTimer(){
    let minutesLabel = document.getElementById("minutes");
    let secondsLabel = document.getElementById("seconds");
    let totalSeconds = 0;
    setInterval(setTime, 1000);

    function setTime()
    {
        ++totalSeconds;
        secondsLabel.innerHTML = pad(totalSeconds%60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
    }

    function pad(val)
    {
        let valString = val + "";
        if(valString.length < 2)
        {
            return "0" + valString;
        }
        else
        {
            return valString;
        }
    }
}

// when clicked on the restart button, page reload so init() will run again.
$(".restart").on('click', function () {
    location.reload();
});

init();