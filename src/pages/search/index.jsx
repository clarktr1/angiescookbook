import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { client } from "../../api";
import RecipeCard from '../../components/recipecard';

export default function SearchPage() {
    const [data, setData] = useState([]);
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
            });        
            setData(response.items);
        }
        if (category && value) {
            fetchData();
        }
    }, [category, value]);
    return (
        <div className="w-full flex flex-col items-center">
            <title>Angie's Cookbook - Seach Results</title>
            <h2 className="text-center text-4xl gloria-hallelujah-regular mb-6">Search Results</h2>
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