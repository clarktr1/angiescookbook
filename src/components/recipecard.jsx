import { Link } from 'react-router-dom'
import clock from '../assets/clock.svg'
import { useNavigate } from 'react-router-dom';

function TagButton({tag}){
    const navigate = useNavigate();

    const handleTagClick = () => {
        navigate(`/recipes/search?category=recipeTags&value=${tag}`);
    }

    return (
        <p className="text-sm text-grey-500 mr-2 border border-red-100 rounded-sm px-2 py-1 bg-red-200 hover:bg-red-300 hover:cursor-pointer transition-colors duration-300"
            onClick={handleTagClick}> 
            {tag}
        </p>
    )
}

export default function RecipeCard({ data }) {
    if (!data || data.length === 0) {
        return <p>Loading...</p>;
    }
    const fields = data.fields;

    return (
        <div className="w-sm h-sm border border-yellow-900 rounded-t-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <Link to={`/recipes/${fields.recipeSlug}`}>
                <img 
                    className="w-full h-80 object-cover object-center rounded-t-lg" 
                    src={fields.recipeImage.fields.file.url || ''} 
                    alt={fields.recipeTitle || 'Recipe image'} 
                />
            </Link>
                <div className="p-4 bg-white">
                    <h3 className="text-left text-xl">{fields.recipeTitle}</h3>
                    <p className="text-gray-400 mb-2">{fields.recipeCategory}</p>
                    <div className="flex flex-row gap-1 flex-wrap">
                        {fields.recipeTags.map((tag, index) => (    
                            <TagButton key={index} tag={tag} />
                        ))}
                    </div>
                    <div className="flex flex-row gap-3 items-center mt-2"> 
                        <img width="25" height="25" src={clock} alt="Clock icon"/>
                        <p>{fields.recipeTime}</p>
                    </div>
                    <button className="mt-4 px-4 py-2 bg-yellow-900 text-white rounded-lg hover:bg-yellow-700 hover:cursor-pointer transition-colors duration-300">
                        <Link to={`/recipes/${fields.recipeSlug}`}>
                            Read More
                        </Link>
                    </button>
                </div>
        </div>
    );
}
