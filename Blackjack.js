//varibles 
let deck = []
let deck2 = []
let dealersHand = []
let playersHand = []
let playerTotal = 0
let dealerTotal = 0
let playersCash = 1000
let bet = 100
let stayClick 
let cardToRemove


// Event listeners

document.getElementById('deal').addEventListener('click', handleClickDeal)
document.getElementById('hit').addEventListener('click', handleClickHit)
document.getElementById('stay').addEventListener('click', handleClickStay)
// document.getElementById('5').addEventListener('click', handleClick5)
// document.getElementById('10').addEventListener('click', handleClick10)
// document.getElementById('25').addEventListener('click', handleClick25)
document.getElementById('bet').addEventListener('click', handleClickBet)
// const messageEl = document.getElementById('message')
//add event listener for when the player or dealer wins



// Functions

// Initialize deck 1 with array of 52 cards 

init()
function init() {
  deck = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
  
  // render()
  // updateMessage()
  // renderInitialMessage()
}

//Functions 
// function render(){
//   updateMessage()
// }

// function renderInitialMessage() {
//   messageEl.textContent = "Welcome to Black Jack"
// }

// function updateMessage(){
//   if (dealerTotal = ) {
  
//     messageEl.textContent = "You win!"
//   } else if (dealerTotal > playerTotal && dealerTotal <= 21) {
//     messageEl.textContent = "Dealer wins!"
//   } else if (playerTotal === dealerTotal) {
//     messageEl.textContent = "It's a wash!"
//   } else if (playerTotal > 21) {
//     messageEl.textContent = "Bust!"
//   } else if (dealerTotal > 21 && playerTotal <= 21) {
//     messageEl.textContent = "You win!"
//   }
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
        if (dealerTotal === 21 && playerTotal < 21) {
          alert("dealer wins")
          winner()
        }
      }
      // render(cardPicked)
    }
  }
}
// if the player has 2 cards and clicks hit then a card will be added to the players hand
//once players total is greater than 21 the player cannot hit anymore.
function handleClickHit() {
  if (stayClick){
    alert ("cant hit after stay")
    return 
  }  
  if (dealerTotal === 21 && playerTotal < 21) {
    alert("dealer wins")
    winner()
    return 
  }
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
  stayClick = true
  if (playersHand.length >= 2 && playerTotal <= 21) {
    while (dealerTotal < 17) {
      let randIdx = Math.floor(Math.random() * deck.length)
      let cardPicked = deck.splice(randIdx, 1)[0]
      dealersHand.push(cardPicked)
      calculateScore()
    }
    winner()
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
    winner()
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
    winner()
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

//function to declare a winner, loser, or tie
function winner(){
  if (playerTotal > dealerTotal && playerTotal <= 21 || dealerTotal > 21) {
    alert("You win!")
    if (playerTotal === 21) {
      bet = bet * 2.5
    } else {
      bet = bet * 2
    } 
    playersCash = playersCash + bet
  } else if (dealerTotal > playerTotal) {
    alert("Dealer wins!")
    playersCash = playersCash - bet
  } else if (playerTotal === dealerTotal) {
    alert("It's a wash!")
    playersCash = playersCash + bet
  } 
  //push player and dealer hands to deck2
    deck2.push(playersHand, dealersHand)
    playersHand=[]
    dealersHand=[]
    // playersHand.splice(0, playersHand.length)
    // dealersHand.splice(0, dealersHand.length)
  //clear player and dealer hands
  //clear player and dealer totals
}


//function for placing a bet
function handleClickBet() {
  if (playersCash > 0) {
    if (bet > playersCash) {
      alert("You don't have enough money to bet that much")
    } else {
      playersCash = playersCash - bet
      // bet = bet * 2
      bet.textContent = bet
      // cash.textContent = playersCash
    }
  } else {
    alert("You're out of money")
  }
}





