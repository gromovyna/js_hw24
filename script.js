const input = document.getElementById("input");
const button = document.getElementById("button");
const user_card = document.getElementById("user_card")
const login = () => input.value ;

const fetchUser = async (user) => {
    const request = await fetch(' https://api.github.com/users/' + user)
    let response = await request.json()
    return response
}

function appendUser (user) {
    user_card.innerHTML = ''
    const card = document.createElement('div')
    const avatar = document.createElement('img')
    const repos = document.createElement('p')
    const followers = document.createElement('p')
    const following = document.createElement('p')
    const login = document.createElement('h2')

    login.innerText = `Логін: ${user.login}`
    following.innerText = `Підписки: ${user.following}` 
    followers.innerText = `Підписники: ${user.followers}` 
    repos.innerText = `Публічні Репозиторії: ${user.public_repos}` 
    avatar.src = user.avatar_url

    card.append(login)
    card.append(following)
    card.append(followers)
    card.append(repos)
    user_card.append(avatar)
    user_card.append(card)

}

function appendUndefinedPage () {
    user_card.innerHTML = ''
    const error = document.createElement('p')
    error.innerText = 'Користувача не знайдено!'
    user_card.append(error)
}

button.addEventListener('click', async () => {
    let userLogin = login()
    let user =  await fetchUser(userLogin)
    if(user.message === 'Not Found') {
        appendUndefinedPage()
    } else {
        appendUser(user)
    }
})