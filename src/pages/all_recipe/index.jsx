import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import RecipeCard from "../../components/recipecard";
import logo from "../../assets/leaf.png";
import { client } from "../../api";

export default function AllRecipes() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [sort, setSort] = useState("Alphabetical A-Z");

  const handleSort = (sort) => {
    switch (sort) {
      case "Alphabetical A-Z":
        return "fields.recipeTitle";
      case "Alphabetical Z-A":
        return "-fields.recipeTitle";
      case "Most Recent":
        return "-sys.createdAt";
      case "Oldest":
        return "sys.createdAt";
      default:
        return "fields.recipeTitle";
    }
  };

  useEffect(() => {
    async function fetchData(page, limit) {
      const skip = (page - 1) * limit;
      const response = await client.getEntries({
        content_type: "recipe",
        order: handleSort(sort),
        limit,
        skip,
      });
      setData(response.items);
      setTotal(response.total);
    }
    fetchData(currentPage, itemsPerPage);

    const recipeElement = document.getElementById("recipe-container");
    if (recipeElement) {
      recipeElement.scrollIntoView({ behavior: "smooth" });
    }
    
  }, [currentPage, itemsPerPage, sort]);

  const totalPages = Math.ceil(total / itemsPerPage);
  const showingTo = Math.min(currentPage * itemsPerPage, total);
  const showingFrom = total === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;

  return (
    <div className="w-full flex flex-col items-center px-4">
      <Helmet>
        <title>All Recipes</title>
        <meta name="description" content="Explore all recipes in Angie's Cookbook." />
        <meta property="og:title" content="All Recipes - Angie's Cookbook" />
        <meta property="og:description" content="Explore all recipes in Angie's Cookbook." />
        <meta property="og:image" content={logo} />
        <meta property="og:url" content="https://accookbook.com/recipes" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Angie's Cookbook" />
        <meta property="og:locale" content="en_US" />
      </Helmet>
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
