import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { client } from "../../api";
import RecipeCard from '../../components/recipecard';

export default function SearchPage() {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [sort, setSort] = useState('Alphabetical A-Z');
    const totalPages = Math.ceil(total / itemsPerPage);
    const showingTo = Math.min(currentPage * itemsPerPage, total);
    const showingFrom = total === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;

    const handleSort = (sort) => {
        switch (sort) {
            case 'Alphabetical A-Z':
                return 'fields.recipeTitle';
            case 'Alphabetical Z-A':
                return '-fields.recipeTitle';
            case 'Most Recent':
                return '-sys.createdAt';
            case 'Oldest':
                return 'sys.createdAt';
            default:
                return 'fields.recipeTitle';
        }
    }
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const category = query.get('category');
    const value = query.get('value');

    useEffect(() => {
        window.scrollTo(0, 0);
        async function fetchData() {
            const field = `fields.${category}[match]`;
            const response = await client.getEntries({
                content_type: 'recipe',
                [field]: value,
                order: handleSort(sort),
                limit: itemsPerPage,
                skip: (currentPage - 1) * itemsPerPage,
            });        
            setData(response.items);
            setTotal(response.total);
        }
        if (category && value) {
            fetchData();
        }
    }, [category, value]);
    return (
        <div className="w-full flex flex-col items-center">
            <title>Angie's Cookbook - Seach Results</title>
            <h2 className="text-center text-4xl gloria-hallelujah-regular mb-6">Search Results</h2>
             <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-6xl mt-6 mb-4 gap-4">
        <div className="text-gray-700 font-medium">
          Showing {showingFrom}–{showingTo} of {total}
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="itemsPerPage" className="text-gray-600">Items per page:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => {
              setCurrentPage(1); // Reset to page 1 on change
              setItemsPerPage(Number(e.target.value));
            }}
            className="border rounded bg-white px-2 py-1"
          >
            {[6, 12, 18].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <label htmlFor="sort" className="text-gray-600">Sort by</label>
          <select
          id="sort"
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
          }}
          className="border rounded bg-white px-2 py-1"
          >
            {['Alphabetical A-Z', 'Alphabetical Z-A', 'Most Recent', 'Oldest'].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
      </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                {data?.length > 0 ? (
                    data.map((recipe, index) => (
                        <RecipeCard key={index} data={recipe} />
                    ))
                ) : (
                    <p className="text-gray-500 mb-24">No recipes found.</p>
                )}
            </div>
        </div>
    );
}