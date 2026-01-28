
const coinDisplay = document.getElementById("coin_display")
const probabilityField = document.getElementById("probability_field")
const recordField = document.getElementById("record_field")

const headsImg = document.createElement("img")
headsImg.src = "resources/heads.png"
const tailsImg = document.createElement("img")
tailsImg.src = "resources/tails.png"

const li = document.createElement("li");
const playButton = document.getElementById("play_button")

let headsCounter = 0;
let headsRecord = 0;

let coinDisplayDelay = 100
// -localStorage.getItem("record")*2

let timesFlipped = 0;

function coinflip(repeat) {
    if(repeat == false) {
        coinDisplay.innerHTML = ""
        probabilityField.innerHTML = ``
    }
    const storedRecord = Number(localStorage.getItem("record")) || 0;
    if (storedRecord > headsRecord) headsRecord = storedRecord;
    if (Math.random() < 0.5) {
    setTimeout(() => {
    headsCounter++;
    coinDisplayDelay = 100+ Math.pow(1.8,headsCounter)
    // probabilityField.innerHTML = `Chance: ${Math.pow(0.5, headsCounter) * 100}% | ${headsCounter} | Top Score: ${localStorage.getItem("record")}`
    coinDisplay.insertAdjacentHTML("beforeend",`
       <li>
        <img src="resources/heads.png">       
       </li> `)
    coinflip(true);
    
    let audio;
    if(headsCounter>=10){
        audio = new Audio('resources/heads10.mp3');
    } else if (headsCounter > 4) {
        audio = new Audio('resources/heads4.mp3');
    } else {
        audio = new Audio(`resources/heads${headsCounter}.mp3`);
    }
    audio.volume = 0.5;
    audio.play()
    }, coinDisplayDelay);
    
  } else {
    setTimeout(() => {
    coinDisplay.insertAdjacentHTML("beforeend",`
       <li>
        <img src="resources/tails.png" class="dark">       
       </li> `)
    headsCounter = 0;
    playButton.disabled = false
    const audio = new Audio('resources/tails.mp3');
    audio.volume = 0.5;
    audio.play()
    }, coinDisplayDelay);
  }
    if(headsCounter > headsRecord) headsRecord = headsCounter
    if(localStorage.getItem("record")<headsRecord){
        localStorage.setItem("record",headsRecord)
    }
    if (headsCounter === 0) { // temporary soltion
        probabilityField.innerHTML = `Probability: 50% | ${headsCounter} | Top Score: ${localStorage.getItem("record")}`
    } else {
        probabilityField.innerHTML = `Probability: ${Math.pow(0.5, headsCounter) * 100}% | ${headsCounter} | Top Score: ${localStorage.getItem("record")}`
    }
}

coinflip(false);
playButton.addEventListener("click" ,()=>{
    coinflip(false)
    playButton.disabled = true
})
