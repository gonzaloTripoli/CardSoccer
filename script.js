//falta menos pero falta, el "partido" voy a tardar unas horitas en poder hacerlo, me faltan un par de pantallas y creo que nada mas
//va tomando color de a poco

class App {
    constructor() {
        this.listUser = []
        this.addPcUser()
    }
    renderEnemy() {
        // next
    }
    movePlayersToTeam(namePlayer) {
        this.listUser[0].movePlayersToTeam(namePlayer)
        if (this.listUser[0].teamReady()) {
            this.ponerJugadorOff(namePlayer);
        } else {
            let game = document.getElementById("main1");
            game.removeChild(document.getElementsByClassName("container")[0]);
            this.renderPlay()
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
            this.listUser[a].addPlayerToTeam(new Player(("jugador" + i), "Boca"));
        }
    }
    addUser() {
        let nameUser = document.getElementById("name");
        this.listUser.unshift(new User(nameUser.value));
        this.generateUserEnvelope(9);
        console.log(this.listUser);
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
    play() {
        let ganoUsuario = this.listUser[0].play() > this.listUser[1].play();
        console.log("Gano  " + (ganoUsuario ? this.listUser[0].getName() : this.listUser[1].getName()));
    }
}
class User {
    constructor(name) {
        this.playerUser = [];
        this.teamUser = new TeamUser(name);
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
}
class TeamUser {
    constructor(name) {
        this.name = name;
        this.playersTeam = [];
    }
    isReady() {
        return this.playersTeam.length < 5;
    }
    getValue() {
        let value = 0;
        this.playersTeam.forEach(player => {
            value += (player.isDefender() ? player.def : player.atk);
        })
        return value;
    }
    add(player) {
        this.playersTeam.push(player);
    }
    cantPlayers() {
        return this.playersTeam.length;
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
    isDefender() {
        return this.position == "def";
    }
    numRandom() {
        return Math.round(Math.random() * (0 - 100 + 1) + 100);
    }
    asignPosition() {
        return this.atk > this.def ? "atk" : "def";
    }
    render() {
        let name = this.name;
        let a = document.createElement("div")
        a.id = this.name + "id"
        a.innerHTML = `<h1> ${this.name}</h1>
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
        a.innerHTML = `<h1> ${this.name}</h1>
        <p class  ="position">${this.position}</p>
        <p>Defensa ${this.def}</p>
        <p>Ataque  ${this.atk}</p>
        <p>${this.team}</p>
        <input style = "height :15%" class="btn btn-outline-primary" type = "button" value ="Eligeme!" id="${name}" onclick="playGame(${name})">`
        return a;
    }
}
const a = new App();
let boton = document.getElementById("botonSubmit");
let enter = document.getElementById("name")
enter.addEventListener("keyup", function (e) {

    if (e.key === `Enter`) {
        agregarUsuario()
    }
})
// if (localStorage.getItem("user") == null) {
function agregarUsuario() {
    a.addUser();
}
// } else {
//     a.addUserPr((localStorage.getItem("user")));
// }

function pasarJugadorAlEquipo(name) {
    a.movePlayersToTeam(name.id);
    Toastify({
        gravity: "bottom",
        position: "left",
        text: "Agregando a  " + name.id + " al equipo titular",
        duration: 500
    }).showToast();
}

function playGame(playerName) {
    let x = document.getElementById(playerName.id + "id")
    let bo = true;
    // if () {
    anime({
        targets: x,
        translateY: -250,

        duration: 1900,
    });
    a.renderEnemy()

}