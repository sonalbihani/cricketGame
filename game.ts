// let container = document.createElement("div");
// container.setAttribute("class","container-fluid");
// container.innerHTML = ""
let container = <HTMLDivElement>document.createElement("div");
container.setAttribute("class", "container text-center align-items-center");
container.innerHTML =  `<div class="row text-center"><div class="col-4 col-lg-4 text-left" style="font-size:1.3em;">
              <p id="score1">Team-1 Score for each Ball goes here</p>
              </div>
<div class="col-4 col-lg-4 text-center">
<button class="btn btn-primary" onclick="startGame()" id="start">Start game</button>
</div>
<div class="col-4 col-lg-4 text-right" style="font-size:1.3em;">
<p id="score2">Team-2 Score for each Ball goes here</p>
</div>
</div>
<hr>
<div class="row text-center">
<div class="col-4 lg-4 text-center">
    <h3 id="team1Score">0</h3>
    <h2>Team-1</h2>
    <button class="btn btn-primary" id="hit1" onclick="hit(1)" disabled>HIT 1</button>
</div>
<div class="col-4 col-lg-4 text-center">
    <h1>Timer</h1>
    <h3 id="timer" class="timerText">60</h3>
</div>
<div class="col-4 lg-4 text-center">
    <h3 id="team2Score">0</h3>
    <h2>Team-2</h2>
    <button class="btn btn-primary" id="hit2" onclick="hit(2)" disabled>HIT 2</button>
</div>
</div>`

let container2 = <HTMLDivElement>document.createElement("div");
container2.setAttribute("class", "container text-center align-items-center");
container2.innerHTML = `<a href="result.html" target="__blank"><button class="btn btn-primary" id="gen"disabled>Generate Result</button></a>`
container2.innerHTML+=`<br><br>`
let row = <HTMLDivElement>document.createElement("div");
  row.setAttribute("class", "row");
  row.id = "scoreBoard";
  let col = <HTMLDivElement>document.createElement("div");
  col.setAttribute("class", "col-12 col-lg-5 text-center");
  col.innerHTML = `<h2>Team-1:Score Board</h2><table class="table table-striped">
  <thead>
    <tr id="thead1">
      
    </tr>
  </thead>
  <tbody id="content1">
  </tbody>
  </table>`;
  row.appendChild(col);
  col = <HTMLDivElement>document.createElement("div");
  col.setAttribute("class", "col-0 col-lg-2");
  row.appendChild(col);
  col = <HTMLDivElement>document.createElement("div");
  col.setAttribute("class", "col-12 col-lg-5 text-center");
  col.innerHTML = `<h2>Team-2:Score Board</h2><table class="table table-striped">
  <thead>
    <tr id="thead2">   
    </tr>
  </thead>
  <tbody id="content2">
  </tbody>
  </table>`;
  row.appendChild(col);
  container2.appendChild(row);
  document.body.appendChild(container);
document.body.appendChild(container2);
  createTable(1);
  createTable(2);
  
/************************CLASSES******************************** */
class game{
    team_1:team;
    team_2:team;
}
class team {
    name: string;
    players: player[] = [];
    score: number[] = [];
    total: number = 0;
    topScorer: {
      player: String;
      score: number;
    };
    constructor(str: string) {
        this.name = str;
      }
}
class player {
    index: number;
    name: String;
    team: string;
    score: number[] = [];
    total: number;
    constructor(n: string, ind: number, t: string) {
        this.name = n;
        this.index = ind;
        this.team = t;
    }
}
/**********************VARIABLES********************* */

let cricket = new game();
let team1 = new team('Team 1');
let team2 = new team('Team 2');
cricket.team_1 = team1;
cricket.team_2 = team2;

let no_players = 10;
let balls =0;
let hit_1 =1;
let hit_2 =0;
let player_batting1 =0;
let player_total1=0;
let player_batting2 =0;
let player_total2 =0;
let max_run = 6;
let secondsToCountDown = 60;
let gen = 0;

for (let i = 0; i < no_players; i++) {
    let play = new player(`Player-${i + 1}`, i, "team-1");
    team1.players.push(play);
  }
  for (let i = 0; i < no_players; i++) {
    let play = new player(`Player-${i + 1}`, i, "team-2");
    team2.players.push(play);
  }
/***********************FUNCTIONS****************************** */

function generateRuns(){
    return (Math.floor(Math.random()*(max_run+1)));
}

function countdown(resolve, reject) {
    const interval = setInterval(() => {
        document.getElementById("timer").innerHTML = String(secondsToCountDown);
        if (secondsToCountDown === 0) {
          clearInterval(interval);
          return resolve("sucess");
        }
        secondsToCountDown--;
      }, 1000);
}

function hit(index: number){
    let run = generateRuns();
    if(index == 1){
        if(player_batting1< team1.players.length){
            if(run ==0){
                document.getElementById("score1").innerHTML = `0<br>Player-${
                    player_batting1 + 1
                  } OUT`;
            }
            else{
                document.getElementById("score1").innerHTML = `Player-${
                    player_batting1 + 1
                  } Scored<br>${run}`;
            }
            team1.players[player_batting1].score.push(run);
            player_total1+=run;
            team1.total+=run;
            (<HTMLTableCellElement>(
                document.getElementById(
                `B-${index}${player_batting1 + 1}${balls + 1}`
                )
            )).innerHTML = String(run);
            (<HTMLTableCellElement>(
                document.getElementById(`total${player_batting1 + 1}${index}`)
            )).innerHTML = String(player_total1);
            balls+=1;
            if(balls == 6 || run ==0){
            team1.players[player_batting1].total = player_total1;
            team1.score.push(player_total1);
            player_total1 = 0;
            balls = 0;
            player_batting1++;
            }  

        
        }
        else {
            (<HTMLButtonElement>document.getElementById("hit1")).disabled = true;
            secondsToCountDown = 0;
            document.getElementById("timer").innerHTML = String(60);
        }
    }    
    else if(index == 2){
        if(player_batting2< team2.players.length){
            if(run ==0){
                document.getElementById("score2").innerHTML = `0<br>Player-${
                    player_batting2 + 1
                  } OUT`;
            }
            else{
                document.getElementById("score2").innerHTML = `Player-${
                    player_batting2 + 1
                  } Scored<br>${run}`;
            }
            team2.players[player_batting2].score.push(run);
            player_total2+=run;
            team2.total+=run;
            (<HTMLTableCellElement>(
                document.getElementById(
                `B-${index}${player_batting2 + 1}${balls + 1}`
                )
            )).innerHTML = String(run);
            (<HTMLTableCellElement>(
                document.getElementById(`total${player_batting2 + 1}${index}`)
            )).innerHTML = String(player_total2);
            balls+=1;
            if(balls == 6 || run ==0){
            team2.players[player_batting2].total = player_total2;
            team2.score.push(player_total2);
            player_total2 = 0;
            balls = 0;
            player_batting2++;
            }  

        
        }
        else {
            (<HTMLButtonElement>document.getElementById("hit1")).disabled = true;
            secondsToCountDown = 0;
            document.getElementById("timer").innerHTML = String(60);
        }        

    }
    console.log(team1.total);
    updateScore(index);
}

function createTable(index) {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 8; j++) {
        if (i == 0) {
          if (j == 0) {
            (<HTMLTableElement>(
              document.getElementById(`thead${index}`)
            )).innerHTML += `<th scope="col">Team-${index}</th>`;
          } else if (j == 7) {
            (<HTMLTableElement>(
              document.getElementById(`thead${index}`)
            )).innerHTML += `<th scope="col">Total</th>`;
          } else {
            (<HTMLTableElement>(
              document.getElementById(`thead${index}`)
            )).innerHTML += `<th scope="col">Ball-${j}</th>`;
          }
        }
      }
      (<HTMLTableElement>(
        document.getElementById(`content${index}`)
      )).innerHTML += `<tr>
              <td scope="row">Player-${i + 1}</th>
              <td id="B-${index}${i + 1}1"></td>
              <td id="B-${index}${i + 1}2"></td>
              <td id="B-${index}${i + 1}3"></td>
              <td id="B-${index}${i + 1}4"></td>
              <td id="B-${index}${i + 1}5"></td>
              <td id="B-${index}${i + 1}6"></td>
              <td id="total${i + 1}${index}"> </td>
            </tr>`;
    }
}
async function startGame(){
  clear = 1;
  secondsToCountDown = 60;
  balls = 0;
  if(hit_1 == 1){
    hit_1 = 0;
    hit_2 = 1;
    (<HTMLButtonElement>document.getElementById("hit1")).disabled = false;
    (<HTMLButtonElement>document.getElementById("hit2")).disabled = true;
  }
  (<HTMLButtonElement>document.getElementById("start")).disabled = true;
  let temp = new Promise((resolve, reject) => countdown(resolve, reject));
  await temp;
  if(hit_2 == 1){
    hit_1 = 0;
    hit_2 = 0;
    gen = 1;
    (<HTMLButtonElement>document.getElementById("hit2")).disabled = false;
    (<HTMLButtonElement>document.getElementById("hit1")).disabled = true;
  }
  secondsToCountDown = 60;
  temp = new Promise((resolve, reject) => countdown(resolve, reject));
  await temp;
  clear = 0;
  document.getElementById("timer").innerHTML = String(60);
  if (hit_2 == 0 && hit_1 == 0) {
    document.getElementById(
      "score2"
    ).innerHTML = `Team-2 Scored<br>${team2.total} Runs`;
    (<HTMLButtonElement>document.getElementById("hit2")).disabled = true;
    (<HTMLButtonElement>document.getElementById("start")).disabled = true;
    (<HTMLButtonElement>document.getElementById("gen")).disabled = false;
    localStorage.setItem("result", JSON.stringify(cricket));
    localStorage.setItem(
      "table",
      String(document.getElementById("scoreBoard").outerHTML)
    );
  }  
  else if (hit_1 == 0) {
    document.getElementById(
      "score1"
    ).innerHTML = `Team-1 Scored<br>${team1.total} Runs`;
    (<HTMLButtonElement>document.getElementById("hit1")).disabled = true;
    (<HTMLButtonElement>document.getElementById("start")).disabled = false;
    (<HTMLButtonElement>document.getElementById("hit2")).disabled = true;
  }

}
let clear = 1;
function updateScore(index) {
    if(index==1){
      (<HTMLElement>document.getElementById("team1Score")).innerHTML = String(
        team1.total
      );
    }
    else{
      (<HTMLElement>document.getElementById("team2Score")).innerHTML = String(
        team2.total
      );
    }
  }

