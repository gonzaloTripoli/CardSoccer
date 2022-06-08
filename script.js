class App { //maneja todas las clases.
    constructor() {
        this.listUser = [] //usuario principal se maneja siempre con el indice 0
        this.addPcUser()
    }
    compararPlayers(enemy, user, marcador) {
        let a = this.listUser[0].player(user)
        let b = this.listUser[1].player(enemy)
        marcador.puntajeEnemigo = a < b ? marcador.puntajeEnemigo : marcador.puntajeEnemigo += 1
        marcador.puntajeUser = a < b ? marcador.puntajeUser += 1 : marcador.puntajeUser
        setTimeout(() => {
            this.renderMarcador()
        }, 1900);

        return a > b ? user : enemy;
    }
    playersOff(listNames) {
        for (const name of listNames) {
           let a = document.getElementById(name + "id")
           a.className ="playerOff col"
           let b = document.getElementById(name);
           a.removeChild(b);
        }
    }
    renderMarcador() {
        let markABorrar = document.getElementById("marcador")

        let c = document.getElementById("game")
        c.removeChild(markABorrar)
        let d = document.createElement("h1")
        d.id = "marcador"
        d.innerText = "Marcador " + marcador.puntajeEnemigo + " : " + marcador.puntajeUser
        c.appendChild(d);
    }
    setWinner(enemy, user) {
        this.listUser[1].deletePlayerTeamUser(enemy)
        let main = document.getElementById("main1")
        let match = document.getElementById("animation2")
        setTimeout(() => {
            main.removeChild(match)
        }, 3000)
    }

    renderEnemy() {
        let a = this.listUser[1].playerRandom().render();
        a.className = "playerEnemy col-md-4 .ml-auto"
        let b = document.getElementById("animation-row")
        a.style = " margin-left: 430px"
        b.appendChild(a);
        let c = document.getElementsByClassName("btn btn-outline-primary")[0]
        a.removeChild(c)


        return a

    }
    hidePlayers(playerName, marcador) {
        let num
        let a = document.getElementById("animation-row")
        let b = document.getElementsByClassName("col")
        let i = 0;
        while (i < b.length) {
            if (!(b[i].id == playerName + "id")) {
                a.removeChild(b[i])
            } else {
                let c = document.getElementById(playerName);
                b[i].removeChild(c);
                num = i;
                i++;
            }
        }
        b[num].className = "player col-md-4"

    }
    movePlayersToTeam(namePlayer) {
        this.listUser[0].movePlayersToTeam(namePlayer)
        if (this.listUser[0].teamReady()) {
            this.ponerJugadorOff(namePlayer);
        } else {
            let game = document.getElementById("main1");
            game.removeChild(document.getElementsByClassName("container")[0]);
            this.renderPlay()
            let c = document.getElementById("game")
            let d = document.createElement("h1")
            d.id = "marcador"
            d.innerText = "Marcador " + marcador.puntajeEnemigo + " : " + marcador.puntajeUser
            c.appendChild(d);

        }
    }
    previousGame() {
        let game = document.getElementById("main1");
        game.appendChild()
    }
    ponerJugadorOff(namePlayer) {
        let a = document.getElementById(namePlayer + "id");
        let b = document.getElementById(namePlayer);
        a.removeChild(b);
        a.className = a.className == "player col offset-2" ? a.className = "playerOff col offset-2 " : a.classList = "playerOff col"

    }
    renderPlay() {
        let players = this.listUser[0].teamUser
        let container = document.createElement("div")
        container.className = "container overflow hidden"
        container.id = "animation2"
        container.style = "margin-top:27%"
        let game = document.getElementById("main1")
        let a = document.createElement("div");
        a.className = "row gy-5"
        a.id = "animation-row"
        let i = 0
        while (players.cantPlayers() > i) {
            let x = players.playersTeam[i].renderForPlay()
            x.className = "player col"
            a.appendChild(x)
            i++;
        }
        container.appendChild(a);
        game.appendChild(container);
        anime({
            targets: container,
            scale: [{
                    value: .1,
                    easing: 'easeOutSine',
                    duration: 0
                },
                {
                    value: 1,
                    easing: 'easeInOutQuad',
                    duration: 500
                }
            ],
            delay: anime.stagger(0, {
                grid: [14, 5],
                from: 'center'
            })
        })
    }
    addPcUser() {
        this.listUser.push(new User("boca"));
        this.generatePcEnvelope("boca");
    }
    generateUserEnvelope(index) {
        for (let i = 0; i < index; i++) {

            this.listUser[0].addPlayerToUser(new Player(("jugador" + i), "River"));
        }
    }
    generatePcEnvelope(equipo) {
        for (let i = 0; i < 5; i++) {
            let a = this.listUser.indexOf(this.listUser.find(user => user.teamUser.name == equipo));
            this.listUser[a].addPlayerToTeam(new Player(("player" + i), "Boca"));
        }
    }
    addUser() {
        let nameUser = document.getElementById("name");
        this.listUser.unshift(new User(nameUser.value));
        this.generateUserEnvelope(9);
        let name = document.getElementById("game");
        let a = document.createElement("div")
        a.className = "game";
        a.innerHTML = `<h2> Equipo ${this.listUser[0].teamUser.name}</h2>`
        name.innerHTML = a.innerHTML;
        localStorage.setItem("user", this.listUser[0].teamUser.name);
        this.showUserPlayers();
    }
    addUserPr(user) {
        this.listUser.unshift(new User(user));
        this.generateUserEnvelope(9);
        console.log(this.listUser);
        let name = document.getElementById("game");
        let a = document.createElement("div")
        a.className = "game";
        a.innerHTML = `<h2> Equipo ${this.listUser[0].teamUser.name}</h2>`
        name.innerHTML = a.innerHTML;
        this.showUserPlayers();
    }
    renderGrid() {
        let game = document.getElementById("main1");
        let a = document.createElement("div");
        a.className = "container overflow hidden"
        a.id = "animation"
        let b = document.createElement("div")
        b.className = "row gy-5"
        let i = 0;
        let c = document.createElement("div");
        c.className = "row gy-5";
        let d = document.createElement("div");
        d.className = "row gy-5";
        for (const player of this.listUser[0].playerUser) {
            if (i < 3) {
                let a = player.render()
                a.className = i == 0 ? "player col " : "player col offset-2";
                b.appendChild(a);
                i++
            } else if (i < 6) {
                let a = player.render()
                a.className = i == 3 ? "player col " : "player col offset-2";
                c.appendChild(a);
                i++
            } else {
                let a = player.render()
                a.className = i == 6 ? "player col " : "player col offset-2";
                d.appendChild(a);
                i++
            }
        }
        a.appendChild(b);
        a.appendChild(c);
        a.appendChild(d);
        game.appendChild(a);

    }
    showUserPlayers() {
        if (document.getElementsByClassName("container").length > 0) {
            let game = document.getElementById("main1");
            game.removeChild(document.getElementsByClassName("container")[0]);
            this.renderGrid();
        } else {
            this.renderGrid();
        }
        anime({
            targets: document.getElementById("animation"),
            scale: [{
                    value: .1,
                    easing: 'easeOutSine',
                    duration: 0
                },
                {
                    value: 1,
                    easing: 'easeInOutQuad',
                    duration: 500
                }
            ],
            delay: anime.stagger(0, {
                grid: [14, 5],
                from: 'center'
            })
        })
    }

}
class User {
    constructor(name) {
        this.playerUser = [];
        this.teamUser = new TeamUser(name);
    }
    player(namePlayer) {
        return this.teamUser.playerPwr(namePlayer)
    }
    playerRandom() {
        return this.teamUser.playerRandom()
    }
    teamReady() {
        return this.teamUser.isReady();
    }
    addPlayerToUser(player) {
        this.playerUser.push(player);
    }
    addPlayerToTeam(player) {
        this.teamUser.add(player);
    }
    movePlayersToTeam(namePlayer) {
        let playerFound = this.playerUser.find(player => player.name == namePlayer);
        let index = this.playerUser.indexOf(playerFound);
        this.teamUser.add(this.playerUser.splice(index, 1)[0]);
    }
    deletePlayerTeamUser(namePlayer) {
        this.teamUser.deletePlayer(namePlayer);
    }
}
class TeamUser {
    constructor(name) {
        this.name = name;
        this.playersTeam = [];
    }
    isReady() {
        return this.playersTeam.length < 5;
    }
    playerPwr(namePlayer) {

        return this.playersTeam.find(player => player.name == namePlayer).playerPwr()

    }
    deletePlayer(namePlayer) {
        let player = this.playersTeam.find(player => player.name == namePlayer)
        let a = this.playersTeam.indexOf(player)
        this.playersTeam.splice(a, 1)
        console.log(this.playersTeam)
    }
    add(player) {
        this.playersTeam.push(player);
    }
    cantPlayers() {
        return this.playersTeam.length;
    }
    playerRandom() {
        let cant = this.playersTeam.length;
        let random

        if (cant > 1) {
            random = Math.round(Math.random() * (0 - (cant - 1) + 1) + (cant - 1))

        } else {
            random = 0
        }
        return this.playersTeam[random];
    }
}
class Player {
    constructor(name, team) {
        this.name = name;
        this.team = team;
        this.atk = this.numRandom();
        this.def = this.numRandom();
        this.position = this.asignPosition();
    }
    numRandom() {
        return Math.round(Math.random() * (0 - 100 + 1) + 100);
    }
    playerPwr() {
        return this.position == "def" ? this.def : this.atk
    }
    asignPosition() {
        return this.atk > this.def ? "atk" : "def";
    }

    //prometo modularizar y hacerlo bien esto despues....son iguales :(
    render() {
        let name = this.name;
        let a = document.createElement("div")
        a.id = this.name + "id"
        a.innerHTML = `<h1 class = "namePlayer"> ${this.name}</h1>
        <p class  ="position">${this.position}</p>
        <p>Defensa ${this.def}</p>
        <p>Ataque  ${this.atk}</p>
        <p>${this.team}</p>
        <input style = "height :15%" class="btn btn-outline-primary" type = "button" value ="agregar al equipo" id="${name}" onclick="pasarJugadorAlEquipo(${name})">`
        return a;
    }
    renderForPlay() {
        let name = this.name;
        let a = document.createElement("div")
        a.id = this.name + "id"
        a.innerHTML = `<h1 class = "namePlayer"> ${this.name}</h1>
        <p class  ="position">${this.position}</p>
        <p>Defensa ${this.def}</p>
        <p>Ataque  ${this.atk}</p>
        <p>${this.team}</p>
        <input style = "height :15%" class="btn btn-outline-primary" type = "button" value ="Eligeme!" id="${name}" onclick="playGame(${name})">`
        return a;
    }
}

//____________________________________________________________________________________________________________________________________________________________________________________

//Main
const a = new App(); //==> Maneja estructura del programa
let boton = document.getElementById("botonSubmit");
let enter = document.getElementById("name")
enter.addEventListener("keyup", function (e) { //==> permite ingresar con enter
    if (e.key === `Enter`) {
        agregarUsuario()
    }
})

function agregarUsuario() {
    a.addUser(); // ==> genera el usuario y hace una seguidilla de acciones como crear su equiipo con los 10 jugadores random y renderizar la pantalla
}
let marcador = {
    puntajeEnemigo: 0,
    puntajeUser: 0,
}

function pasarJugadorAlEquipo(name) { // ==> movimiento del jugador de el "banco " al equipo titular, a los 5 seleccionados corta
    a.movePlayersToTeam(name.id);
    Toastify({
        gravity: "bottom",
        position: "left",
        text: "Agregando a  " + name.id + " al equipo titular",
        duration: 500
    }).showToast();
}
let listNames = []

function playGame(playerName) { // ==> va a contar con la logica y el renderizado de jugar partido, generara un enemigo con 5 jugadores aleatorios el cual por 5 rondas 
    let x = document.getElementById(playerName.id + "id")
    let i = 0;
    a.hidePlayers(playerName.id, marcador)
    let z = a.renderEnemy() //tirara aleatoriamente un jugador para matchear con el elegido por el usuario
    let nameEnemy = z.getElementsByClassName("namePlayer")[0].innerText;
    let nameUser = x.getElementsByClassName("namePlayer")[0].innerText;
    let win = a.compararPlayers(nameEnemy, nameUser, marcador)
    let value = win == nameUser ? 500 : -500;
    let animationId = (win == nameUser ? nameUser : nameEnemy) + "id";
    let animationIdLoser = (win != nameUser ? nameUser : nameEnemy) + "id";
    let animationWinner = document.getElementById(animationId)
    let animationLosser = document.getElementById(animationIdLoser)
    anime({
        targets: animationWinner,
        translateY: {
            value: -250,
            duration: 1500,
        },
        translateX: {
            value: value,
            delay: 1500,
        },
    });
    anime({
        targets: animationLosser,
        translateY: -250,
        duration: 1900,
    });
    a.setWinner(nameEnemy, nameUser)
    i++
    listNames.push(nameUser)
    setTimeout(() => {
        a.renderPlay()
        a.playersOff(listNames)
    }, 3400)
}