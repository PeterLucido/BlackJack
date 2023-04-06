//varibles 
let deck = []
let deck2 = []
let dealersHand = []
let playersHand = []
let playerTotal = 0
let dealerTotal = 0
let playersCash = 1000
let bet = 0
let bettotal = 0
let stayClick 
let cardToRemove 
let cardsInPlay =[]

let deckEl = document.getElementById('deck')
let deck2El = document.getElementById('deck2')
let playersHandEl = document.getElementById('playersHand')
let dealersHandEl = document.getElementById('dealersHand')
let fiveBtnEl = document.getElementById('bet5')
let tenBtnEl = document.getElementById('bet10')
let twentyFiveBtnEl = document.getElementById('bet25')
let betTotalEl = document.getElementById('bettotal')
let cashlEl = document.getElementById('cash')
let resetEl = document.getElementById('reset')

function renderCardsDeal(){
  let x = document.createElement('div')
  let z = document.createElement('div')
  let A = document.createElement('div')
  let B = document.createElement('div')
  A.setAttribute("class", `card large ${dealersHand[0]}`)
  B.setAttribute("class", `card large ${dealersHand[1]}`)
  x.setAttribute("class", `card large ${playersHand[0]}`)
  z.setAttribute("class", `card large ${playersHand[1]}`)
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
  let c = document.getElementById("dealer-hand")
  c.innerHTML = ''
  for (let i = 0; i < dealersHand.length; i++) {
    let b = document.createElement('div')
    b.setAttribute("class", `card large ${dealersHand[i]}`)
    c.append(b)
  }
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
}

const cardEl = document.getElementById('card')
const messageEl = document.getElementById('message')
const betEl = document.getElementById('bettotal')
const cashEl = document.getElementById('cash')

document.getElementById('deal').addEventListener('click', handleClickDeal)
document.getElementById('hit').addEventListener('click', handleClickHit)
document.getElementById('stay').addEventListener('click', handleClickStay)
document.getElementById('bet5').addEventListener('click', handleClick5)
document.getElementById('bet10').addEventListener('click', handleClick10)
document.getElementById('bet25').addEventListener('click', handleClick25)
document.getElementById('reset').addEventListener('click', handleClickReset)

init()
function init() {
  deck = ["♦A","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
  messageEl.textContent = "Let's Play!"
}

function handleClickDeal(){
  stayClick = false
  if (deck.length > 4) {
    if (playersHand.length === 0 && bet > 0) {
      removeCards()
      for (let i = 0; i < 2; i++) {
        let randIdx = Math.floor(Math.random() * deck.length)
        let cardPicked = deck.splice(randIdx, 1)[0]
        dealersHand.push(cardPicked)
        let playerCard = deck.splice(Math.floor(Math.random() * deck.length), 1)[0]
        playersHand.push(playerCard)
        calculateScore()
      }
      renderCardsDeal()
    }
  }
  messageEl.textContent = "Let's Play!"
}

// function checkBlackjack() {
//   if (dealersHand.length === 2 && dealerTotal === 21) {
//     messageEl.textContent = "Dealer has Blackjack. You lose!";
//     betTotalEl.textContent = 0
//     cashEl.textContent = playersCash - bet
//     return
//   }
//   if (playersHand.length === 2 && playerTotal === 21) {
//     messageEl.textContent = "Blackjack! You win!";
//     betTotalEl.textContent = 0
//     cashEl.textContent = playersCash + bet
//     return
//   }
// }

// if the player has 2 cards and clicks hit then a card will be added to the players hand
//once players total is greater than 21 the player cannot hit anymore.
function handleClickHit() {
  if (stayClick) {
    return
  }
  if (playersHand.length >= 2 && playerTotal < 21) { 
    let randIdx = Math.floor(Math.random() * deck.length)
    let cardPicked = deck.splice(randIdx, 1)[0]
    playersHand.push(cardPicked)
    renderCardsHit()
    calculateScore()
    if (playerTotal > 21){
      messageEl.textContent = "You bust!"
    playersHand=[]
    dealersHand=[]
    }
    if (stayClick){
      messageEl.textContent = "You can't hit after you stay"
      return
    }  
  }
}

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
  }
  winner()
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
    messageEl.textContent = "Bust!"
    betTotalEl.textContent = 0
    cashEl.textContent = playersCash - bet
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
    messageEl.textContent = "Dealer Bust You Win!"
    betTotalEl.textContent = 0
    cashEl.textContent = playersCash + bet
  }
  console.log(playersHand, "Player")
  console.log(dealersHand, "Dealer")
  handleClickDeal()
  // winner()
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


// function to declare a winner, loser, or tie
function winner(){
  if (playerTotal > dealerTotal && playerTotal <= 21 || dealerTotal > 21) {
    if (playerTotal === 21 && playersHand.length === 2) {
      bet = bet * 2.5
      betTotalEl.textContent = 0
      cashEl.textContent = playersCash + bet
      messageEl.textContent = "Black Jack!"
    } else {
      bet = bet * 2
      cashEl.textContent = playersCash + bet
      messageEl.textContent = "You win!"
    } 
    if (playerTotal > 21){
      betTotalEl.textContent = 0
      cashEl.textContent = playersCash - bet
      messageEl.textContent = "Player bust!"
    }
    betTotalEl.textContent = 0
    cashEl.textContent = playersCash + bet
  } else if (dealerTotal > playerTotal && dealerTotal <= 21) {
    messageEl.textContent = "You lose!"
    betTotalEl.textContent = 0
    cashEl.textContent = playersCash - bet
  } else if (playerTotal === dealerTotal) {
    messageEl.textContent = "Push!"
    betTotalEl.textContent = 0
    cashEl.textContent = playersCash + 0
  } else if (dealerTotal > 21) {
    messageEl.textContent = "Dealer busts! You win!"
    betTotalEl.textContent = 0
    cashEl.textContent = playersCash + bet
  }
    deck2.push(playersHand, dealersHand)
    playersHand=[]
    dealersHand=[]
    bet = 0
}

//function to place bets
fiveBtnEl.addEventListener("click", function (evt) {
  betTotalEl.textContent = parseInt(betTotalEl.textContent) + 5
})

tenBtnEl.addEventListener("click", function (evt) {
  betTotalEl.textContent = parseInt(betTotalEl.textContent) + 10
})

twentyFiveBtnEl.addEventListener("click", function (evt) {
  betTotalEl.textContent = parseInt(betTotalEl.textContent) + 25
})

resetEl.addEventListener("click", function (evt) {
  betTotalEl.textContent = 0
})

function handleClick5(){
  betEl.textContent
  bet = bet + 5
  console.log(bet)
}

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
  playersCash = []
  bet = 0
  bettotal = 0
  stayClick = false
  cardToRemove = null
  cardsInPlay = []
  removeCards()
  init()
}



