import { useLocation } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import AppNav from '../components/AppNav';
import RecipeList from '../components/RecipeList';

const Search = () => {
  // Extract query from URL
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const query = queryParams.get('q');

  // Construct the URL with the query parameter
  const url = `http://localhost:3000/recipes?q=${query}`;

  // Fetch data using custom hook
  const { error, isLoading, data } = useFetch(url);

  return (
    <>
      <AppNav />

      <div>
        <h2 className="page-title">Recipes including "{query}"</h2>
        {error && <p className="error">{error}</p>}
        {isLoading && <p className="loading">Loading...</p>}
        {data && <RecipeList recipes={data} />}
      </div>
    </>
  );
};

export default Search;
