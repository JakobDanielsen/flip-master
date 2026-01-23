
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


function coinflip(repeat) {
    if(repeat == false) {
        coinDisplay.innerHTML = ""
        probabilityField.innerHTML = ``
    }
  if (Math.random() < 0.5) {
    setTimeout(() => {
  headsCounter++;
    probabilityField.innerHTML = `Chance: ${Math.pow(0.5, headsCounter) * 100}% | ${headsCounter} | Top Score: ${headsRecord}`
    coinDisplay.insertAdjacentHTML("beforeend",`
       <li>
        <img src="resources/heads.png">       
       </li> `)
    coinflip(true);
    const audio = new Audio('resources/heads.mp3');
    audio.volume = 0.5;
    audio.play()
    }, 100);
    
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
    }, 100);
  }
    if(headsCounter > headsRecord) headsRecord = headsCounter
    probabilityField.innerHTML = `Chance: ${Math.pow(0.5, headsCounter) * 100}% | ${headsCounter} | Top Score: ${headsRecord}`
}

coinflip(false);
playButton.addEventListener("click" ,()=>{
    coinflip(false)
    playButton.disabled = true
})
