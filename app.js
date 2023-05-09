const player = {
  money: 0,
  clickMultiplier: 1,
  rollingSkill: 1,
  assistantRoller: 0,
  bpc: 1,
}

const game = {
  clickCount: 0,
  level: 1,
  timer: 30,
  demand: 100,
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
    price: 35,
    level: 0,
    bpc: 1,
    quantity: 0,
    elem: "",
  },
  {
    name: "tecate",
    price: 200,
    level: 0,
    quantity: 0,
    elem: "",
  },
  {
    name: "chancla",
    price: 300,
    level: 0,
    bpc: 6,
    quantity: 0,
    elem: "",
  },

  {
    name: "assistant",
    price: 1000,
    level: 0,
    isPurchased: false,
    auto: 0,
    loop: 0,
    quantity: 0,
    elem: "",
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
  },
]
// SECTION

// INTERVAL and start stop FUNCTIONS

function startGame() {
  // game.timer = 30
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
  game.timer = 30
  player.clickMultiplier = 1
  hideItem("upgrade-tecate")
  hideItem("upgrade-chancla")
  hideItem("upgrade-assistant")
  player.money = 0
  game.level = 1
  let buttonElem = document.getElementById("btn-start")
  buttonElem.disabled = false
  clearInterval(upgrades[3].loop)
  clearInterval(game.loop)

  resetUpgrades()
  alert("game over")
}

function assistantLoop() {
  let bpc = upgrades[3].auto * upgrades[3].level
  player.money += bpc
  game.clickCount += bpc
  drawProgressBar()
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
  drawProgressBar()
}

function rollBurrito() {
  if (game.started) {
    const clickMultiplier = player.clickMultiplier
    const clicks = player.bpc * clickMultiplier
    game.clickCount += clicks
    playSound("click")
    player.money += player.bpc
    drawStats()
    drawProgressBar()
    // upgrades.forEach((upg) =>{

    //   console.log(upg.name)
    //   if (player.money >= upg.price && upg.name == "rolling") {
    //     let buttonElem = document.getElementById("upg-btn-1")
    //     buttonElem.disabled = false
    //   } else {
    //     let buttonElem = document.getElementById("upg-btn-1")
    //     buttonElem.disabled = true
    //   }
    //   if (player.money >= upg.price && upg.name == "tecate") {
    //     let buttonElem = document.getElementById("upg-btn-2")
    //     buttonElem.disabled = false
    //   } else {
    //     let buttonElem = document.getElementById("upg-btn-2")
    //     buttonElem.disabled = true
    //   }
    //   if (player.money >= upg.price && upg.name == "chancla") {
    //     let buttonElem = document.getElementById("upg-btn-3")
    //     buttonElem.disabled = false
    //   } else {
    //     let buttonElem = document.getElementById("upg-btn-3")
    //     buttonElem.disabled = true
    //   }
    //   if (player.money >= upg.price && upg.name == "assistant") {
    //     let buttonElem = document.getElementById("upg-btn-4")
    //     buttonElem.disabled = false
    //   } else {
    //     let buttonElem = document.getElementById("upg-btn-4")
    //     buttonElem.disabled = true
    //   }
    // })
  }
}

// refactoring function -- not using yet
function buyUpgrade(upgradeName) {
  let upgrade = upgrades.find((upg) => upg.name == upgradeName)
  if (player.money >= upgrade.price) {
    player.money -= upgrade.price
    playSound("cash-register")
    upgrade.level++
    upgrade.price *= 2
  }
}

function upgradeBurritoRolling() {
  // index 0
  if (player.money >= upgrades[0].price) {
    playSound("cash-register")
    upgrades[0].quantity++
    player.money -= upgrades[0].price
    upgrades[0].price += 50
    console.log(upgrades[0].price)
    player.bpc++
    drawStats()
  } else {
    console.log("not enough cash")
  }
}

function upgradeDrinkTecate() {
  if (player.money >= upgrades[1].price) {
    showItem("upgrade-tecate")
    playSound("cash-register")
    upgrades[1].quantity++
    player.money -= upgrades[1].price
    upgrades[1].price += 200
    console.log(upgrades[1].price)
    player.bpc += 3
    drawStats()
  } else {
    console.log("not enough cash")
  }
}
function upgradeChanclaPower() {
  if (player.money >= upgrades[2].price) {
    showItem("upgrade-chancla")
    playSound("cash-register")
    upgrades[2].quantity++
    player.money -= upgrades[2].price
    upgrades[2].price += 300
    player.bpc += 5
    drawStats()
  } else {
    console.log("not enough cash")
  }
}
function upgradeTortillaMaker() {
  if (upgrades[3].auto <= 0) {
    upgrades[3].auto = 50
  }
  console.log(upgrades[3].loop)
  if (player.money >= upgrades[3].price) {
    clearInterval(upgrades[3].loop)
    upgrades[3].quantity++
    upgrades[3].level++
    showItem("upgrade-assistant")
    playSound("cash-register")
    upgrades[3].loop = setInterval(assistantLoop, 3000)
    player.money -= upgrades[3].price
    upgrades[3].price = upgrades[3].price * upgrades[3].quantity
    upgrades[0].isPurchased = true
    drawStats()
  } else {
    console.log("not enough cash")
  }
}

function resetUpgrades() {
  player.money = 0
  upgrades[0].isPurchased = false
  upgrades[0].price = 50
  upgrades[1].price = 200
  upgrades[2].price = 300
  upgrades[3].price = 1000
  upgrades.foreach((upgrade) => {
    console.log(upgrade.quantity, upgrade.level)
    upgrade.quantity = 0
    upgrade.level = 0
  })
  drawStats()
}

function increaseLevel() {
  // if (document.getElementById("level-up").display == "none")
  playSound("levelup-sound")
  document.getElementById("progress-bar").style.width = "0%"
  random = randomNumber(0, 3)
  document.getElementById(
    "level-up"
  ).innerHTML = `<img id="level-up-gif" class="img-fluid p-2" src="assets/levelup/${levelUp[random].gif}" alt="" />`
  console.log(levelUp[random].gif)
  showItem("level-up-gif")
  if (game.level == 10) {
    player.clickMultiplier = 1.5
  } else if (game.level == 15) {
    player.clickMultiplier = 2
  } else if (game.level == 20) {
    player.clickMultiplier = 3
  }

  if (game.level >= 5) {
    game.demand += 2000
  }
  if (game.level >= 10) {
    game.demand += 5000
  }

  if (game.level >= 15) {
    game.demand += 6000
  }

  if (game.level >= 20) {
    game.demand += 12000
  }

  if (game.level >= 25) {
    game.demand += 12000
  }

  if (game.level >= 30) {
    game.demand += 12000
  }

  game.level++
  game.demand += 25
  game.clickCount = 0
  game.timer = 30
  // console.log(game.level, game.demand)
}

// SECTION
// DRAW FUNCTIONS AND DOM MANIPULATION

function drawStats() {
  let bpc = upgrades[3].auto * upgrades[3].level
  let bpc1 = player.bpc * player.clickMultiplier
  document.getElementById("level").textContent = game.level
  document.getElementById("money").textContent = player.money
  document.getElementById("time-remaining").textContent = game.timer
  // document.getElementById("click-power").textContent = player.clickMultiplier
  document.getElementById("click-multiplier").textContent =
    player.clickMultiplier
  document.getElementById("auto-assist").textContent = bpc
  document.getElementById("bpc").textContent = bpc1
  let demand = game.demand - game.clickCount
  document.getElementById("burrito-demand").textContent = demand

  // ADD UPGRADE TRACKER
  document.getElementById("upg1-price").textContent = upgrades[0].price
  document.getElementById("upg2-price").textContent = upgrades[1].price
  document.getElementById("upg3-price").textContent = upgrades[2].price
  document.getElementById("upg4-price").textContent = upgrades[3].price

  document.getElementById("upg1-level").textContent = upgrades[0].quantity
  document.getElementById("upg2-level").textContent = upgrades[1].quantity
  document.getElementById("upg3-level").textContent = upgrades[2].quantity
  document.getElementById("upg4-level").textContent = upgrades[3].quantity
}

function drawProgressBar() {
  let percentage = (game.clickCount / game.demand) * 100
  console.log(
    game.demand,
    "<--game demand, percentage of prog bar -->",
    percentage
  )
  document.getElementById("progress-bar").style.width = percentage + "%"
  if (percentage >= 100) {
    // document.getElementById("progress-bar").style.width = "100%"
    increaseLevel()
    percentage = 0

    // document.getElementById("progress-bar").style.width = "0%"
  }
}

function hideItem(elementID) {
  element = document.getElementById(elementID)
  element.setAttribute("hidden", "")
}

function showItem(elementID) {
  element = document.getElementById(elementID)
  element.style.display = "block"
}

function playSound(soundId) {
  document.getElementById(soundId).play()
}

function loadMusic() {
  document.getElementById("music").play()
}
// SECTION MATH FUNCTIONS

function randomNumber(min, max) {
  console.log("randomNumber")
  const randomNumber = Math.floor(Math.random() * (max - min + 1))
  return randomNumber
}
