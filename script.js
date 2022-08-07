//CARDSCCER
class App { 
    constructor() {
        this.listUser = [] 
    }
    compararPlayers(enemy, user, marcador) {
        let puntUser = this.listUser[0].player(user)
        let puntPc = this.listUser[1].player(enemy)
        marcador.puntajeEnemigo = puntUser < puntPc ? marcador.puntajeEnemigo += 1 : marcador.puntajeEnemigo
        marcador.puntajeUser = puntUser < puntPc ? marcador.puntajeUser : marcador.puntajeUser += 1
        setTimeout(() => {
            this.renderMarcador()
        }, 1900);

        return puntUser > puntPc ? user : enemy;
    }
    playersOff(listNames) {
        if (listNames.length == 5) {
            let main = document.getElementById("main1")
            let players = document.getElementById("animation2")
            main.removeChild(players)
        } else {
            for (const name of listNames) {
                let carta = document.getElementById(name + "id")
                carta.className = "playerOff col"
                let boton = document.getElementById(name);
                carta.removeChild(boton);
            }
        }

    }
    renderMarcador() {
        let markABorrar = document.getElementById("marcador")
        let cont = document.getElementById("game")
        cont.removeChild(markABorrar)
        let d = document.createElement("h1")
        d.id = "marcador"
        d.innerText = "Marcador " + marcador.puntajeUser + " : " + marcador.puntajeEnemigo
        cont.appendChild(d);
    }
    setWinner(enemy) {
        this.listUser[1].deletePlayerTeamUser(enemy)
        let main = document.getElementById("main1")
        let match = document.getElementById("animation2")
        setTimeout(() => {
            main.removeChild(match)
        }, 3000)

    }
    renderEnemy() {
        let aux = false
        let a = this.listUser[1].playerRandom().render(aux);
        a.className = "playerEnemy col-md-4 .ml-auto"
        let b = document.getElementById("animation-row")
        a.style = " margin-left: 430px"
        b.appendChild(a);
        let c = document.getElementsByClassName("btn btn-outline-primary")[0]
        a.removeChild(c)
        return a
    }
    hidePlayers(playerName) {
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
            d.innerText = "Marcador " + marcador.puntajeUser + " : " + marcador.puntajeEnemigo
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
        if (players.cantPlayers == 0) {} else {
            let aux = true
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
                let x = players.playersTeam[i].render(aux)
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
    }
    addPcUser() {
        this.listUser.push(new User("boca"));
        this.generatePcEnvelope("boca");
    }
    generateUserEnvelope(index) {
        for (let i = 0; i < index; i++) {
            this.listUser[0].addPlayerToUser(new Player(lista.players[i].name, this.listUser[0].getTeamName()));
        }
    }
    generatePcEnvelope(equipo) {
        for (let i = 0; i < 5; i++) {
            let a = this.listUser.indexOf(this.listUser.find(user => user.teamUser.name == equipo));
            this.listUser[a].addPlayerToTeam(new Player((listaEnemy.players[i].name), "Boca"));
        }
    }
    addUser() {
        this.addPcUser()
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

    renderGrid() {
        let aux = false;
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
                let a = player.render(aux)
                a.className = i == 0 ? "player col " : "player col offset-2";
                b.appendChild(a);
                i++
            } else if (i < 6) {
                let a = player.render(aux)
                a.className = i == 3 ? "player col " : "player col offset-2";
                c.appendChild(a);
                i++
            } else {
                let a = player.render(aux)
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
        this.renderGrid();
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
    getTeamName() {
        return this.teamUser.name
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
class TeamUser { //equipo titular
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
    render(aux) {
        let name = this.name;
        let a = document.createElement("div")
        a.id = this.name + "id"
        if (aux) {
            a.innerHTML = `<h1 class = "namePlayer"> ${this.name}</h1>
        <p class  ="position">${this.position}</p>
        <p>Defensa ${this.def}</p>
        <p>Ataque  ${this.atk}</p>
        <p>${this.team}</p>
        <input style = "height :15%" class="btn btn-outline-primary" type = "button" value ="Eligeme!" id="${name}" onclick="playGame(${name})">`
        } else {
            a.innerHTML = `<h1 class = "namePlayer"> ${this.name}</h1>
            <p class  ="position">${this.position}</p>
            <p>Defensa ${this.def}</p>
            <p>Ataque  ${this.atk}</p>
            <p>${this.team}</p>
            <input style = "height :15%" class="btn btn-outline-primary" type = "button" value ="agregar al equipo" id="${name}" onclick="pasarJugadorAlEquipo(${name})">`
        }
        return a;
    }
}
//____________________________________________________________________________________________________________________________________________________________________________________
//Main
let lista
fetch("players.json")
    .then((list) => list.json())
    .then((players) => {
        lista = players;
    })
let listaEnemy
fetch("playersBoca.json")
    .then((list) => list.json())
    .then(((players) => {
        listaEnemy = players;
    }))
const a = new App(); //==> Maneja estructura del programa
let boton = document.getElementById("botonSubmit");
let enter = document.getElementById("name")
boton.addEventListener("click", function () {
    agregarUsuario()
})
enter.addEventListener("keyup", function (e) { //==> permite ingresar con enter
    e.key === 'Enter' && agregarUsuario()
})

function agregarUsuario() {
    a.addUser(); // ==> genera el usuario y hace una seguidilla de acciones como crear su equiipo con los 10 jugadores random y renderizar la pantalla
}
let marcador = {
    puntajeUser: 0,
    puntajeEnemigo: 0,

    marcadorTotal() {
        return this.puntajeUser + this.puntajeEnemigo
    }

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

function reload() {
    window.location.reload();
}

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
    if (marcador.marcadorTotal() == 5) { //Al terminar el partido (cuando se utilizen los 5 jugadores seleccionados) se renderiza la pantalla de win/loss.
        setTimeout(() => {
            let text = document.createElement("label")
            text.className = "restart"
            let main = document.getElementById("main1")
            let render = document.createElement("h1")
            let restart = document.createElement("input")
            restart.name = "restart"
            restart.type = "button"
            text.for = "restart"
            text.innerText = "RESTART"
            restart.className = "btn btn-warning restart"
            restart.addEventListener("click", function () {
                reload();
            })
            if (marcador.puntajeUser > marcador.puntajeEnemigo) {
                render.innerText = "GANASTE"
                render.className = "win"
            } else {
                render.innerText = "PERDISTE"
                render.className = "loss"
            }

            main.appendChild(render)
            main.appendChild(restart)
            main.appendChild(text)

        }, 3000)
    }
}
