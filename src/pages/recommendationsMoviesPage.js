import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import PlaylistAddIcon from '../components/cardIcons/addToPlaylist'
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import { getRecommendationsMovies } from "../api/tmdb-api";

const RecommendationsMoviesPage = (props) => {
  const todoId = props.match.params.id;
  const {  data , error, isLoading, isError }  = useQuery(['recommendations', {id: todoId}], getRecommendationsMovies);

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const recommendations = data.results;
  console.log(recommendations);

  // const [recommendations,setRecommendations] = useState([]);
  // const {id} = props.match.params;
  // useEffect(()=>{
  //   getRecommendationsMovies(id).then(res=>{
  //         setRecommendations(res)
  //     })
  // },[id]);  

  return (
    <PageTemplate
      title="Recommendations Movies"
      movies={recommendations}
      action={(movie) => {
        return <PlaylistAddIcon movie={movie} />
      }}
    />
  );
};

export default RecommendationsMoviesPage;