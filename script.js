var listMeilleur = [];

function jeuMystere() {
  var random = getRandomInt(11);
  var debutDuJeu = new Date();
  var n = document.getElementById("input");
  var inputName, messageAddName;
  var score = 0;
  n.value = "";

  n.onchange = function() {
    console.log(random);
    var x = parseInt(n.value);
    score++;
    if (Number.isInteger(x)){
      if (x > random)
        document.getElementById("message").innerHTML = " Donner un nombre plus petit ! ";
      else if (x < random)
        document.getElementById("message").innerHTML = "  Donner un nombre plu  grand ! ";
      else {
        var finDuJeu = new Date();
        var temps = (finDuJeu - debutDuJeu) / 1000;
        n.disabled = true;
        document.getElementById("message").innerHTML = " vous avez gagné !  ";
        document.getElementById("message").style.color = "green";
        pushInListTopPlayers(score, temps);
      }
    }

    n.value = "";
    document.getElementById("button").onclick = function(event) {
      jeuMystere();
      initialiser();
      n.disabled = false;
      n.value = "";
    };
  };
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}



function Joueur(name, score, temps) {
  this.name = name;
  this.score = score;
  this.temps = temps;
}

function ifInferieur(t, x) {
  for (let pos = 0; pos < t.length; pos++)
    if (t[pos].score >= x)
      return true;
  return false;
}

function indexOfobject(t, joueur) {
  for (let pos = 0; pos < t.length; pos++)
    if (t[pos].name == joueur.name && t[pos].score == joueur.score && t[pos].temps == joueur.temps) 
      return pos;
  return -1;
}

function pushInListTopPlayers(score, temps) {
  if (listMeilleur.length < 10 || ifInferieur(listMeilleur, score)) {
    var addName = document.getElementById("AddName");
    messageAddName = document.createElement("h2");
    inputName = document.createElement("input");
    inputName.id = "inputName";
    messageAddName.innerHTML = " Bravo, vous êtes dans les 10 meilleurs, entrez votre nom: ";
    addName.append(messageAddName);
    addName.append(inputName);
    var n2 = document.getElementById("inputName");
    n2.onchange = function() {
      var playerName = n2.value;
      var joueur = new Joueur(playerName, score, temps);
      listMeilleur.push(joueur);
      listMeilleur.sort(function(a, b) {
        if (a.score - b.score == 0)
          return a.temps - b.temps;
        return a.score - b.score;
      });
      var classement = indexOfobject(listMeilleur, joueur);
      addName.innerHTML = "";
      if (listMeilleur.length > 10)
         listMeilleur.splice(10, 1);
      remplirTable(listMeilleur, classement);
    };
  }
  else
    remplirTable(listMeilleur, 10);
}

function remplirTable(t, classement) {
  var ntab, ntr, ntd, nth;
  ntab = document.createElement("table");
  ntr = document.createElement("tr");
  nth = document.createElement("th");
  nth.innerHTML = "Rang";
  ntr.appendChild(nth);
  nth = document.createElement("th");
  nth.innerHTML = "Nom";
  ntr.appendChild(nth);
  nth = document.createElement("th");
  nth.innerHTML = "Score";
  ntr.appendChild(nth);
  nth = document.createElement("th");
  nth.innerHTML = "Temps";
  ntr.appendChild(nth);
  ntab.appendChild(ntr);

  for (let pos = 0; pos < t.length; pos++) {
    ntr = document.createElement("tr");
    if (pos == classement)
      ntr.id = "classement";
    ntd = document.createElement("td");
    ntd.innerHTML = pos + 1;
    ntr.appendChild(ntd);
    ntd = document.createElement("td");
    ntd.innerHTML = t[pos].name;
    ntr.appendChild(ntd);
    ntd = document.createElement("td");
    ntd.innerHTML = t[pos].score;
    ntr.appendChild(ntd);
    ntd = document.createElement("td");
    ntd.innerHTML = t[pos].temps;
    ntr.appendChild(ntd);
    ntab.appendChild(ntr);
  }

  document.getElementById("TableBest10").appendChild(ntab);
  document.body.style.height = '100%';
}

function initialiser() {
  document.getElementById("message").innerHTML = "";
  document.getElementById("TableBest10").innerHTML = "";
  document.body.style.height = '100vh';
  document.getElementById("message").style.color = "#ff1900";
}

