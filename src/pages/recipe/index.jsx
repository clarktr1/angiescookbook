import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";


import { Helmet } from "react-helmet";

import { client } from "../../api";
import ShareWidget from "../../components/share";

export default function RecipePage() {
  const uuid = useParams().uuid;
  const [recipe, setData] = useState({});
  const [count, setCount] = useState(0);
  const [totalIngredients, setTotalIngredients] = useState(0);
  const navigate = useNavigate();




  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      setCount((prevCount) => prevCount + 1);
    } else {
      setCount((prevCount) => prevCount - 1);
    }
  };

  const textMap = {
    "heading-1": "text-2xl",
    "heading-2": "text-xl",
    "heading-3": "text-lg",
    paragraph: "text-base",
  };

  useEffect(() => {
    async function fetchData() {
      const response = await client.getEntries({
        content_type: "recipe",
        "fields.recipeSlug": uuid,
      });
      setData(response.items[0]?.fields || {});
      setTotalIngredients(response.items[0]?.fields.recipeIngredients.length || 0);
    }
    fetchData();
  }, [recipe]);


  if (!recipe) {
    return <p>Loading...</p>;
  } else if (Object.keys(recipe).length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Recipe Not Found</h1>
        <p className="text-gray-600">The recipe you are looking for does not exist.</p>
      </div>
    );
  } else {
      return (
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <i
          onClick={() => navigate(-1)}
            className=" fas fa-arrow-left px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-green-600 transition"
          />
        <title>{recipe.recipeTitle}</title>
        <Helmet>
          <meta name="description" content={recipe.recipeDescription?.content[0].content[0].value}/>
          <meta property="og:title" content={recipe.recipeTitle} />
          <meta property="og:description" content={recipe.recipeDescription?.content[0].content[0].value}/>
          <meta property="og:image" content={recipe.recipeImage?.fields.file.url} />
          <meta property="og:url" content={`https://accookbook.com/recipes/${recipe.recipeSlug}`}/>
          <meta property="og:title" content="Angie's Cookbook" />
        </Helmet>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {recipe.recipeTitle}
          </h1>
          
          <ShareWidget recipe={recipe} />
        </div>
        <p className="w-full text-gray-600 text-md mb-4">
          {recipe.recipeCategory?.charAt(0) + recipe.recipeCategory?.substring(1).toLowerCase()} | Time: {recipe.recipeTime}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {recipe.recipeTags?.map((tag, index) => (
            <p
              key={index}
              className="text-sm mr-2 border border-red-100 rounded-sm px-2 py-1 bg-red-200"
            >
              {tag}
            </p>
          ))}
        </div>
        <img
          src={recipe.recipeImage?.fields.file.url}
          alt={""}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Description</h2>
        {recipe.recipeDescription?.content.map((item, index) => {
          let size = textMap[item.nodeType];
          let bold =
            size === "text-2xl" || size === "text-xl" || size === "text-lg"
              ? "font-bold"
              : "";
          let styling = `${textMap[item.nodeType]} ${bold} text-gray-700 mb-4`;
          return (
            <p key={index} className={styling}>
              {item.content[0].value}
            </p>
          );
        })}
        <h2 className="text-2xl font-semibold text-gray-700 mt-5 mb-2">
          Ingredients
        </h2>
        <p className="text-md mb-4">
          Click the checkboxes to mark off your ingredients!
        </p>
        <p
          className={`${
            count != totalIngredients ? "text-red-600" : "text-green-600"
          }`}
        >
          {count}/{totalIngredients}
        </p>
        <ul className="list-decimal list-inside mb-4 list-none">
          {recipe.recipeIngredients?.map((ingredient, index) => (
            <li key={index} className="text-gray-700">
              <input
                type="checkbox"
                className=" mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm"
                onChange={handleCheckboxChange}
              />
              {ingredient}
            </li>
          ))}
        </ul>
        <div className="w-60 flex justify-center items-center mb-6">
          <p className="text-green-600 font-semibold text-center">
            {totalIngredients === count ? "Ready to Go! Good luck!!" : "\u00A0"}
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Instructions
        </h2>
        <ol className="list-decimal list-inside mb-4">
          {recipe.recipeInstructions?.map((recipe, index) => (
            <li key={index} className="mb-6">
              <span>{recipe}</span>
            </li>
          ))}
        </ol>
      </div>
      );
  }  
}
