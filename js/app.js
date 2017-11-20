let openCards = [];
let moves =0;
function init() {
    //console.log(openCards);

    //  Create a list that holds all of your cards based on there font-awesome name.
    let cards = ['facebook', 'facebook', 'twitter', 'twitter', 'twitch', 'twitch', 'instagram', 'instagram', 'pied-piper-pp', 'pied-piper-pp', 'snapchat', 'snapchat', 'youtube', 'youtube', 'google-plus', 'google-plus'];


    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

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
    console.log(cards);

    let html = "";
    cards.forEach(function (item) { //loop through each card and create its HTML
        html += `<li class="card"><i class="fa fa-${item}"></i></li>`;
        //html += `<li class="card open show"><i class="fa fa-${item}"></i></li>`;
    });

    // add html (the cards) to index.html
    document.getElementById("deck").innerHTML = html;

    //set up the event listener for a card
    $("ul").on('click', 'li', function () {
        showCard(this);
        OpenCard($(this).html());
    });
}
// add classes to card so the symbol will show up.
function showCard(card) {
    $(card).addClass("open show");
}

function OpenCard(card) {
    openCards.push(card);
    console.log(openCards);
    if (openCards.length == 2) {
        if (openCards[0] == card) {
            setTimeout(cardsMatch,200);
            openCards.length = 0;
        } else {
            setTimeout(cardsClose,2000);
            openCards.length = 0;
        }
        addMoves();
    }

}

function cardsClose(){
    $(".open").toggleClass().addClass("card");
}

function cardsMatch(){
    $(".open").toggleClass().addClass("card match");
}

function addMoves() {
    moves++;
    $(".moves").text(moves);
    if(moves == 1){
        $(".movesText").text("move");
    } else {
        $(".movesText").text("moves");
    }
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// when clicked on the restart button, init() runs
$(".restart").on('click',function(){
    location.reload();
});

init();




//console.log(countInArray(openCards, "facebook")); // returns 2
//console.log(countInArray(list, 1)); // returns 3