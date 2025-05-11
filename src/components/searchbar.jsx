import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('recipeTitle');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!search.trim()) {
      navigate('/recipes/all');
      return;
    }
    navigate(`/recipes/search?category=${category}&value=${search}`);
    setSearch('');
  };

  return (
    <div className="flex justify-center px-4 w-full">

      <div className="flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center bg-white border border-gray-300 rounded-md shadow-md overflow-hidden">
        
        {/* Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-10 px-3 bg-white text-gray-700 border-b sm:border-b-0 sm:border-r border-gray-300 focus:outline-none"
        >
          <option value="recipeTitle">Title</option>
          <option value="recipeCategory">Category</option>
          <option value="recipeTags">Tags</option>
        </select>

        <div className="relative w-full sm:w-96 h-14">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-7 pl-4 pr-10 text-gray-800 focus:outline-none"
        />
          <button
            onClick={handleSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
        
      </div>
    </div>
  );
}
