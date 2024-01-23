import data from './dropdownData.js'
        const navEl = document.getElementById('nav')
        const sl = document.createElement('select')
        sl.setAttribute('id','years')
        console.log(sl)
        data.forEach( op => {
            const option = document.createElement('option')
            option.textContent = op.text
            option.value = op.value
            // console.log(option.value)
            if(op.selected){
               option.selected = op.selected
            }

            sl.appendChild(option)   

        })
        navEl.appendChild(sl)

        
const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTM2ZTU1MGIyOGE0NTJjMmNkNmVmNGRiYjNjNTJhMiIsInN1YiI6IjYzOGVjY2NlZmI4MzQ2MDBjY2Q0NWYzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3atHNROpQdtlM9YG0N-rpRYTRMFoRWMAIc0UbDDYLIQ'
            }
          };
const apikey = "cc14d62b76a205387bd8b77c651a5e4a"   
const dropdown = document.getElementById('years') 
let year = dropdown.value
let page = 1
const pagination = document.getElementById('pagination'); 



const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&year=${year}&page=${page}`

const content = document.getElementById('content')

const displayMovies = async(url , op) =>{


    // console.log(url);
    let res
    if(op == 0){
         res = await fetch(url)
    } else {
         res = await fetch(url,options)
    }

    res = await fetch(url)
    const movies = await res.json()
    console.log(movies);
    const urlPoster = `https://image.tmdb.org/t/p/w500`

    movies.results.forEach(M =>{
        const linkto = document.createElement('a')
        linkto.href = `https://www.youtube.com/results?search_query=${M.title}fullmovie`
        const mvEl = document.createElement('div')
        mvEl.classList.add('superContainer')
        const circle = document.createElement('div')
        circle.classList.add('rateContainer')
        const title = document.createElement('h2')
        title.classList.add('title')
        const rate = document.createElement('h4')
        rate.classList.add('rate_text')
        const poster =document.createElement('img')
        poster.classList.add('img')


        title.innerHTML = `${M.title.substring(0,25)}`
        poster.src = `${urlPoster}${M.poster_path}`

        rate.innerHTML = `${M.vote_average}`
        circle.appendChild(rate)
        mvEl.appendChild(circle)
        mvEl.appendChild(title)
        mvEl.appendChild(poster)
        linkto.appendChild(mvEl)
        content.appendChild(linkto)
  
        
    })

   dropdown.addEventListener('change' , ()=>{
    console.log(dropdown.value);
    year = dropdown.value
    let update_url = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&year=${year}&page=1`
    content.innerHTML = ""
    displayMovies(update_url,0)
   })  
}


const onPageChange = (p)=>{
    page = p
    let update_url = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&year=${year}&page=${page}`
    content.innerHTML = ""
    displayMovies(update_url,0)
    pagination.innerHTML = ""
    showpage(p)
 }


  const showpage = (p)=>{
      const totalPages = 10;   
      for (let i = 0; i < totalPages; i++) {
          const pageContainer = document.createElement('div');
          pageContainer.className = 'pagecontainer';     
      
          const pageLink = document.createElement('a');
          pageLink.textContent = i + 1;
          pageLink.addEventListener('click', () => onPageChange(i + 1));
          if(i+1 === p){
            pageLink.classList.add('currentpage');
          }
           console.log(p);
          pageContainer.appendChild(pageLink);
          pagination.appendChild(pageContainer); 
      }
  }



  const searchMovies = async(word)=>{
   
  let _name = word  
  const url_forsearch = `https://api.themoviedb.org/3/search/movie?query=${_name}&include_adult=false&language=en-US&page=1`
  content.innerHTML = ""
  displayMovies(url_forsearch,1)
  }

  const showSearch = ()=>{
    const searchdiv = document.getElementById('search')
    const searchInput = document.createElement('input') 
    searchInput.type ="text"
    searchInput.setAttribute('placeholder',"ค้นหา")
    console.log(searchInput);
    searchInput.addEventListener('change',()=>{searchMovies(searchInput.value)})
    searchdiv.appendChild(searchInput)
  }

        

showSearch()
displayMovies(url)
showpage(page)
