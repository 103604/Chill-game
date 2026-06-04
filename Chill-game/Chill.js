let cookies =
Number(localStorage.getItem("cookies")) || 0

let clickMultiplier = 1
let bonusSeconds = 0
let bonusInterval

const cookieBtn =
document.getElementById("cookieBtn")

const cookieCount =
document.getElementById("cookieCount")

const carLane =
document.getElementById("carLane")

cookieCount.textContent = cookies

cookieBtn.addEventListener("click",e=>{

    cookies += clickMultiplier

    cookieCount.textContent = cookies

    localStorage.setItem(
        "cookies",
        cookies
    )

    spawnFloat(
        "+" + clickMultiplier,
        e.clientX,
        e.clientY
    )

})

function spawnFloat(text,x,y){

    const div =
    document.createElement("div")

    div.className = "float"
    div.textContent = text

    div.style.left =
    x + "px"

    div.style.top =
    y + "px"

    document.body.appendChild(div)

    setTimeout(()=>{
        div.remove()
    },1000)
}

function spawnCar(){

    const car =
    document.createElement("div")

    car.className = "car"

    const vehicles =
    ["🚗","🚕","🚙","🚓"]

    car.textContent =
    vehicles[
        Math.floor(
            Math.random() *
            vehicles.length
        )
    ]

    car.addEventListener(
        "click",
        activateBonus
    )

    carLane.appendChild(car)

    setTimeout(()=>{
        car.remove()
    },14000)
}

function activateBonus(){

    clickMultiplier = 2

    bonusSeconds = 60

    updateBonus()

    clearInterval(
        bonusInterval
    )

    bonusInterval =
    setInterval(()=>{

        bonusSeconds--

        updateBonus()

        if(bonusSeconds <= 0){

            clearInterval(
                bonusInterval
            )

            clickMultiplier = 1

            document
            .getElementById(
                "bonusText"
            )
            .innerHTML =
            "No Bonus"
        }

    },1000)

    this.remove()
}

function updateBonus(){

    document
    .getElementById(
        "bonusText"
    )
    .innerHTML =
    "2x Clicks<br>" +
    bonusSeconds + "s"
}

function scheduleCar(){

    const delay =
    30000 +
    Math.random()*60000

    setTimeout(()=>{

        spawnCar()

        scheduleCar()

    },delay)
}

scheduleCar()

setTimeout(
    spawnCar,
    5000
)