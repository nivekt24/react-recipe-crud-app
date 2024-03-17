import { useNavigate } from 'react-router-dom';

const Searchbar = ({ query, setQuery }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search?q=${query}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="search">Search:</label> */}
        <input
          className="search"
          id="search"
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
      </form>
    </div>
  );
};

export default Searchbar;
