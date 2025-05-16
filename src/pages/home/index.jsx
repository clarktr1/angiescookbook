import '../../App.css'
import { Helmet } from 'react-helmet'
import RecipeList from '../../components/recipes'
import logo from '../../assets/leaf.png'

export default function Home() {
    return(
        <div className='flex justify-center items-center flex-col w-full h-full m-0 p-0'>
          <title>Angie's Cookbook</title>
          <Helmet>
       
            <meta property="og:title" content="Angie\'s Cookbook" />
            <meta property="og:description" content="Welcome to Angie\'s Cookbook, a one stop place for all of the best and my favorite recipes" />
            <meta property="og:image" content={logo} />
            <meta property="og:url" content={`https://accookbook.com/`} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="Angie's Cookbook" />
          </Helmet>
          <RecipeList />
        </div>
    )
}