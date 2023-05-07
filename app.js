const player = {
  money: 10000,
  clickMultiplier: 1,
  rollingLevel: 1,
  assistantRoller: 0,
  bpc: 1,
}

const game = {
  clickCount: 0,
  level: 1,
  timer: 15,
  demand: 10,
  multiplier: 1,
  started: false,
  debuff: 0,
  loop: null,
  levelProgress: 0,
  timeremaining: 0,
}

const upgrades = [  
  {
    name: "rolling",
    price: 50,
    level: 0,
    bpc: 1
  },
  {
    name: "tecate",
    price: 200,
    quantity: 0,
    bpc: 3,
  },
  {
    name: "chancla",
    price: 300,
    level: 0,
    bpc: 6
  },

  {
    name: "assistant",
    price: 1000,
    isPurchased: false,
    level: 0,
    auto: 0,
    loop: 0
  },
]

const levelUp = [
  {
    gif: "burrito_pup.gif",
  },
  {
    gif: "burritorub.gif",
  },
  {
    gif: "iwantaburrito.gif",
  },
  {
    gif: "burrito-forever.gif",
  }
]
// SECTION

// INTERVAL and start stop FUNCTIONS

function startGame() {
  game.timer = 10
  game.started = true
  let buttonElem = document.getElementById("btn-start")
  buttonElem.disabled = true
  loadMusic()
  game.loop = setInterval(gameLoop, 1000)
  console.log(game.loop)
}

function resetGame() {
  playSound("game-over")
  upgrades[3].auto = 0
  game.started = false
  game.timer = 10
  hideItem("upgrade-tecate")
  hideItem("upgrade-chancla")
  hideItem("upgrade-assistant")
  player.money = 0
  game.level = 1

  clearInterval(upgrades[3].loop)
  clearInterval(game.loop)
  clearInterval
  resetUpgrades()
  let buttonElem = document.getElementById("btn-start")
  buttonElem.disabled = false
  alert("game over")
}

function assistantLoop(){
  let bpc = upgrades[3].auto * upgrades[3].level
  player.money += bpc
  
}

// SECTION // GAME LOGIC

function gameLoop() {
  if (game.started) {
    game.timer--
    game.started = game.timer <= 0 ? false : true
  } else {
    game.timer = 0
    drawStats()
    resetGame()
  }
  console.log(game.timer)
  drawStats()
}

function rollBurrito() {
  if (game.started) {
    const clickMultiplier = player.clickMultiplier
    const clicks = 1 * clickMultiplier
    game.clickCount += clicks
    playSound("click")
    player.money += player.bpc 
    drawStats()
    drawProgressBar()
  }
}
function buyUpgrade(upgradeName){
  let upgrade = upgrades.find(upg => upg.name == upgradeName)
  if (player.money >= upgrade.price) {
    player.money -= upgrade.price
    playSound("cash-register")
    upgrade.level++
    upgrade.price *= 2    
  }

}

function upgradeBurritoRolling(){
  // index 0
  if (player.money >= upgrades[0].price){
    playSound("cash-register")
    player.money -= upgrades[0].price,
    upgrades[0].price += 50
    console.log(upgrades[0].price)
    player.bpc++
    drawStats()
  } else {
    console.log("not enough cash")
  }
}

function upgradeDrinkTecate(){
  if (player.money >= upgrades[1].price){
    showItem("upgrade-tecate")
    playSound("cash-register")
    player.money -= upgrades[1].price
    upgrades[1].price += 200
    console.log(upgrades[1].price)
    player.bpc += 2
    drawStats()
  } else {
    console.log("not enough cash")
  }
}
function upgradeChanclaPower(){
  if (player.money >= upgrades[2].price){
    showItem("upgrade-chancla")
    playSound("cash-register")
    player.money -= upgrades[2].price
    upgrades[2].price += 300
    player.bpc += 2
    drawStats()
  } else {
    console.log("not enough cash")
  }
}
function upgradeTortillaMaker(){
  if (upgrades[3].auto <= 0) {
    upgrades[3].auto = 50
  }
  
  console.log(upgrades[3].loop)
  
  clearInterval(upgrades[3].loop)
  
  
  
  if (player.money >= upgrades[3].price){
    upgrades[3].level++
    showItem("upgrade-assistant")
    playSound("cash-register")
    upgrades[3].loop = setInterval(assistantLoop, 3000)
    player.money -= upgrades[3].price
    upgrades[3].price += upgrades[3].price
    upgrades[0].isPurchased = true
    drawStats()
  } else {
    console.log("not enough cash")
  }
}

function resetUpgrades(){
  player.money = 0
  upgrades[0].isPurchased = false
  upgrades[1].level = 0
  upgrades[2].level = 0
  upgrades[3].level = 0
  upgrades[0].price = 50
  upgrades[1].price = 200
  upgrades[2].price = 300
  upgrades[3].price = 1000
  drawStats()
}
function increaseLevel() {
  // if (document.getElementById("level-up").display == "none")
  random = randomNumber(0,3)
  document.getElementById("level-up").innerHTML = `<img id="level-up-gif" class="img-fluid p-2" src="assets/levelup/${levelUp[random].gif}" alt="" />`
  console.log(levelUp[random].gif);
  showItem("level-up-gif")
  if (game.level == 10) {
    player.clickMultiplier = 1.5
  } else if (game.level == 15) {
    player.clickMultiplier = 2
  } else if (game.level == 15){
    player.clickMultiplier = 3
  }
  
  game.level++
  game.demand += 5
  game.clickCount = 0
  game.timer = 30
  console.log(game.level, game.demand)
  if (game.level > 5) {
    console.log(game.demand)
    game.demand += 20
  }
}


// SECTION
// DRAW FUNCTIONS AND DOM MANIPULATION

function drawStats() {
  let bpc = upgrades[3].auto * upgrades[3].level
    document.getElementById("level").textContent = game.level
    document.getElementById("money").textContent = player.money
    document.getElementById("time-remaining").textContent = game.timer
    // document.getElementById("click-power").textContent = player.clickMultiplier
    document.getElementById("click-multiplier").textContent = player.clickMultiplier
    document.getElementById("auto-assist").textContent = bpc
    document.getElementById("bpc").textContent = player.bpc
    document.getElementById("upg1-price").textContent = upgrades[0].price
    document.getElementById("upg2-price").textContent = upgrades[1].price
    document.getElementById("upg3-price").textContent = upgrades[2].price
    document.getElementById("upg4-price").textContent = upgrades[3].price
  
}

function drawProgressBar() {
  let percentage = (game.clickCount / game.demand) * 100
  console.log(game.demand, " this is", percentage);
  document.getElementById("progress-bar").style.width = percentage + "%"
  if (percentage >= 100) {
    document.getElementById("progress-bar").style.width = "100%"
    increaseLevel()
    percentage = 0

    document.getElementById("progress-bar").style.width = "0%"
  }
}

function hideItem(elementID) {
  element = document.getElementById(elementID)
    element.setAttribute("hidden", "")
}

function showItem(elementID){
  element = document.getElementById(elementID)
  element.style.display = 'block'
}



function playSound(soundId) {
  document.getElementById(soundId).play()
}

function loadMusic(){
  document.getElementById("music").play()
}
// SECTION MATH FUNCTIONS

function randomNumber(min, max) {
  console.log("randomNumber")
  const randomNumber = Math.floor(Math.random() * (max - min + 1))
  return randomNumber
}
