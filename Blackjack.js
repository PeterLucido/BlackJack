//varibles 
let deck = []
let deck2 = []
let dealersHand = []
let playersHand = []
let playerTotal = 0
let dealerTotal = 0
let playersCash = 1000
let bet = 0
let stayClick 
let cardToRemove 
let cardsInPlay =[]
// const renderDeck = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]


let deckEl = document.getElementById('deck')
let deck2El = document.getElementById('deck2')
let playersHandEl = document.getElementById('playersHand')
let dealersHandEl = document.getElementById('dealersHand')
let fiveBtnEl = document.getElementById('bet5')
let tenBtnEl = document.getElementById('bet10')
let twentyFiveBtnEl = document.getElementById('bet25')
let betTotalEl = document.getElementById('bettotal')




function renderCardsDeal(){
  let x = document.createElement('div')
  let z = document.createElement('div')
  let A = document.createElement('div')
  let B = document.createElement('div')
  A.setAttribute("class", `card large ${dealersHand[0]}`)
  B.setAttribute("class", `card large ${dealersHand[1]}`)
  z.setAttribute("class", `card large ${playersHand[1]}`)
  x.setAttribute("class", `card large ${playersHand[0]}`)
  let c = document.getElementById("dealer-hand")
  let y = document.getElementById("player-hand")
  c.append(A)
  c.append(B)
  y.append(x)
  y.append(z)
}





// write a function that will render a new card to the players hand
function renderCardsHit(){
  let z = document.createElement('div')
  z.setAttribute("class", `card large ${playersHand[playersHand.length-1]}`)
  let y = document.getElementById("player-hand")
  y.append(z)
}

//render the dealers hand
function renderCardsStay(){
  // let A = document.createElement('div')
  let B = document.createElement('div')
  // A.setAttribute("class", `card large ${dealersHand[0]}`)
  B.setAttribute("class", `card large ${dealersHand[dealersHand.length-1]}`)
  let c = document.getElementById("dealer-hand")
  // c.append(A)
  c.append(B)
}

function removeCards() {
  let x = document.getElementById("player-hand")
  let y = document.getElementById("dealer-hand")
  x.innerHTML = ''
  y.innerHTML = ''
  dealersHand = []
  playersHand = []
  playerTotal = 0
  dealerTotal = 0
  // dealersHandEl.innerHTML = ''
  // playersHandEl.innerHTML = ''
}



const cardEl = document.getElementById('card')
const messageEl = document.getElementById('message')
const betEl = document.getElementById('bettotal')


document.getElementById('deal').addEventListener('click', handleClickDeal)
document.getElementById('hit').addEventListener('click', handleClickHit)
document.getElementById('stay').addEventListener('click', handleClickStay)
document.getElementById('bet5').addEventListener('click', handleClick5)
document.getElementById('bet10').addEventListener('click', handleClick10)
document.getElementById('bet25').addEventListener('click', handleClick25)
document.getElementById('reset').addEventListener('click', handleClickReset)
// Initialize deck 1 with array of 52 cards 

init()
function init() {
  deck = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
}


function handleClickDeal(){
  stayClick = false
  if (deck.length >= 4) {
    messageEl.textContent = "Place your bets!"
    if (playersHand.length === 0 && bet > 0) {
      removeCards()
      for (let i = 0; i < 2; i++) {
        let randIdx = Math.floor(Math.random() * deck.length)
        let cardPicked = deck.splice(randIdx, 1)[0]
        dealersHand.push(cardPicked)
        let playerCard = deck.splice(Math.floor(Math.random() * deck.length), 1)[0]
        playersHand.push(playerCard)
        calculateScore()
        if (dealerTotal === 21 && playerTotal < 21) {
          winner()
        }
      }
      renderCardsDeal()
    }
  }
  
}
//remove the cards rendered when the player clicks deal again


// if the player has 2 cards and clicks hit then a card will be added to the players hand
//once players total is greater than 21 the player cannot hit anymore.
function handleClickHit() {
  if (playersHand.length >= 2 && playerTotal < 21) { 
    let randIdx = Math.floor(Math.random() * deck.length)
    let cardPicked = deck.splice(randIdx, 1)[0]
    playersHand.push(cardPicked)
    renderCardsHit()
    calculateScore()
    if (playersHand > 21){
      messageEl.textContent = "You bust!"
      return
    }
      if (stayClick){
        messageEl.textContent = "You can't hit after you stay"
        return 
      }  
      if (dealerTotal === 21 && playerTotal < 21) {
        messageEl.textContent = "Dealer wins"
        return 
    }
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
      renderCardsStay()
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
    winner()
  }
  console.log(playersHand, "Player")
  console.log(dealersHand, "Dealer")
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

function checkBlackjack() {
  if (dealersHand.length === 2 && dealerTotal === 21) {
    gameOver = true;
    playerWon = false;
    messageEl.textContent = "Dealer has Blackjack. You lose!";
    return true;
  }
  if (playersHand.length === 2 && playerTotal === 21) {
    gameOver = true;
    playerWon = true;
    messageEl.textContent = "Blackjack! You win!";
    return true;
  }
  return false;
}

//function to declare a winner, loser, or tie
function winner(){
  if (playerTotal > dealerTotal && playerTotal <= 21 || dealerTotal > 21) {
    if (playerTotal === 21 && playersHand.length === 2) {
      bet = bet * 2.5
    } else {
      bet = bet * 2
    } 
    playersCash = playersCash + bet
  } else if (dealerTotal > playerTotal && dealerTotal <= 21) {
    messageEl.textContent = "You lose!"
    playersCash = playersCash - bet
  } else if (playerTotal === dealerTotal) {
    messageEl.textContent = "Push!"
    playersCash = playersCash + bet
  } 
    deck2.push(playersHand, dealersHand)
    playersHand=[]
    dealersHand=[]
    bet = 0
}



//function for placing a bet
function handleClickBet() {
  if (playersCash > 0) {
    if (bet > playersCash) {
      messageEl.textContent = "You don't have enough money please add more money"
    } else {
      playersCash = playersCash - bet
      bet.textContent = bet
    }
  } else {
    messageEl.textContent = "You are out of money please add more money"
  }
}

//function to place bets
function handleClick5(){
  betEl.textContent
  bet = bet + 5
  console.log(bet)
}

fiveBtnEl.addEventListener("click", function (evt) {
  betTotalEl.textContent = parseInt(betTotalEl.textContent) + 5
})

tenBtnEl.addEventListener("click", function (evt) {
  betTotalEl.textContent = parseInt(betTotalEl.textContent) + 10
})

twentyFiveBtnEl.addEventListener("click", function (evt) {
  betTotalEl.textContent = parseInt(betTotalEl.textContent) + 25
})

function handleClick10(){
  bet = bet + 10
  console.log(bet)
}

function handleClick25(){
  bet = bet + 25
  console.log(bet)
}



function handleClickReset(){
  deck = []
  deck2 = []
  dealersHand = []
  playersHand = []
  playerTotal = 0
  dealerTotal = 0
  playersCash = 1000
  bet = 0
  stayClick = false
  cardToRemove = null
  cardsInPlay = []
  removeCards()
  init()
}



