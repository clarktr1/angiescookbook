import '../../App.css'
import RecipeList from '../../components/recipes'

export default function Home() {
    return(
        <div className='flex justify-center items-center flex-col w-full h-full m-0 p-0'>
          <title>Angie's Cookbook</title>
          <description>Welcome to Angie's Cookbook! A culmination of the my favorite recipes.</description>
          <RecipeList />
        </div>
    )
}