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


// Functions

// Initialize deck 1 with array of 52 cards 

function init() {
  deck = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
}

//Functions 

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
function handleClickHit() {
  if (playersHand.length >= 2) {
    let randIdx = Math.floor(Math.random() * deck.length)
    let cardPicked = deck.splice(randIdx, 1)[0]
    playersHand.push(cardPicked)
    calculateScore()
  } else {
    //make it to where after i hit stay I cant hit again
    
  
    
  }
}
// create a function that will allow the player to stay with the cards they have and then have the dealer pull cards until he is either equal to or greater than 17. 
function handleClickStay() {
  if (playersHand.length >= 2) {
    while (dealerTotal < 17) {
      let randIdx = Math.floor(Math.random() * deck.length)
      let cardPicked = deck.splice(randIdx, 1)[0]
      dealersHand.push(cardPicked)
      calculateScore()
    }
  } else {
    //make it so that the player must deal first without an alert
    
  }
}

// function to calculate the score of the player and dealer
function calculateScore() { 
  console.log(playersHand, "Player")
  console.log(dealersHand, "Dealer")
  playerTotal = 0
  dealerTotal = 0
  for (let i = 0; i < playersHand.length; i++) {
    playerTotal += cardValues(playersHand[i])
  } 
  if (playerTotal < 12) {
    for (let i = 0; i < playersHand.length; i++) {
      if (playersHand[i][1] === "A") {
        playerTotal += 10
      }
    }
  }
    if (playerTotal > 21) {
      alert("You busted")
    }
    for (let i = 0; i < dealersHand.length; i++) {
      dealerTotal += cardValues(dealersHand[i])
    }
    if (dealerTotal < 12) {
      for (let i = 0; i < dealersHand.length; i++) {
        if (dealersHand[i][1] === "A") {
          dealerTotal += 10
        }
      }
      if (dealerTotal > 21) {
        return ("Dealer Busted, you win!")
      }
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






// function render(cardPicked) {
//   if (deck.length > 1) {
//     deckEl.classList.remove(cardToRemove)
//   }
//   cardToRemove = cardPicked
//   dealersHand1El.classList.add(cardPicked)
// }

// function calculateScore() {


// function handleClick() {
//   if (deck1.length > 0) {
//   let randIdx = Math.floor(Math.random()* deck1.length)
//   let cardPicked = deck1.splice(randIdx, 1)[0]
//   console.log(deck1)
//   deck2.push(cardPicked)
//   // playersHand1.push(cardPicked)
//   playersHand2.push(cardPicked)
//   // dealersHand1.push(cardPicked)
//   // dealersHand2.push(cardPicked)
//   render(cardPicked)
//   }
// }

//  //render for the players first card
// function render(cardPicked) {

//     if (dealersHand2.length > 1) {
//       dealersHand2El.classList.remove(cardToRemove)
//     }
//     cardToRemove = cardPicked

//     dealersHand2El.classList.add(cardPicked)

//     if (deck1.length === 0) {
//     deck1El.classList.add('outline')
//     deck1El.classList.remove('back-gold')
//     }
// }






 
// // varible declarations
// let dealerSum = 0
// let playerSum = 0

// let dealerAceCount = 0
// let playerAceCount = 0

// let hidden
// let deck

// let canHit = true

// // Cached element references
// window.onload = function() {
//   buildDeck()
//   shuffleDeck()
// }

// function buildDeck() {
//   let types = ["clubs", "diamonds", "hearts", "spades"]
//   let values = ["A", "r02", "r03", "r04", "r05", "r06", "r07", "r08", "r09", "r10", "J", "Q", "K"];
//   deck = []

//   for (let i = 0; i < types.length; i++) {
//     for (let j = 0; j < values.length; j++) {
//       deck.push(values[j] + "-" + types[i]);
//     }
//   }
//   console.log(deck)
// }

// function shuffleDeck() {
//   for(let i = 0; i < deck.length; i++) {
//     let j = Math.floor(Math.random() * deck.length)
//     let temp = deck[i]
//     deck[i] = deck[j]
//     deck[j] = temp
//   }
// }

// function startGame(){
//   hidden = deck.pop()
//   dealerSum += getValue(hidden)
//   dealerAceCount += checkAce(hidden)
  
//   while (dealerSum < 17) {
//     let cardImg = document.createElement("img")
//     let card = deck.pop()
//     cardImg.src = "images/" + card + ".svg"
//     dealerSum += getValue(card)
//     dealerAceCount += checkAce(card)
//     document.getElementById("dealer-cards").append(cardImg)
//   }
// }
// console.log(dealerSum)

// function getValue(card) {
//   let data = card.split("-")
//   let value = data[0]

//     if (isNaN(value)) {
//    if (value == "A") {
//      return 11
//    }
//     return 10
//   }
//   return parseInt(value)
// }

// function checkAce(card) {
//   if (card[0] == "A") {
//     return 1
//   }
//   return 0
// }
// Declare deck variables







































// function handleClick() {
//   if (deck1.length >= 4) {
//     if (playersHand1.length === 0) {
//       for (let i = 0; i < 2; i++) {
//         let randIdx = Math.floor(Math.random() * deck1.length)
//         let cardPicked = deck1.splice(randIdx, 1)[0]
//         dealersHand1.push(cardPicked)
//         dealersHand2.push('card-back')
//         let playerCard = deck1.splice(Math.floor(Math.random() * deck1.length), 1)[0]
//         playersHand1.push(playerCard)
//         playersHand2.push(playerCard)
//         render(playerCard)
//         calculateScore()
//       }
//     } else {
//       let playerCard = deck1.splice(Math.floor(Math.random() * deck1.length), 1)[0]
//       playersHand1.push(playerCard)
//       playersHand2.push(playerCard)
//       render(playerCard)
//       calculateScore()
//     }
//     if (deck1.length <= 4) {
//       restart()
//     }
//   }
// }

// function dealCards(){
//   let rendomCard = Math.floor(Math.random() * deck1.length)
//   playersCards.push(rendomCard)
//   let randomCardIdx = deck.indexOf(rendomCard)
//   deck.splice(randomCardIdx, 1)
//   render(randomCard)
// }

// function calculateScore() {
//   playerScore = 0
//   for (let i = 0; i < playersHand1.length; i++) {
//     let card = playersHand1[i]
//     if (card[1] === 'A') {
//       playerScore += 11
//     } else if (card[1] === 'K' || card[1] === 'Q' || card[1] === 'J' || card.slice(1) === '10') {
//       playerScore += 10
//     } else {
//       playerScore += parseInt(card[1])
//     }
//   }
//   if (playerScore > 21) {
//     for (let i = 0; i < playersHand1.length; i++) {
//       if (playersHand1[i][1] === 'A') {
//         playerScore -= 10
//         if (playerScore <= 21) {
//           break
//         }
//       }
//     }
//   }
// }

