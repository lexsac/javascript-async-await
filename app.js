// // Part 1: Number Facts

let API_URL = 'http://numbersapi.com';

// // 1)
// // Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API. Details.

let favoriteNum = 6;
async function ourFirstPromise() {
    let res = await axios.get(`${API_URL}/${favoriteNum}?json`);
    console.log(res.data.text);
} 

ourFirstPromise();

// // 2)
// // Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

let multipleNums = [8,16,24,32];
async function ourSecondPromise() {
    let res = await axios.get(`${API_URL}/${multipleNums}`);
    console.log(res.data);
}

ourSecondPromise();

// // 3)
// // Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.
// // (Note: You’ll need to make multiple requests for this.)

async function ourThirdPromise() {
    let fact1Promise = axios.get(`${API_URL}/${favoriteNum}/`);
    let fact2Promise = axios.get(`${API_URL}/${favoriteNum}/`);
    let fact3Promise = axios.get(`${API_URL}/${favoriteNum}/`);
    let fact4Promise = axios.get(`${API_URL}/${favoriteNum}/`);
  
    let f1 = await fact1Promise;
    let f2 = await fact2Promise;
    let f3 = await fact3Promise;
    let f4 = await fact4Promise;
  
    console.log(`The first fact: ${f1.data}`);
    console.log(`The second fact: ${f2.data}`);
    console.log(`The third fact: ${f3.data}`);
    console.log(`The fourth fact: ${f4.data}`);
  }
  
  ourThirdPromise();

// Part 2: Deck of Cards

let DECK_API_URL = 'https://deckofcardsapi.com/api/deck';

// 1)
// Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
    
async function singleCard() {
    let res = await axios.get(`${DECK_API_URL}/new/draw`);
    let { suit, value } = res.data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
} 

singleCard();

// 2)
// Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.
   
async function twoCards() {
    let firstCard = await axios.get(`${DECK_API_URL}/new/draw/`);
    let deckId = firstCard.data.deck_id;
    let secondCard = await axios.get(`${DECK_API_URL}/${deckId}/draw/`);
    [firstCard.data, secondCard.data].forEach(card => {
      let { suit, value } = card.cards[0];
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    });
  }

twoCards();

// 3)
// Once you have both cards, console.log the values and suits of both cards.
   
// please see above - I printed both cards to the console.

// 4)
// Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

async function cardGame() {
    let $btn = $('button');
    let $cardArea = $('#card-area');

    let deckData = await axios.get(`${DECK_API_URL}/new/shuffle/`);
    let deckId = deckData.data.deck_id;

    $btn.show().on('click', async function() {
      let cardData = await axios.get(`${DECK_API_URL}/${deckId}/draw/`);
      let cardSrc = cardData.data.cards[0].image;
      $cardArea.append(
        $('<img>', {
          src: cardSrc
        })
      );
      if (cardData.data.remaining === 0) $btn.remove();
    });
  }

  cardGame();