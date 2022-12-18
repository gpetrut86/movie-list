import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import MovieList from './components/MovieList/MovieList'
import Navbar from './components/Navbar/Navbar'
import NavLinks from './components/NavLinks/NavLinks'
import Pagination from './components/Pagination/Pagination'
import MoonLoader  from "react-spinners/MoonLoader";

function App() {
  const [movies, setMovies] = useState([])
  const [category, setCategory] = useState([])
  const [search, setSearch] = useState('')
  const [isSearch, setIsSearch] = useState(false)
  const [originalMovies, setOriginalMovies] = useState([])
  const [originalTotalPages, setOriginalTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const [favorites, setFavorites] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [currentCategory, setCurrentCategory] = useState(0)
  const [loading, setLoading] = useState(true)

  const apiKey = '79ef9d6b24ec0269b636b4b02b69e5e8';

 let _page = 1;


 function resetPage(){
    _page = 1;
    setPage(_page)
  }

  useEffect(() => {
    setLoading(true)
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`)
    .then(res => {
      setMovies(res.data.results)
      setOriginalMovies(res.data.results)
      setTotalPages(res.data.total_pages)
      setOriginalTotalPages(res.data.total_pages)

    })
    .catch(err => {console.log(err)})
    .finally(() => { setLoading(false)})


    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
    .then(res => {
      setCategory(res.data.genres)
    })

    setFavorites(JSON.parse(localStorage.getItem('favorite-movie-list')))


  }, [])

useEffect(() => {
  setLoading(true)
  const delaySearch = setTimeout(() => {

  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${search}&page=1`)
  .then(res => {
    if (res.data.results.length > 0) {
      setMovies(res.data.results)
      resetPage();
      setTotalPages(res.data.total_pages)
      setCurrentCategory(0)
      setIsSearch(true)
    }
    else
    {
      setMovies([])
      resetPage();
      setTotalPages(1)
      setCurrentCategory(0)
      setIsSearch(true)
    }
  })
  .catch(err => {console.log(err)})
  .finally(() => { setLoading(false)})

  }, 500)

  return () => {
    resetToOriginalState();
    clearTimeout(delaySearch)
  }

 

}, [search])

function backtoOriginalMovies() {
  setSearch('');
   resetToOriginalState()
}



  function resetToOriginalState() {
    setMovies(originalMovies)
    resetPage()
    setTotalPages(originalTotalPages)
    setCurrentCategory(0)
    setIsSearch(false)
  }

  
  function HanndleApiCall(num) {
    if (isSearch) {
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${search}&page=${num}`)
        .then(res => {
          setMovies(res.data.results)
        })
    } else if (currentCategory !== 0) {
      axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language
    =en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${num}&with_genres=${currentCategory}`)
        .then(res => {
          setMovies(res.data.results)
        })
        .catch(err => { console.log(err) })
    } else {
      axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${num}`)
        .then(res => {
          setMovies(res.data.results)
        })
        .catch(err => { console.log(err) })
    }
  }


  const changePage = (num) => {
    let _num= parseInt(num)

    if(isNaN(_num))
    {
      _num = 0
    }

    if(_num === 0 || _num > totalPages){
      setMovies([])
    }


    setPage(_num)
    HanndleApiCall(_num)

  }



function loadMore(num) {
 
  _page = page + num;
  _page = _page > totalPages ? totalPages : _page;
 
  setPage(_page)

  HanndleApiCall(_page)
}

const AddToFavorites = (movie) => {
  let newFavorites = []
  if(favorites){
    newFavorites = [...favorites, movie]
  }
  else{
    newFavorites = [movie]
  }

 
  setFavorites(newFavorites)
  localStorage.setItem('favorite-movie-list', JSON.stringify(newFavorites))

}

const RemoveFromFavorites = (movie) => {
  const newFavorites = favorites.filter(fav => fav.id !== movie.id)

  if(movies === favorites){
    setMovies(newFavorites)
  }

  setFavorites(newFavorites)
  localStorage.setItem('favorite-movie-list', JSON.stringify(newFavorites))


  
}

function HandleFavorites()
{
  setMovies(favorites)
  setTotalPages(1)
  resetPage();
}

const HandelCategory = (cat) => {
  axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${cat}`)
  .then(res => {
    setMovies(res.data.results)
    resetPage();
    setTotalPages(res.data.total_pages)
    setCurrentCategory(cat)
  })
  .catch(err => {console.log(err)})
}



  return (
    <div className = "App">

      <Navbar
      back = {backtoOriginalMovies}
      search = {search}  
      setSearch = {setSearch}  
      setIsSearch = {setIsSearch} 
        />

      
      {loading ? <MoonLoader  className='loading-element' color="#2f3542" /> :
<>
      


      <div className="navigation-container">
          <NavLinks
          category = {category}
          HandleFavorites = {HandleFavorites}
          HandelCategory = {(cat) => HandelCategory(cat)}
          favorites = {favorites}
          />

          < Pagination
          page = {page} 
          loadMore = {loadMore}
          totalPages = {totalPages}
          changePage = {changePage}
          />
        </div>
    

        
        <MovieList
          movies = {movies} 
          addToFavorites = {(movie) => AddToFavorites(movie)} 
          removeFromFavorites = {(movie) => RemoveFromFavorites(movie)} 
          favorites={favorites} 
          back = {backtoOriginalMovies}
        
          />

        < Pagination
          page = {page} 
          loadMore = {loadMore}
          totalPages = {totalPages}
          changePage = {changePage}
          />
        </>

  }
    </div>
  )
}

export default App
