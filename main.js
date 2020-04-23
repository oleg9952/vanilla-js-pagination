// ----- DOM -----
const getUsersBtn = document.querySelector('.get__users')
const cardsOutput = document.querySelector('.users')
const pagination = document.querySelector('.pagination')
// ----------

const api = 'https://api.github.com/users'

let currentPage = 1
const usersPerPage = 8
let indexOfLastUser = currentPage * usersPerPage
let indexOfFirstUser = indexOfLastUser - usersPerPage

const fetchUsers = async (api) => {
    const req = await fetch(api)
    const res = await req.json()
    return res
}

const renderUsers = (users, target) => {
    target.innerHTML = users.map(user => {
        return `
            <div class="user__card">
                <div 
                    class="user__card-image" 
                    style="background-image: url(${user.avatar_url});"
                ></div>
                <div class="user__card-name">${user.login}</div>
            </div>
    `
    }).join('')
}

const renderPaginBtns = (usersPerPage, totalUsers) => {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i)
    }

    pagination.innerHTML = pageNumbers.map((page, index) => {
        return `
            <li class="pagination__item ${!index ? 'active' : ''}">${page}</li>
        `
    }).join('')
    
    // getting generated btns
    paginBtns = document.querySelectorAll('.pagination__item')
}

const switchPage = (page) => {
    currentPage = page
    // ----- recalc after page change
    indexOfLastUser = currentPage * usersPerPage
    indexOfFirstUser = indexOfLastUser - usersPerPage
}

let users = null
let paginBtns = null

getUsersBtn.addEventListener('click', async () => {
    if (!users) {
        const data = await fetchUsers(api)
        users = data
    }
    const usersOnCurrentPage = users.slice(indexOfFirstUser, indexOfLastUser)

    renderUsers(usersOnCurrentPage, cardsOutput) 
    renderPaginBtns(usersPerPage, users.length)   

})

pagination.addEventListener('click', e => {
    paginBtns.forEach(btn => btn.classList.remove('active'))
    e.target.classList.add('active')

    switchPage(parseInt(e.target.innerText))

    const usersOnCurrentPage = users.slice(indexOfFirstUser, indexOfLastUser)

    cardsOutput.innerHTML = ''

    renderUsers(usersOnCurrentPage, cardsOutput) 
})



