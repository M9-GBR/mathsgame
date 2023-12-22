let rounds, roundsPoints, validExpression, result, loopgame, gameTiming, level, playtimeCounter, operator, winSoundReducer, winSoundReducerCount
tgp = getCookie("tgp") || 0,
tgw = getCookie("tgw") || 0,
tgf = getCookie("tgf") || 0,
playtime = getCookie("playtime") || 0,
qts = getCookie("qts") || 0,
h = getCookie("h") || 0,
m = getCookie("m") || 0,
s = getCookie("s") || 0
let festbut = document.getElementById('festbut'), tedbut = document.getElementById('tedbut'), secbut = document.getElementById('secbut')
let expression = document.getElementById('expression')  
let fv = 0, points = 0, countdownTime = 3, isSectionVisible = false, noClose = true
const closer = document.getElementById('closeGsecBtn')
const options = document.getElementById('options')
fsec.style.display = 'inherit', gSec.style.display = 'none', closeQues.style.display = 'none', settings.style.display = 'none'
gamefSec.style.display = 'none'
fsec.classList.add('section-down')
backgrndSnd(), lvlChnge(), sfxVol(), musicVol(), updateStats()

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.split('=')[1];
        }
    }
    return "";
}

function backgrndSnd() {
    setInterval(() => {
        backSnd.play()
    }, 2000);
}

function musicVol() {
    let newVol =  musicVolume.value / 100
    backSnd.volume = newVol
    musicVolume.title = musicVolume.value + ' Vol'
}

function sfxVol() {
    let newVol = (sfxVolume.value) / 100
    btnclick1.volume = newVol
    btnclick2.volume = newVol
    failed.volume = newVol
    failed2.volume = newVol
    winsound.volume = newVol
    winsound2.volume = newVol
    extremefail.volume = newVol
    littleWin.volume = newVol
    yes.volume = newVol
    keypress.volume = newVol
    btnclick1.currentTime = 0.2
    btnclick1.play()
    sfxVolume.title = sfxVolume.value + ' Vol'
    return newVol
}

function lvlChnge(lvl = 'medium') {
    if(gSec.style.display == 'none' || lvlCheat) {
        switch (lvl) {
            case 'easy':
                easyLvl.style.backgroundColor = 'green'
                mediumLvl.style.backgroundColor = 'rgb(200, 200, 200)'
                hardLvl.style.backgroundColor = 'rgb(200, 200, 200)'
                level = 1200
                btnclick1.currentTime = 0
                btnclick1.play()
            break;
            case 'medium':
                easyLvl.style.backgroundColor = 'rgb(200, 200, 200)'
                mediumLvl.style.backgroundColor = 'orange'
                hardLvl.style.backgroundColor = 'rgb(200, 200, 200)'
                level = 800
                btnclick1.currentTime = 0
                btnclick1.play()
            break;
            case 'hard':
                easyLvl.style.backgroundColor = 'rgb(200, 200, 200)'
                mediumLvl.style.backgroundColor = 'rgb(200, 200, 200)'
                hardLvl.style.backgroundColor = 'red'
                level = 400
                btnclick1.currentTime = 0
                btnclick1.play()
            break;
        }
    }
}

function htpOpen() {
    htp.classList.add('section-down')
    htp.style.display = 'inherit'
    options.classList.toggle('options')
    isSectionVisible = !isSectionVisible
    btnclick2.play()
}

closehtp.addEventListener('click', () => {
    htp.style.display = 'none'
    btnclick2.play()
})

function settingsOpen() {
    settings.style.display = 'inherit'
    settings.style.top = '50%'
    settings.style.left = '50%'
    settings.style.transform = 'translate(-50%, -50%)'
    options.classList.toggle('options')
    clearInterval(gameTiming)
    clearInterval(loopgame)
    clearInterval(playtimeCounter)
    isSectionVisible = !isSectionVisible;
    noClose = false
    btnclick2.play()
}

closeStns.addEventListener('click', () => {
    if(gSec.style.display == 'inherit' && closeQues.style.display == 'none' && gamefSec.style.display == 'none'){
        gameTiming = setInterval(gameCountdown, level)
        playtimeCounter = setInterval(playtimeShow, 1000)
    }
    noClose = true
    settings.style.display = 'none'
    btnclick2.play()
})

_restore.addEventListener('click', () => {
    musicVolume.value = 10
    sfxVolume.value = 10
    musicVol()
    sfxVol()
    lvlChnge()
})

document.addEventListener('dragover', (event) => {
    event.preventDefault()
})

document.addEventListener('drop', (event) => {
    event.preventDefault();
    const droppedElement = settings
    droppedElement.style.left = `${event.clientX + 50}px`;
    droppedElement.style.top = `${event.clientY + 150}px`;
    document.body.appendChild(droppedElement);
    btnclick1.currentTime = 0
    btnclick1.play()
})

statsOpen.addEventListener('click', () => {
    if(fsec.style.display == 'inherit') {
        fsec.style.transform = 'translatey(-500px)'
        options.classList.toggle('options')
        isSectionVisible = !isSectionVisible;
        document.title = 'Statistics'
        fsecToStatsec(500)
        btnclick2.play()
    }
})

function fsecToStatsec(time) {
    setTimeout( () => {
        fsec.style.display = 'none'
        statistics.style.transform = 'scale(1)'
        statistics.classList.add('section-down')
        statistics.style.display = 'inherit'
        startButtn.disabled = true
    }, time)
}

function updateStats() {
    tgpstat.textContent = tgp
    tgwstat.textContent = tgw
    tgfstat.textContent = tgf
    playtimestat.textContent = playtimeShow()
    qtstat.textContent = qts
}

function resetStat() {
    setCookie('tgp', 0, 30)
    setCookie('tgw', 0, 30)
    setCookie('tgf', 0, 30)
    setCookie('playtime', 0, 30)
    setCookie('qts', 0, 30)
    setCookie('h', 0, 30)
    setCookie('m', 0, 30)
    setCookie('s', 0, 30)
    tgp = 0, tgw = 0, tgf = 0, qts = 0, h = 0, m = 0, s = 0
    updateStats()
    playtimestat.textContent = "0hr 0mins"
    btnclick1.currentTime = 0.2
    btnclick1.play()
    alert("All Stats Have Been Reset To 0")
}

closeStats.addEventListener('click', () => {
    statistics.style.transform = 'scale(0)'
    closeStatsAnimation1(400)
    fsec.classList.add('section-pop')
    btnclick2.play()
    fsecSectionDownAni(500)
    document.title = 'Maths Game ➗'
})

function closeStatsAnimation1(time) {
    setTimeout( () => {
        statistics.style.display = 'none'
        fsec.style.display = 'inherit'
        fsec.style.transform = 'translatey(2px)'
    }, time)
}

function playtimeShow() {
    if(gSec.style.display == 'inherit') {
        s++
        if (s > 59) {
            s = 0
            m++
        }
        if(m > 59) {
            m = 0
            h++
        }
    }
    setCookie("h", h, 30)
    setCookie("m", m, 30)
    setCookie("s", s, 30)
    
    return `${h}hr ${m}mins`
}

// For Options Below
openOptions.addEventListener('click', () => {
    isSectionVisible = !isSectionVisible;
    toggleSectionVisibility();
    btnclick2.play()
})
  
document.addEventListener('click', (event) => {
    if (isSectionVisible && !options.contains(event.target) && event.target !== openOptions && event.target !== bar1 && event.target !== bar2 && event.target !== bar3) {
        isSectionVisible = false;
        toggleSectionVisibility()
    }
})

function toggleSectionVisibility() {
    const openOptionsRect = openOptions.getBoundingClientRect()
    options.style.top = openOptionsRect.bottom + -5 + 'px'
    options.style.left = openOptionsRect.left + -160 + 'px'
    options.classList.toggle('options', !isSectionVisible);
}
// For Options Above

startButtn.addEventListener('click', () => {
    fsec.style.transform = 'translatey(-500px)'
    fsecCountDown(500)
    btnclick2.play()
})

function fsecCountDown(time) {
    setTimeout( () => {
        setGame()
        inputGames.focus()
        inputGames.value = 10
        statsOpen.disabled = true
        startButtn.disabled = true
    }, time)
}

function setGame() {
    document.title = 'Set Game'
    setsec.style.display = 'inherit'
    setsec.classList.add('section-down')
    setsec.style.transform = 'scale(1)'
    back.style.transform = 'scale(1)'
    gSec.style.transform = 'scale(1)'
    fsec.style.display = 'none'
    back.style.display = 'inherit'
    setsecWarning.textContent = ''
    timer.textContent = ``
    closer.disabled = false
    festbut.disabled = false
    secbut.disabled = false
    tedbut.disabled = false
    toGsecBtn.disabled = true
    setsecCountDownAni(500)
    festbut.style.backgroundColor = 'transparent'
    secbut.style.backgroundColor = 'transparent'
    tedbut.style.backgroundColor = 'transparent'
    festbut.style.color = 'black'
    secbut.style.color = 'black'
    tedbut.style.color = 'black'
}

function setsecCountDownAni(time) {
    setTimeout( () => {
        toGsecBtn.disabled = false
    }, time)
}

function toGsec() {
    if(inputGames.value == `` || inputGames.value < 1 || inputGames.value > 100){
        setsecWarning.textContent = `Write A Number From 1 - 100`
        failed.currentTime = 0
        failed.play()
    }else if (settings.style.display == 'inherit'){
        setsecWarning.textContent = `Close Settings To Continue`
        failed.play()
    }else {
        setsec.style.transform = 'scale(0)'
        setsecCountdown(500)
        back.style.transform = 'scale(0)'
        rounds = parseInt(inputGames.value)
        roundsPoints = parseInt(inputGames.value)
        divwarn.textContent = '*division with remainder\'s are rounded up'
        toGsecBtn.disabled = true
        body.style.cursor = 'progress'
        document.title = 'Good Luck!!!'
        format()
        btnclick2.play()
    }
}

function setsecCountdown(time) {
    setTimeout( () => {
        winsound.volume = sfxVol()
        gSec.classList.add('section-down')
        gSec.style.display = 'inherit'
        setsec.style.display = 'none'
        back.style.display = 'none'
        score.textContent = `0 / ${roundsPoints}`
        easyLvl.disabled = true
        mediumLvl.disabled = true
        hardLvl.disabled = true
        playtimeCounter = setInterval(playtimeShow, 1000)
        statsOpen.disabled = true
        body.style.cursor = 'initial'
        document.title = 'Maths Game ➗'
        gameStart()
    }, time)
}
 
function gameStart() {
    if(rounds > 0 && noClose){
        gameTiming = setInterval(gameCountdown, level)
        countdownTime = 3
        rounds--
        tgp++
        setCookie("tgp", tgp, 30)
        scoreUpdate()
    }else{
        finishGame()
        fv = 0
    }
    fv = 0
}

function finishGame() {
    const buttonRect = gSec.getBoundingClientRect()
    gamefSec.style.display = 'inherit'
    gamefSec.style.bottom = buttonRect.top + -18 + 'px' 
    gamefSec.style.left = buttonRect.left + -123 + 'px'
    closeQues.style.display = 'none'
       
    closer.disabled = true
    festbut.disabled = true
    secbut.disabled = true
    tedbut.disabled = true
    let avgPoints = parseFloat((points/roundsPoints).toPrecision(1))
    scoreShow.textContent = `${points} / ${roundsPoints}`
    clearInterval(playtimeCounter)

    if(avgPoints == 1) {
        comment.textContent = `You Deserve A Medal💎`
        winsound.currentTime = 0
        winsound.play()
    }else if(avgPoints == 0.9) {
        comment.textContent = 'You\'re A Genius😏'
        yes.play()
    }else if(avgPoints == 0.8) {
        comment.textContent = 'Niiice!'
        yes.play()
    }else if(avgPoints == 0.7) {
        comment.textContent = 'You Might Be A Maths Lord'
        littleWin.play()
    }else if(avgPoints == 0.6) {
        comment.textContent = 'You Are Doing Great'
        littleWin.play()
    }else if(avgPoints == 0.5) {
        comment.textContent = 'You Tried'
        littleWin.play()
    }else if(avgPoints === 0.4) {
        comment.textContent = 'All You Had To Do Was Go To School'
        failed2.play()
    }else if(avgPoints == 0.3) {
        comment.textContent = 'I thought You Had A Future'
        failed2.play()
    }else if(avgPoints == 0.2) {
        comment.textContent = 'Why Have You Been Schooling All These Years'
        failed2.play()
    }else if(avgPoints == 0.1) {
        comment.textContent = 'Now I Know Why Your Dad Left You'
        extremefail.play()
    }else{
        comment.textContent = 'Why Were You Born'
        extremefail.play()
    }

    if(avgPoints >= 0.8) {
        comment.style.color = 'rgb(100, 200, 100)'
    }else if(avgPoints >= 0.4) {
        comment.style.color = 'rgb(200, 200, 100)'
    }else{
        comment.style.color = 'rgb(200, 100, 100)'
    }
}

function gameCountdown() {
    timer.textContent = `${countdownTime}`
    countdownTime--

    if(countdownTime < 0) {
        noPlay()
        clearInterval(gameTiming)
    }
}

function reset() {
    timer.textContent = ''
    festbut.style.backgroundColor = 'transparent'
    secbut.style.backgroundColor = 'transparent'
    tedbut.style.backgroundColor = 'transparent'
    festbut.disabled = false
    secbut.disabled = false
    tedbut.disabled = false
    festbut.style.color = 'black'
    secbut.style.color = 'black'
    tedbut.style.color = 'black'
    fv--
    format()
    gameStart()
}

function scoreUpdate() {
    let avgPoints = parseFloat((points/roundsPoints).toPrecision(1))

    if (avgPoints <= 0.3) {
        score.style.color = 'rgb(200, 70, 70)'
    }else if (avgPoints >= 0.4 && avgPoints <= 0.7) {
        score.style.color = 'rgb(200, 200, 50)'
    }else if(avgPoints >= 0.8) {
        score.style.color = 'rgb(50, 200, 50)'
    }
}

//Important Code Below
function getRandomNuber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomOperator(){
    const operators = ["+","-","*","/"]
    const randomIndex = Math.floor(Math.random() * operators.length)
    return operators[randomIndex]
}

function generateValidExpression(){
    let num1, num2, expression, evaluated
    operator = getRandomOperator()

    do{
        num1 = getRandomNuber(1, 150)
        num2 = getRandomNuber(1, 150)
        expression = `${num1} ${operator} ${num2}`
        evaluated = eval(expression)
    }while (num1 <= num2 || evaluated != Math.floor(evaluated))

    return expression
}

function evaluateExpression(expression){
    return eval(expression)
}

function addValues(){
    return btnVal = Math.floor(Math.random() * result) + 1   
}

function win() {
    festbut.disabled = true
    secbut.disabled = true
    tedbut.disabled = true
    festbut.style.color = 'white'
    secbut.style.color = 'white'
    tedbut.style.color = 'white'
    points++
    score.textContent = `${points} / ${roundsPoints}`
    timer.textContent = 'You Win😀'
    clearInterval(gameTiming)
    loopGame(1000)
    winsound2.currentTime = 0
    tgw++
    setCookie("tgw", tgw, 30)
    winsound2.play()
}

function lose() {
    festbut.disabled = true
    secbut.disabled = true
    tedbut.disabled = true
    festbut.style.color = 'white'
    secbut.style.color = 'white'
    tedbut.style.color = 'white'
    timer.textContent = 'You Lose😑'
    clearInterval(gameTiming)
    loopGame(1000)
    tgf++
    setCookie("tgf", tgf, 30)
    failed.currentTime = 0
    failed.play()
}

function noPlay() {

    if(festbut.textContent == result){
        festbut.style.backgroundColor = 'green'
    }else{
        festbut.style.backgroundColor = 'red'
    }

    if(secbut.textContent == result){
        secbut.style.backgroundColor = 'green'
    }else{
        secbut.style.backgroundColor = 'red'
    }

    if(tedbut.textContent == result){
        tedbut.style.backgroundColor = 'green'
    }else{
        tedbut.style.backgroundColor = 'red'
    }

    lose()
}

function loopGame(time) {
    setTimeout( () => {
        if (noClose) {
            reset()
        }
    }, time)
}

function quickGame(time) {
    setTimeout( () => {
        fsec.style.display = 'none'
        rounds = 10
        roundsPoints = 10
        gSec.style.display = 'inherit'
        gSec.classList.add('section-down')
        score.textContent = `0 / ${roundsPoints}`
        easyLvl.disabled = true
        mediumLvl.disabled = true
        hardLvl.disabled = true
        closer.disabled = false
        gSec.style.transform = 'scale(1)'
        playtimeCounter = setInterval(playtimeShow, 1000)
        document.title = 'Maths Game'
        gameStart()
    }, time)
}

function format() {
    validExpression = generateValidExpression()
    result = String(Math.floor(evaluateExpression(validExpression))) 
    expression.textContent = validExpression.replace("/","➗").replace("*","✖")
    
    
    let buttons = [festbut, secbut, tedbut], buttonIndex = Math.floor(Math.random() * buttons.length)
    let randomButton = buttons[buttonIndex]

    festbut.textContent = addValues()
    secbut.textContent = addValues()
    tedbut.textContent = addValues()

    randomButton.textContent = result
    
    while(festbut.textContent == secbut.textContent || secbut.textContent == tedbut.textContent || tedbut.textContent == festbut.textContent) {
        format()
    }
}
//Important Code Above

// Button Checking Answers Below
function festBut() {
    if(festbut.textContent == result) {
        festbut.style.backgroundColor = 'green'
        win()
    } else if(secbut.textContent == result){
        festbut.style.backgroundColor = 'red'
        secbut.style.backgroundColor = 'green'
        lose()
    }else{
        festbut.style.backgroundColor = 'red'
        tedbut.style.backgroundColor = 'green'
        lose()
    }
}

function secBut() {
    if(secbut.textContent == result) {
        secbut.style.backgroundColor = 'green'
        win()
    } else if(festbut.textContent == result){
        secbut.style.backgroundColor = 'red'
        festbut.style.backgroundColor = 'green'
        lose()
    }else{
        secbut.style.backgroundColor = 'red'
        tedbut.style.backgroundColor = 'green'
        lose()
    }
}

function tedBut() {
    if(tedbut.textContent == result) {
        tedbut.style.backgroundColor = 'green'
        win()
    } else if(festbut.textContent == result){
        tedbut.style.backgroundColor = 'red'
        festbut.style.backgroundColor = 'green'
        lose()
    }else{
        tedbut.style.backgroundColor = 'red'
        secbut.style.backgroundColor = 'green'
        lose()
    }
}
// Button Checking Answers Below

back.addEventListener('click', () => {
    if(setsec.style.display == 'inherit') {
        setsec.style.transform = 'scale(0)'
        back.style.transform = 'scale(0)'
        setsecWarning.textContent = ``
        backToFsecCountdown(500)
        statsOpen.disabled = false
        btnclick2.play()
    }
})

function backToFsecCountdown(time) {
    setTimeout( () => {
        setsec.style.display = 'none'
        fsec.classList.add('section-down')
        fsec.style.display = 'inherit'
        fsec.style.transform = 'translatey(2px)'
        back.style.display = 'none'
        inputGames.value = ``
        fsecSectionDownAni(500)
        document.title = 'Maths Game ➗'
    }, time)
}

function fsecSectionDownAni(time) {
    setTimeout( () => {
        startButtn.disabled = false
    }, time)
}

closer.addEventListener('click', () => {
    close()
    noClose = false
})

function close() {
    closeQues.style.display = 'inherit'
    gSec.style.opacity = '0.5'
    const closerRect = gSec.getBoundingClientRect()
    closeQues.style.bottom = closerRect.top + 85 + 'px' 
    closeQues.style.left = closerRect.left + 29.7 + 'px'

    clearInterval(gameTiming)
    clearInterval(loopgame)
    clearInterval(playtimeCounter)
    festbut.disabled = true
    secbut.disabled = true
    tedbut.disabled = true
    closer.disabled = true
}

function endClose() {
    closeQues.style.display = 'none'
    festbut.disabled = false
    secbut.disabled = false
    tedbut.disabled = false
    closer.disabled = false
    noClose = true
    gSec.style.opacity = '1'
    if(settings.style.display == 'none'){
        gameTiming = setInterval(gameCountdown, level)
        playtimeCounter = setInterval(playtimeShow, 1000)
    }
    btnclick2.play()
}

function closeGsec() {
    if(closeQues.style.display == 'inherit') {
        failed2.play()
        qts++
        setCookie("qts", qts, 30)
    }
    inputGames.value = ``
    gSec.style.opacity = '1'
    gSec.style.transform = 'scale(1.1)'
    closeQues.style.display = 'none'
    easyLvl.disabled = false
    mediumLvl.disabled = false
    hardLvl.disabled = false
    statsOpen.disabled = false
    lvlCheat = false
    noClose = true
    clearInterval(gameTiming)
    clearInterval(loopgame)
    clearInterval(playtimeCounter)
    gSecCloseCountdown1(400)
    fsecSectionDownAni(1300)
}

function gSecCloseCountdown1(time) {
    setTimeout( () => {
        gSec.style.transform = 'scale(0)'
        updateStats()
        gSecCloseCountdown(350)
    },time)
}

function gSecCloseCountdown(time) {
    setTimeout( () => {
        gSec.style.display = 'none'
        fsec.classList.add('section-down')
        fsec.style.display = 'inherit'
        fsec.style.transform = 'translatey(2px)'
        points = 0
        rounds = 0
    }, time)
}  

function gameContinue() {
    gamefSec.style.display = 'none'
    closeGsec()
    winSound()
    toGsecBtn.disabled = false
    btnclick2.play()
}

function gameReset() {
    easyLvl.disabled = false
    mediumLvl.disabled = false
    hardLvl.disabled = false
    points = 0
    gamefSec.style.display = 'none'
    gSec.style.display = 'none'
    setGame()    
    btnclick2.play()
    winSoundReducerCount = winsound.volume / 10
    winSoundReducer = setInterval(winSound, 500)
}

function winSound() {
    if ( winsound.currentTime > 0 && winSoundReducerCount > 0) {
        winsound.volume = winsound.volume - winSoundReducerCount
    }else{
        winsound.pause()
        clearInterval(winSoundReducer)
    }
}

document.addEventListener('keydown', (event) => {
    if(fv == 0){
        if (event.altKey && event.key == '1') {
            if (gSec.style.display == 'inherit' && rounds > 0) {
                festBut()
                fv++
            }
        }
    
        if(event.altKey && event.key == '2') {
            if(gSec.style.display == 'inherit' && rounds > 0) {
                secBut()
                fv++
            }
        }
    
        if(event.altKey && event.key == '3') {
            if(gSec.style.display == 'inherit' && rounds > 0) {
                tedBut()
                fv++
            }
        }
    }

    if (event.key == 'Enter') {
        if (setsec.style.transform == 'scale(1)') 
            if (toGsecBtn.disabled == false) 
                toGsec()
    }

    if(event.altKey && (event.key == 's' || event.key == 'S')) {
        settingsOpen()
        options.classList.toggle('options')
        isSectionVisible = !isSectionVisible
    }

    if(event.altKey && (event.key == 'h' || event.key == 'H')) {
        if (htp.style.display != 'inherit') {
            htpOpen()
            options.classList.toggle('options')
            isSectionVisible = !isSectionVisible
        }else{
            htp.style.display = 'none'
            btnclick2.play()
        }
    }

    if(event.key === "Escape" ){
        if(gamefSec.style.display == 'inherit')
            gameContinue()
        else if(closeQues.style.display == 'inherit')
            endClose()
        else if(settings.style.display == 'inherit'){
            if(gSec.style.display == 'inherit' && closeQues.style.display == 'none'){
                gameTiming = setInterval(gameCountdown, 500)
            }
            settings.style.display = 'none'
            btnclick2.play()
        }else if(htp.style.display == 'inherit')
            htp.style.display = 'none'
    }

    if(event.altKey && event.key == "Backspace"){
        if(setsec.style.display == 'inherit'){
            if(setsec.style.display == 'inherit') {
                setsec.style.transform = 'scale(0)'
                back.style.transform = 'scale(0)'
                setsecWarning.textContent = ``
                statsOpen.disabled = false
                backToFsecCountdown(500)
            }
        }else if(gSec.style.display == 'inherit'){
            statsOpen.disabled = false
            close()
        }
    }

    if(event.altKey && (event.key == 'q' || event.key == 'Q')) {
        if (gSec.style.display == 'none' && fsec.style.display == 'inherit') {
            format()
            fsec.style.transform = 'translatey(-500px)'
            quickGame(500)
            divwarn.textContent = '*division with remainder\'s are rounded up'
            festbut.style.backgroundColor = 'transparent'
            secbut.style.backgroundColor = 'transparent'
            tedbut.style.backgroundColor = 'transparent'
            festbut.style.color = 'black'
            secbut.style.color = 'black'
            tedbut.style.color = 'black'
            festbut.disabled = false
            secbut.disabled = false
            tedbut.disabled = false
            timer.textContent = ''
            btnclick1.play()
            document.title = 'Good Luck!!!'
        }else if(gSec.style.display == 'inherit') {
            clearInterval(loopgame)
            clearInterval(gameTiming)
            finishGame()
        }
    }

    if(event.altKey && event.key == 'V') {
        musicVolume.value++
        sfxVolume.value++
        sfxVol()
        musicVol()
    }else if(event.altKey && event.key == 'v') {
        musicVolume.value--
        sfxVolume.value--
        sfxVol()
        musicVol()
    }

    if(setsec.style.display == 'inherit') {
        switch(event.key){
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
            case 'Backspace':
            case 'Delete':
            case 'Enter':
                keypress.currentTime = 0
                keypress.play()
            break
        }
    }
})
