let cheatDialogue, lvlCheat = false
const divwarnMain = "*division with remainder\'s are rounded up"
const CheatSelect =
    <>
        <select id="cheatInput">
            <option>rounds*2</option>
            <option>rounds/2</option>
            <option>roundsPoints*2</option>
            <option>roundsPoints/2</option>
            <option>easy</option>
            <option>medium</option>
            <option>hard</option>
            <option>pause</option>
            <option>exit</option>
        </select> 
        <button onClick={enterCheat}>Enter</button>
    </>

const container = document.getElementById('divwarn')
const root = ReactDOM.createRoot(container)

function enterCheat() {
    let cheat = cheatInput.value

    divwarn.style.color = 'yellow'
    divwarn.textContent = 'cheat executed'
    btnclick1.currentTime = 0.2
    btnclick1.play()

    switch(cheat){
        case 'rounds*2': 
            points*=2
            score.textContent = `${points} / ${roundsPoints}`
        break
        case 'roundsPoints*2':
            roundsPoints*=2
            rounds = roundsPoints
            score.textContent = `${points} / ${roundsPoints}`
        break
        case 'rounds/2': 
            points/=2
            score.textContent = `${points} / ${roundsPoints}`
        break
        case 'roundsPoints/2':
            roundsPoints/=2
            rounds = roundsPoints
            score.textContent = `${points} / ${roundsPoints}`
        break
        case 'easy':
            lvlCheat = true
            lvlChnge('easy')
        break
        case 'medium':
            lvlCheat = true
            lvlChnge()
        break
        case 'hard':
            lvlCheat = true
            lvlChnge('hard')
        break
        case 'pause':
            clearInterval(loopgame)
            clearInterval(gameTiming)
        break
        case 'exit':
            noClose = false
            closeGsec()
        break
    }

    cheatDialogue =  setTimeout( () => {root.render("p"), divwarn.textContent = divwarnMain, divwarn.style.color = 'black'}, 2000)
}

document.addEventListener('keydown', (event) => {
    if(event.altKey && event.ctrlKey) { 
        root.render(CheatSelect)
        clearTimeout(cheatDialogue)
        cheatInput.focus()
    }
})
divwarn.addEventListener('dblclick', (event) => {
    root.render(CheatSelect)
    clearTimeout(cheatDialogue)
})