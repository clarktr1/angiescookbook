import { Link, useNavigate } from 'react-router-dom';
import clock from '../assets/clock.svg';

function TagButton({ tag }) {
    const navigate = useNavigate();

    const handleTagClick = () => {
        navigate(`/recipes/search?category=recipeTags&value=${tag}`);
    };

    return (
        <button
            onClick={handleTagClick}
            className="text-xs font-medium text-red-800 bg-red-100 hover:bg-red-200 rounded-full px-3 py-1 transition-colors duration-200"
        >
            {tag}
        </button>
    );
}

export default function RecipeCard({ data }) {
    if (!data || data.length === 0) {
        return <p>Loading...</p>;
    }

    const fields = data.fields;

    return (
        <div className="w-sm bg-white rounded-xl shadow-md overflow-hidden transition-transform transform hover:scale-[1.01]">
            <Link to={`/recipes/${fields.recipeSlug}`}>
                <img
                    className="w-full h-64 object-cover"
                    src={fields.recipeImage.fields.file.url || ''}
                    alt={fields.recipeTitle || 'Recipe image'}
                />
            </Link>

            <div className="p-5">
                <h3 className="text-2xl font-semibold text-gray-800 mb-1">
                    {fields.recipeTitle}
                </h3>
                <p className="text-sm text-gray-500 mb-3 capitalize">
                    {fields.recipeCategory.charAt(0).toUpperCase() + fields.recipeCategory.slice(1).toLowerCase()}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {fields.recipeTags.map((tag, index) => (
                        <TagButton key={index} tag={tag} />
                    ))}
                </div>

                <div className="flex items-center gap-2 mb-5">
                    <img src={clock} alt="Clock icon" className="w-5 h-5" />
                    <p className="text-sm text-gray-600">{fields.recipeTime}</p>
                </div>

                <Link
                    to={`/recipes/${fields.recipeSlug}`}
                    className="inline-block px-4 py-2 bg-yellow-700 text-white rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors duration-200"
                >
                    Read More
                </Link>
            </div>
        </div>
    );
}
