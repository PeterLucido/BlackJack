//varibles 
let deck = []
let dealersHand = []
let playersHand = []
let playerTotal = 0
let dealerTotal = 0

let cardToRemove


// Event listeners
init()

document.getElementById('deal').addEventListener('click', handleClickDeal)
document.getElementById('hit').addEventListener('click', handleClickHit)
document.getElementById('stay').addEventListener('click', handleClickStay)
const messageEl = document.getElementById('message')
//add event listener for when the player or dealer wins



// Functions

// Initialize deck 1 with array of 52 cards 

function init() {
  deck = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
  // render()
  // renderInitialMessage()
}

//Functions 
// function renderInitialMessage() {
//   messageEl.textContent = "Welcome to Black Jack"
// }

// function render(){
//   updateMessage()
// }


function handleClickDeal(){
  //function to deal 2 cards to the player and 2 cards to the dealer with one of the cards being face down to the dealer
  if (deck.length >= 4) {
    if (playersHand.length === 0) {
      for (let i = 0; i < 2; i++) {
        let randIdx = Math.floor(Math.random() * deck.length)
        let cardPicked = deck.splice(randIdx, 1)[0]
        dealersHand.push(cardPicked)
        // render(cardPicked)
        let playerCard = deck.splice(Math.floor(Math.random() * deck.length), 1)[0]
        playersHand.push(playerCard)
        // render(playerCard)
        calculateScore()
      }
      // render(cardPicked)
    }
  }
}
// if the player has 2 cards and clicks hit then a card will be added to the players hand
//once players total is greater than 21 the player cannot hit anymore.
function handleClickHit() {
  if (playersHand.length < 2 || playerTotal < 21) { 
    let randIdx = Math.floor(Math.random() * deck.length)
    let cardPicked = deck.splice(randIdx, 1)[0]
    playersHand.push(cardPicked)
    calculateScore()
  }
}

// create a function that will allow the player to stay with the cards they have and then have the dealer pull cards until he is either equal to or greater than 17. 
//make it to where after i hit stay I cant hit again
function handleClickStay() {
  if (playersHand.length >= 2 && playerTotal <= 21) {
    while (dealerTotal < 17) {
      let randIdx = Math.floor(Math.random() * deck.length)
      let cardPicked = deck.splice(randIdx, 1)[0]
      dealersHand.push(cardPicked)
      calculateScore()
    }
  }
}

// function to calculate the score of the player and dealer
function calculateScore() { 
  console.log(playersHand, "Player")
  console.log(dealersHand, "Dealer")
  playerTotal = 0
  dealerTotal = 0
  let aceCount = 0
  for (let i = 0; i < playersHand.length; i++) {
    playerTotal += cardValues(playersHand[i])
    if (playersHand[i][1] === "A") {
      aceCount++
    }
  } 
  if (playerTotal < 12 && aceCount > 0) {
    playerTotal += 10
  }
  if (playerTotal > 21) {
    alert('player busted')
  }
  aceCount = 0
  for (let i = 0; i < dealersHand.length; i++) {
    dealerTotal += cardValues(dealersHand[i])
    if (dealersHand[i][1] === "A") {
      aceCount++
    }
  }
  if (dealerTotal < 12 && aceCount > 0) {
    dealerTotal += 10
  }
  if (dealerTotal > 21) {
    alert('dealer busted')
  }
  console.log(playerTotal, "Player")
  console.log(dealerTotal, "Dealer")
}


// define the value of each card
function cardValues(card) {
  if (card[1] === "A") {
    return 1
  } else if (card[1] === "Q" || card[1] === "K" || card[1] === "J" || card[1] === "1") {
    return 10
  } else {
    return parseInt(card[2])
  }
}










