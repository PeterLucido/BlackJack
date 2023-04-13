let deck = []
let deck2 = []
let dealersHand = []
let playersHand = []
let playerTotal = 0
let dealerTotal = 0
let playersCash
let bet = 0
let bettotal = 0
let stayClick 
let cardToRemove 
let cardsInPlay =[]
let gameOver

let deckEl = document.getElementById('deck')
let deck2El = document.getElementById('deck2')
let playersHandEl = document.getElementById('playersHand')
let dealersHandEl = document.getElementById('dealersHand')
let fiveBtnEl = document.getElementById('bet5')
let tenBtnEl = document.getElementById('bet10')
let twentyFiveBtnEl = document.getElementById('bet25')
let cashEl = document.getElementById('cash')
let resetEl = document.getElementById('reset')
const cardEl = document.getElementById('card')
const messageEl = document.getElementById('message')
const betEl = document.getElementById('bettotal')

document.getElementById('deal').addEventListener('click', handleClickDeal)
document.getElementById('hit').addEventListener('click', handleClickHit)
document.getElementById('stay').addEventListener('click', handleClickStay)
document.getElementById('bet5').addEventListener('click', handleClick5)
document.getElementById('bet10').addEventListener('click', handleClick10)
document.getElementById('bet25').addEventListener('click', handleClick25)
document.getElementById('reset').addEventListener('click', init)

init()
function init() {
  deck = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
  messageEl.textContent = "Let's Play!"
  playersCash = 1000
  gameOver = false
  deck2 = []
  bet = 0
  bettotal = 0
  stayClick = false
  cardToRemove = null
  cardsInPlay = []
  cashEl.textContent = playersCash
  betEl.textContent = bettotal
  fiveBtnEl.disabled = false
  tenBtnEl.disabled = false
  twentyFiveBtnEl.disabled = false
  removeCards()
}


function renderCardsDeal(){
  let playersCard1 = document.createElement('div')
  let playersCard2 = document.createElement('div')
  let dealersCard1 = document.createElement('div')
  let dealersCard2 = document.createElement('div')

  dealersCard1.setAttribute("class", `card large back-blue`)
  dealersCard2.setAttribute("class", `card large ${dealersHand[1]}`)
  playersCard1.setAttribute("class", `card large ${playersHand[0]}`)
  playersCard2.setAttribute("class", `card large ${playersHand[1]}`)

  let dealerCardsEl = document.getElementById("dealer-hand")
  let playerCardsEl = document.getElementById("player-hand")

  dealerCardsEl.append(dealersCard1)
  dealerCardsEl.append(dealersCard2)
  playerCardsEl.append(playersCard1)
  playerCardsEl.append(playersCard2)
}

function renderCardsHit(){
  let z = document.createElement('div')
  z.setAttribute("class", `card large ${playersHand[playersHand.length-1]}`)
  let y = document.getElementById("player-hand")
  y.append(z)
}

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
  deckFill()
}

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
      messageEl.textContent = "You busted!"
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
    if (dealersHand.length >= 2 && dealerTotal <= 21) {
      renderCardsStay()
    }
    renderCardsStay()
    if (playersHand.length === 2 && playerTotal === 21){
      winner()
      return
    }
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

function calculateScore() { 
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
    messageEl.textContent = "You bust!"
    betEl.textContent = 0
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
    messageEl.textContent = "The dealer busted you win!"
    betEl.textContent = 0
  }
  handleClickDeal()
}

function cardValues(card) {
  if (card[1] === "A") {
    return 1
  } else if (card[1] === "Q" || card[1] === "K" || card[1] === "J" || card[1] === "1") {
    return 10
  } else {
    return parseInt(card[2])
  }
}

function winner(){
  if (dealerTotal === 21 && dealersHand.length === 2) {
    betEl.textContent = 0
    cashEl.textContent = playersCash - bet
    messageEl.textContent = "The dealer got Black Jack! You lose."
    cashCheck()
    deck2.push(...playersHand, ...dealersHand)
    playersHand=[]
    dealersHand=[]
    bet = 0
    return
  } else if (playerTotal === 21 && playersHand.length === 2) {
    betEl.textContent = 0
    playersCash = playersCash + bet * 2.5
    cashEl.textContent = playersCash
    messageEl.textContent = "Black Jack!"
    deck2.push(...playersHand, ...dealersHand)
    playersHand=[]
    dealersHand=[]
    bet = 0
    return
  } else {
    if (playerTotal === dealerTotal) {
      bet = bet
      betEl.textContent = 0
      playersCash = playersCash
      cashEl.textContent = playersCash 
      messageEl.textContent = "Push!"
    }
  }
  if (playerTotal > dealerTotal && playerTotal <= 21 || dealerTotal > 21) {
    if (playerTotal > 21){
      betEl.textContent = 0
      playersCash = playersCash - bet
      cashEl.textContent = playersCash
      messageEl.textContent = "You busted!"
      cashCheck()
    } else {
      playersCash = playersCash + bet
      cashEl.textContent = playersCash
      messageEl.textContent = "You win!"
    } 
    betEl.textContent = 0
    playersCash = playersCash + bet
    cashEl.textContent = playersCash
  } else if (dealerTotal > playerTotal && dealerTotal <= 21) {
    messageEl.textContent = "You lose!"
    betEl.textContent = 0
    playersCash = playersCash - bet
    cashCheck()
    cashEl.textContent = playersCash
  } else if (playerTotal === dealerTotal) {
    messageEl.textContent = "Push!"
    betEl.textContent = 0
    playersCash = playersCash + 0
    cashEl.textContent = playersCash
  } else if (dealerTotal > 21) {
    messageEl.textContent = "The dealer busted. You win!"
    betEl.textContent = 0
    playersCash = playersCash + bet
    cashEl.textContent = playersCash
    
  }
    deck2.push(...playersHand, ...dealersHand)
    playersHand=[]
    dealersHand=[]
    bet = 0
}

function cashCheck (){
  if (playersCash - bet <= 0){
    gameOver = true
    messageEl.textContent = "You're out of money please reset the game."
    fiveBtnEl.disabled = true
    tenBtnEl.disabled = true
    twentyFiveBtnEl.disabled = true
  }
}

fiveBtnEl.addEventListener("click", function () {
  if (playersCash >= 5){
    betEl.textContent = parseInt(betEl.textContent) + 5
    playersCash = playersCash - 5
    cashEl.textContent = playersCash
  }
  if (playersCash < 5){
    fiveBtnEl.disabled = true
  }
})

tenBtnEl.addEventListener("click", function () {
  if (playersCash >= 10){
    betEl.textContent = parseInt(betEl.textContent) + 10
    playersCash = playersCash - 10
    cashEl.textContent = playersCash
  }
  if (playersCash < 10){
    tenBtnEl.disabled = true
  }
})

twentyFiveBtnEl.addEventListener("click", function () {
  console.log(playersCash)
  if (playersCash >= 25){
    betEl.textContent = parseInt(betEl.textContent) + 25
    playersCash = playersCash - 25
    cashEl.textContent = playersCash
  }
  if (playersCash < 25){
    twentyFiveBtnEl.disabled = true
  }
})

resetEl.addEventListener("click", function () {
  betEl.textContent = 0
})

function handleClick5(){
  bet = bet + 5
  betEl.textContent
}

function handleClick10(){
  bet = bet + 10
  betEl.textContent
}

function handleClick25(){
  bet = bet + 25
  betEl.textContent
}

function deckFill(){
  if (deck.length <= 6){
    deck.push(...deck2)
    deck2 = []
  }
}
