const titleInput = document.querySelector('#title')
const descriptionTextarea = document.querySelector('#description')
const addButton = document.querySelector('button')
const cards = document.querySelector('.cards')

let cardsArr;

try {
    cardsArr = JSON.parse(localStorage.cards)

    if (!cardsArr.length) {
        cardsArr = []
        localStorage.cards = ''
    }
    drawCards()
} catch {
    cardsArr = []
}

function drawCards() {
    cards.innerHTML = ''

    for (let i = 0 ; i < cardsArr.length; i++) {
        const card = cardsArr[i]
        cards.appendChild(createCard(i, card))
    }
}

function createCard(i, cardObj) {
    const now = new Date()
    
    const card = document.createElement('article')

    if (cardObj.solved) {
        card.className = 'card card-solved'
    } else {
        card.className = 'card'
    }

    const h2 = document.createElement('h2')
    const p = document.createElement('p')
    const small = document.createElement('small')

    const icons = document.createElement('div')

    h2.innerHTML = cardObj.title
    p. innerHTML = cardObj.description
    small.innerHTML = now.toLocaleDateString() + '' + now.toLocaleTimeString()


    const closeIcon = document.createElement('i')
    const solveIcon = document.createElement('i')

    closeIcon.className = 'card__close'
    solveIcon.className = 'card__solve'

    closeIcon.innerHTML = '✘'
    solveIcon.innerHTML = '✓'

    closeIcon.addEventListener('click', () => {
        cardsArr.splice(i, 1)
        localStorage.cards = JSON.stringify(cardsArr)
        drawCards()
    })

    solveIcon.addEventListener('click', () => {
    const cardTemp = cardsArr.splice(i, 1)[0]
    cardTemp.solved = true
    cardsArr.push(cardTemp)
    localStorage.cards = JSON.stringify(cardsArr)
    drawCards()

    })

    icons.appendChild(closeIcon)
    icons.appendChild(solveIcon)

    card.appendChild(h2)
    card.appendChild(p)
    card.appendChild(small)
    card.appendChild(icons)

    return card
}  

addButton.addEventListener('click', () => {
    const title = titleInput.value
    
    const description = descriptionTextarea.value
    if (title.length === 0 || description.length === 0) return;
    
    cardsArr.unshift({
        title,
        description,
        solved: false
    })

    titleInput.value = ''
    descriptionTextarea.value = ''

    localStorage.cards = JSON.stringify(cardsArr)

    drawCards() 
})