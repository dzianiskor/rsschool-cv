document.querySelector('.btn-container').addEventListener('click', event => {
    if (!event.target.classList.contains('btn-active')) {
        document.querySelector('.btn-container .btn-active').classList.remove('btn-active')
        event.target.classList.add('btn-active')
        const addLetter = event.target.classList.contains('btn-letters')
        document.querySelectorAll('.piano-key').forEach(el => {
            addLetter ? el.classList.add('piano-key-letter') : el.classList.remove('piano-key-letter')
        })
    }
})

const keys = []
document.querySelectorAll('.piano-key').forEach(el => {
    if (typeof el.dataset.letter !== "undefined") {
        keys.push(el.dataset.letter)
    }
    el.addEventListener('mouseover', (event) => {
        if (event.which === 1) {
            clickElement(el)
        }
    })
    el.addEventListener('mousedown', () => {
        clickElement(el)
    })
    el.addEventListener('mouseout', () => {
        clearMousedown()
    })
})

document.addEventListener('keydown', (event) => {
    const button = event.code.substr(3)
    if (keys.indexOf(button) !== -1) {
        const el = document.querySelector(`.piano-key[data-letter=${button}]`)
        clickElement(el)
    }
})

document.addEventListener('keyup', () => {
    clearMousedown()
})

function clickElement(el) {
    el.classList.add('piano-key-active')
    el.classList.add('piano-key-active-pseudo')
    playSound(el)
}

function playSound(el) {
    const sound = document.getElementById(`note-${el.dataset.note}`)
    sound.paused ? sound.play() : sound.currentTime = 0
}

function clearMousedown() {
    document.querySelectorAll('.piano-key.piano-key-active.piano-key-active-pseudo').forEach(el => {
        el.classList.remove('piano-key-active')
        el.classList.remove('piano-key-active-pseudo')
    })
}

document.querySelector('.openfullscreen').addEventListener('click', () => {
    toggleFullScreen()
})

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        }
    }
}
