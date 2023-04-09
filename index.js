const contantMain = document.querySelector('.content-main');
const totalItemsElement = document.querySelector('.content-header-count');
const themeBtn = document.querySelector('.theme-bth');
const root = document.querySelector(':root');

const sunSVG = `
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sun" viewBox="0 0 16 16">
        <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
    </svg>
`

const moonSVG = ` 
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" class="bi bi-moon-fill" viewBox="0 0 16 16">
        <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
    </svg>
`

class FetchApi {
    page = 1;

    async getCard() {
        try {
            const response = await fetch(`https://picsum.photos/v2/list?page=${this.page}&limit=9`);
            const data = await response.json();
            this.page += 1;
            return data;
        } catch (e) {
            console.log(e);
        }
    }
}

class UI {
    totalItems = 0;

    displayTotalItems(amountItems = 0) {
        this.totalItems += amountItems
        totalItemsElement.innerText = this.totalItems + ' items'
    }

    displayCards(cards) {
        let result = cards.map(getCardTemplate);

        this.displayTotalItems(cards.length)
        contantMain.insertAdjacentHTML('beforeend', result.join(''));
    }

    onShowMore() {
        contantMain.addEventListener('click', (event) => {
            const element = event.target;

            if (element.classList.contains('show-more-btn')) {

                const textElement = element.parentElement.querySelector('.card-text')
                if (element.innerText === 'Show more...') {
                    element.innerText = 'Show less...';
                    textElement.classList.toggle('__show-text');
                    return;
                }

                element.innerText = 'Show more...';
                textElement.classList.toggle('__show-text');
            }
        })
    }

    checkHeightCardText() {
        const textElements = [...document.querySelectorAll('.card-text span')];

        textElements.forEach(textElement => {
            if (textElement.offsetHeight <= 48) {
                const showBtn = textElement.parentElement.parentElement.querySelector('.show-more-btn');
                showBtn.style.visibility = 'hidden'
            }
        })
    }

    toggleTheme() {
        themeBtn.addEventListener('click', () => {
            themeBtn.innerHTML = '';
            if (root.classList.contains('__dark')) {
                themeBtn.insertAdjacentHTML('beforeend', sunSVG)
            } else {
                themeBtn.insertAdjacentHTML('beforeend', moonSVG)
            }
            root.classList.toggle('__dark');
        })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    const fetchApi = new FetchApi();

    fetchApi.getCard()
        .then(cards => ui.displayCards(cards))
        .then(() => ui.checkHeightCardText());

    ui.onShowMore();

    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        const scrolledToBottom = scrollTop + clientHeight >= scrollHeight;

        if (scrolledToBottom) {
            fetchApi.getCard()
                .then(cards => ui.displayCards(cards))
                .then(() => ui.checkHeightCardText());
        }
    });
    
    ui.toggleTheme();
})

const mockRandomText = [
    'Here goes some sample, example text that is relatively short.',
    'And here full text doesn’t fit, and at the very end of it we should show a truncatio we should show a truncatio we should show a truncatio we should show a truncatio',
    'And here full text doesn’t fit, and at the very end of it we should show a truncatio we should show a truncatio we should show a truncatio we And here full text doesn’t fit, and at the very end of it we should show a truncatio we should show a truncatio we should show a truncatio we should show a truncatio And here full text doesn’t fit, and at the very end of it we should show a truncatio we should show a truncatio we should show a truncatio we should show a truncatio And here full text doesn’t fit, and at the very end of it we should show a truncatio we should show a truncatio we should show a truncatio we should show a truncatio should show a truncatio And here full text doesn’t fit, and at the very end of it we should show a truncatio we should show a truncatio we should show a truncatio we should show a truncatio And here full text doesn’t fit, and at the very end of it we should show a truncatio we should show a truncatio we should show a truncatio we should show a truncatio And here full text doesn’t fit, and at the very end of it we should show a truncatio we should show a truncatio we should show a truncatio we should show a truncatio And here full text doesn’t fit, and at the very end of it we should show a truncatio we should show a truncatio we should show a truncatio we should show a truncatio And here full text doesn’t fit, and at the very end of it we should show a truncatio we should show a truncatio we should show a truncatio we should show a truncatio'
];


function getCardTemplate(card) {
    const {author, download_url, id} = card;
    return (
        `
            <div class="col-md-6">
                <div class="card">
                    <div class="card-img-top overflow-hidden" style="height: 200px;">
                        <img src=${download_url} class="w-100 h-100 object-fit-cover" alt=${author + '-' + 'photo' + '-' + id}>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${author}</h5>
                        <p class="card-text mb-1">
                            <span>
                                 ${mockRandomText[Math.floor(Math.random() * 3)]}
                            </span>
                        </p>

                        <button class="show-more-btn text-dark fw-medium border-0 bg-transparent" data-id=${id}>
                            Show more...
                        </button>

                    </div>

                    <div style="border-bottom: 1px solid #EBEBEB;"></div>

                    <div class="card-body">
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                        <a href="#" class="btn btn-outline-secondary ms-1">Share</a>
                    </div>
                </div>
            </div>
            `
    )
}