import '../../App.css'
import RecipeList from '../../components/recipes'
import logo from '../../assets/leaf.png'

export default function Home() {
    return(
        <div className='flex justify-center items-center flex-col w-full h-full m-0 p-0'>
          <title>Angie's Cookbook</title>
          <meta property="og:title" content={recipe.recipeTitle} />
            <meta property="og:description" content="Welcome to Angie\'s Cookbook, a one stop place for all of the best and my favorite recipes" />
            <meta property="og:image" content={logo} />
            <meta property="og:url" content={`https://accookbook.com/`} />
          <RecipeList />
        </div>
    )
}