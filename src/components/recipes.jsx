import { useState, useEffect } from 'react'
import RecipeCard from '../components/recipecard'
import { client } from '../api'

export default function RecipeList() {

    const [data, setData] = useState([])

    useEffect (() => {
        window.scrollTo(0, 0);
        async function fetchData() {
            const response = await client.getEntries({
                content_type: 'recipe',
                order: '-sys.createdAt',
                limit: 3,
            })
            setData(response.items)
        }
        fetchData()
    }, [])

    return (
        <div className="w-full flex flex-col items-center">
            <h2 className="text-center text-4xl gloria-hallelujah-regular mb-6">Recent Recipes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                {data?.length > 0 ? (
                    data.map((recipe, index) => (
                        <RecipeCard key={index} data={recipe} />
                    ))
                ) : (
                    <p className="text-gray-500">No recipes found.</p>
                )}
             
            </div>
        </div>
    );
}
