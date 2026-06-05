import {
signOut
}
from
"https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";
import {
db,
auth
}
from
"/Portfolio Trading Journal/firebase-config.js";

import {
onAuthStateChanged
}
from
"https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

import {

collection,
addDoc,
getDocs

}
from

"https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

onAuthStateChanged(auth, (user)=>{

if(!user){

window.location.href =
"login.html";

return;
}
loadTrades();
});

document
.getElementById("logoutBtn")
.addEventListener("click", async()=>{

try{

await signOut(auth);

alert("Logged Out");

window.location.href =
"login.html";

}catch(error){

alert(error.message);

}

});

const tradeForm =
document.getElementById(
"tradeForm"
);

const tableBody =
document.querySelector(
"#tradeTable tbody"
);

tradeForm.addEventListener(
"submit",
async(e)=>{

e.preventDefault();
const user = auth.currentUser;
if(!user){
    alert("User not logged in");
    return;
}

const trade = {

pair:
document.getElementById(
"pair"
).value,

direction:
document.getElementById(
"direction"
).value,

result:
document.getElementById(
"result"
).value,

entry:
document.getElementById(
"entry"
).value,

sl:
document.getElementById(
"sl"
).value,

tp:
document.getElementById(
"tp"
).value,

date:
new Date()
.toISOString()

};

await addDoc(
collection(db,"users",user.uid,"trades"),
trade
);

alert(
"Trade Saved Successfully"
);

loadTrades();

});

async function loadTrades(){

tableBody.innerHTML="";

let wins = 0;
let losses = 0;
const trades =[];

const user = auth.currentUser;

const snapshot =
await getDocs(
collection(db,"users",user.uid,"trades")
);

snapshot.forEach(doc=>{

const trade =
doc.data();
trades.push(trade);

if(
trade.result === "Win"
){
wins++;
}else{
losses++;
}

tableBody.innerHTML += `
<tr>
<td>${trade.pair}</td>
<td>${trade.direction}</td>
<td>${trade.result}</td>
</tr>
`;

});

document.getElementById(
"totalTrades"
).innerText =
wins + losses;

document.getElementById(
"wins"
).innerText =
wins;

document.getElementById(
"losses"
).innerText =
losses;

let rate = 0;

if(
wins + losses > 0
){

rate =
(wins /
(wins+losses)
*100)
.toFixed(1);

}

document.getElementById(
"winRate"
).innerText =
rate + "%";

createChart(trades);
}
let equityChart;
function createChart(trades){

const ctx =
document.getElementById(
"equityChart"
);

const labels = [];
const equityData = [];

let equity = 0;

trades.forEach((trade,index)=>{

labels.push(
`Trade ${index + 1}`
);

if(trade.result === "Win"){

equity += 1;

}else{

equity -= 1;

}

equityData.push(equity);

});
if(equityChart){
    equityChart.destroy();
}

equityChart = new Chart(ctx, {

type: "line",

data: {

labels: labels,

datasets: [{

label: "Equity Curve",

data: equityData,

borderWidth: 3,

tension: 0.3

}]

},

options: {

responsive: true,

plugins: {

legend: {

labels: {

color: "white"

}

}

},

scales: {

x: {

ticks: {

color: "white"

}

},

y: {

ticks: {

color: "white"

}

}

}

}

});

}

document
.getElementById(
"calculateRR"
)
.addEventListener(
"click",
()=>{

const entry =
parseFloat(
document
.getElementById(
"rrEntry"
).value
);

const sl =
parseFloat(
document
.getElementById(
"rrSL"
).value
);

const tp =
parseFloat(
document
.getElementById(
"rrTP"
).value
);

const risk =
Math.abs(
entry-sl
);

const reward =
Math.abs(
tp-entry
);

const rr =
(
reward/risk
)
.toFixed(2);

document
.getElementById(
"rrResult"
).innerText =
"1 : " + rr;

});

const ctx = document.getElementById("equityChart").getContext("2d");

// const equityChart = new Chart(ctx, {
//     type: "line",
//     data: {
//         labels: [],
//         datasets: [{
//             label: "Equity Curve",
//             data: [],
//             borderColor: "#38bdf8",
//             tension: 0.3,
//             fill: true
//         }]
//     },
//     options: {
//         animation: {
//             duration: 800
//         },
//         responsive: true,
//         scales: {
//             y: { beginAtZero: false }
//         }
//     }
// });

// simulate update function (replace with Firebase data later)
// function updateEquity(value) {
//     equityChart.data.labels.push("");
//     equityChart.data.datasets[0].data.push(value);
//     equityChart.update();
// }
// LOGOUT

// import {
// signOut
// }
// from
// "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// document
// .getElementById("logoutBtn")
// .addEventListener("click", async()=>{

// await signOut(auth);

// window.location.href =
// "login.html";

// });