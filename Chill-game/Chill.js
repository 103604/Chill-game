const cookieBtn = document.getElementById("cookieBtn");
const cookieCount = document.getElementById("cookieCount");
const bonusText = document.getElementById("bonusText");

let cookies =
Number(localStorage.getItem("cookies")) || 0;

let clickPower =
Number(localStorage.getItem("clickPower")) || 1;

let multiplier = 1;
let bonusTime = 0;
let bonusInterval;

cookieCount.textContent = cookies;

function save() {
    localStorage.setItem("cookies", cookies);
    localStorage.setItem("clickPower", clickPower);
}

function updateCookies() {
    cookieCount.textContent =
        Math.floor(cookies);
}

cookieBtn.addEventListener("click", e => {

    const gain =
        clickPower * multiplier;

    cookies += gain;

    updateCookies();

    save();

    spawnFloat(
        "+" + gain,
        e.clientX,
        e.clientY
    );

});

function spawnFloat(text,x,y){

    const el =
        document.createElement("div");

    el.className = "float";

    el.textContent = text;

    el.style.left =
        x + "px";

    el.style.top =
        y + "px";

    document.body.appendChild(el);

    setTimeout(()=>{
        el.remove();
    },1000);

}

document
.querySelectorAll(".upgrade")
.forEach(btn=>{

    btn.addEventListener("click",()=>{

        const cost =
            Number(btn.dataset.cost);

        const power =
            Number(btn.dataset.power);

        if(cookies < cost) return;

        cookies -= cost;

        clickPower += power;

        updateCookies();

        save();

    });

});

function createCar(golden=false){

    const car =
        document.createElement("div");

    car.className =
        golden ? "car golden-car" : "car";

    car.innerHTML = `
        <div class="car-body"></div>
        <div class="car-top"></div>
        <div class="wheel left"></div>
        <div class="wheel right"></div>
    `;

    if(golden){

        car.addEventListener(
            "click",
            activateBonus
        );

    }

    document
        .getElementById("vehicleLayer")
        .appendChild(car);

    setTimeout(()=>{
        car.remove();
    },18000);

}

function activateBonus(){

    multiplier = 2;

    bonusTime = 60;

    updateBonus();

    clearInterval(
        bonusInterval
    );

    bonusInterval =
        setInterval(()=>{

            bonusTime--;

            updateBonus();

            if(bonusTime <= 0){

                multiplier = 1;

                bonusText.textContent =
                    "Geen Bonus";

                clearInterval(
                    bonusInterval
                );

            }

        },1000);

    this.remove();

}

function updateBonus(){

    bonusText.innerHTML =
        "2x Clicks<br>" +
        bonusTime + "s";

}

setInterval(()=>{

    createCar(false);

},12000);

function spawnGoldenCar(){

    createCar(true);

    const next =
        45000 +
        Math.random()*30000;

    setTimeout(
        spawnGoldenCar,
        next
    );

}

spawnGoldenCar();

const truckMessages = [

"Vergeet niet te drinken",

"Haal je ogen 10 seconden van het scherm",

"Knipper even met je ogen",

"Rek je schouders",

"Neem een korte pauze",

"Sta even op",

"Drink wat water",

"Goed bezig!"

];

function spawnTruck(){

    const truck =
        document.createElement("div");

    const msg =
        truckMessages[
            Math.floor(
                Math.random() *
                truckMessages.length
            )
        ];

    truck.className = "truck";

    truck.innerHTML = `
        <div class="truck-cab"></div>

        <div class="truck-trailer">
            ${msg}
        </div>

        <div class="truck-wheel w1"></div>
        <div class="truck-wheel w2"></div>
        <div class="truck-wheel w3"></div>
    `;

    document
        .getElementById("truckLayer")
        .appendChild(truck);

    setTimeout(()=>{
        truck.remove();
    },25000);

}

spawnTruck();

setInterval(
    spawnTruck,
    30000
);

function createCloud(){

    const cloud =
        document.createElement("div");

    cloud.className = "cloud";

    cloud.style.top =
        Math.random()*200 + "px";

    cloud.style.animationDuration =
        60 + Math.random()*40 + "s";

    document
        .getElementById("cloudLayer")
        .appendChild(cloud);

    setTimeout(()=>{
        cloud.remove();
    },120000);

}

for(let i=0;i<5;i++){

    setTimeout(
        createCloud,
        i*3000
    );

}

setInterval(
    createCloud,
    15000
);

function createBird(){

    const bird =
        document.createElement("div");

    bird.className = "bird";

    bird.style.top =
        50 + Math.random()*250 + "px";

    document
        .getElementById("birdLayer")
        .appendChild(bird);

    setTimeout(()=>{
        bird.remove();
    },40000);

}

setInterval(
    createBird,
    10000
);

function createPlane(){

    const plane =
        document.createElement("div");

    plane.className = "plane";

    plane.innerHTML = "✈";

    plane.style.top =
        40 + Math.random()*120 + "px";

    document
        .getElementById("planeLayer")
        .appendChild(plane);

    setTimeout(()=>{
        plane.remove();
    },90000);

}

createPlane();

setInterval(
    createPlane,
    45000
);

const sky =
    document.getElementById("sky");

const lampGlow =
    document.getElementById("lampGlow");

let dayTime = 0;

setInterval(()=>{

    dayTime += 0.002;

    const brightness =
        (Math.sin(dayTime)+1)/2;

    const blue =
        Math.floor(
            40 + brightness*180
        );

    sky.style.background =
        `rgb(65,${blue},220)`;

    if(brightness < 0.35){

        lampGlow.style.opacity = 1;

    }else{

        lampGlow.style.opacity = .25;

    }

},100);

updateCookies();