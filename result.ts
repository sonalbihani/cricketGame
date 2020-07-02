let cric = JSON.parse(localStorage.getItem("result"));
console.log(cric);
console.log(localStorage.getItem("table"));
window.onload = () => {
  let winner=0;
  let manOfTheMatch=0;
  let manOfTheMatchTeam="";
  let manOfTheMatchScore=0;
  if(cric.team_1.total>cric.team_2.total){
      winner=1;
  }
  else{
      winner=2;
  }
  let val1=Math.max(...cric.team_1.score);
  let val2=Math.max(...cric.team_2.score)
  if(val1>val2){
    manOfTheMatch=cric.team_1.score.indexOf(val1);
    manOfTheMatchTeam="Team-1";
    manOfTheMatchScore=val1;
  }
  else{
    manOfTheMatch=cric.team_2.score.indexOf(val2);
    manOfTheMatchTeam="Team-2";
    manOfTheMatchScore=val2;
  }
  

  let title = <HTMLDivElement>document.createElement("div");
  title.setAttribute("class","container-fluid text-center");
  title.innerHTML=`<h1>Cricket Game</h1>`;
  document.body.appendChild(title);

  let cont=<HTMLDivElement>document.createElement("div");
  cont.setAttribute("class","container text-center");
  cont.innerHTML="<br>";
  cont.innerHTML+=`${localStorage.getItem("table")}`;

  let row=<HTMLDivElement>document.createElement("div");
  row.setAttribute("class","row text-center");

  let content= <HTMLDivElement>document.createElement("div");
  content.setAttribute("class","col-lg-12 text-center");
  content.innerHTML=`<div class="card text-center border border-dark">
  <div class="card-header ">
  Result of the Cricket Game  </div>
  <div class="card-body">
    <h3 class="card-title font-weight-bold">The Winner is</h3>
    <h1 class="card-text">Team-${winner}</h1><br>
    <h3 class="card-title font-weight-bold">The Man of the match is</h3>
    <h1 class="card-text">Player-${manOfTheMatch+1}</h1>
    <h2 class="card-title">Team: ${manOfTheMatchTeam}</h2>
    <h2 class="card-title">Score: ${manOfTheMatchScore}</h2>
    <a href="home.html" class="btn btn-primary">click to play again</a>
  </div>
  <div class="card-footer ">
    Congratulations
  </div>
</div>`;
    row.appendChild(content);
    cont.appendChild(row);
    cont.innerHTML+="<br><br>";
    document.body.appendChild(cont);
    
};
