function init() {
    //  Create a list that holds all of your cards based on there font-awesome name.

    var cards = ['facebook', 'facebook', 'twitter', 'twitter', 'twitch', 'twitch', 'instagram', 'instagram', 'pied-piper-pp', 'pied-piper-pp', 'snapchat', 'snapchat', 'youtube', 'youtube', 'google-plus', 'google-plus'];

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

    shuffle(cards); // shuffle the list of cards

    let html = "";
    cards.forEach(function (item) { //loop through each card and create its HTML
        html += `
    <li class="card">
      <i class="fa fa-${item}"></i>
    </li>`;
    });
    document.getElementById("deck").innerHTML = html; // add html (the cards) to index.html

};
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

init();