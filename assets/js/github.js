if (window.location.href === 'https://bbothell.me/github' ||
    window.location.href === 'https://bbothell.me/github.html' ||
    window.location.href === 'http://127.0.0.1:8000/github.html') {
    $(document).ready(main)
}

function main () {
    $.getJSON('https://api.github.com/users/jasonhaxstuff/repos?sort=updated', data => {
        data.sort((a, b) => {
            const stars = b.stargazers_count - a.stargazers_count
            
            if (stars !== 0) {
                return stars
            }
            
            const watches = b.watchers_count - a.watchers_count
            
            if (watches !== 0) {
                return watches
            }

            return b.forks_count - a.forks_count
        })
        
        data.forEach(repo => {
            if (repo.fork) return
            
            const col = document.createElement('div')
            const card = document.createElement('div')    // ^
            const link = document.createElement('a')      // ^
            const body = document.createElement('div')    // >
            const title = document.createElement('h6')    // ^
            const titleLink = document.createElement('a') // ^
            const desc = document.createElement('p')      // <
            
            const list = document.getElementById('repos')
            
            desc.classList.add('text-muted')
            desc.classList.add('card-text')
            desc.innerHTML = repo.description
            
            title.appendChild(titleLink)
            titleLink.setAttribute('href', repo.html_url)
            titleLink.innerHTML = repo.name
            
            body.classList.add('card-body')
            body.appendChild(title)
            body.appendChild(desc)
            
            link.setAttribute('href', '#')
            
            card.classList.add('card')
            card.classList.add('border-0')
            card.appendChild(link)
            card.appendChild(body)
            
            col.classList.add('col-md-6')
            col.classList.add('col-lg-4')
            col.appendChild(card)
            
            list.appendChild(col)
        })
    })
}
