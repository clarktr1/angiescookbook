import { useEffect, useState } from "react";
import RecipeCard from "../../components/recipecard";
import { client } from "../../api";

export default function AllRecipes() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    async function fetchData(page, limit) {
      const skip = (page - 1) * limit;
      const response = await client.getEntries({
        content_type: "recipe",
        order: "fields.recipeTitle",
        limit,
        skip,
      });
      setData(response.items);
      setTotal(response.total);
    }
    fetchData(currentPage, itemsPerPage);

    const recipeElement = document.getElementById("recipe");
    if (recipeElement) {
      recipeElement.scrollIntoView({ behavior: "smooth" });
    }
    
  }, [currentPage, itemsPerPage]);

  const totalPages = Math.ceil(total / itemsPerPage);
  const showingTo = Math.min(currentPage * itemsPerPage, total);
  const showingFrom = total === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;

  return (
    <div className="w-full flex flex-col items-center px-4">
      <title>Angie's Cookbook</title>
      {/* Header with showing count and items per page */}
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
            className="border rounded px-2 py-1"
          >
            {[6, 12, 18].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Recipe Grid */}
      <div id='recipe' className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center max-w-6xl w-full">
        {data?.length > 0 ? (
          data.map((recipe, index) => <RecipeCard key={index} data={recipe} />)
        ) : (
          <p className="text-gray-500">No recipes found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center space-x-2 mt-8 mb-8">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-4 py-2 font-semibold">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
