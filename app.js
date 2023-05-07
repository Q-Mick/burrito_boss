const player = {
  money: 10000,
  clickMultiplier: 1,
  rollingSkill: 1,
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
  },
  {
    name: "chancla",
    price: 300,
    level: 0,
  },{
    name: "rolling",
    price: 1000,
    level: 0,
  },
];