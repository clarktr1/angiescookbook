import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import TopNav from './components/topnav';
import Footer from './components/footer';
import RecipePage from './pages/recipe';
import AllRecipes from './pages/all_recipe';
import ScrollToTop from './utils';
import SearchPage from './pages/search';
import logo from './assets/leaf1.svg';


import { Link } from 'react-router-dom';
function NotFound() {
  return (
    <div className="flex items-center justify-center bg-transparent px-6">
      <title>404 - Page Not Found</title>
      <description>Page Not Found</description>
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Page Not Found</h2>
        <p className="text-gray-600 mb-6">Sorry, the page you're looking for doesn't exist or has been moved.</p>
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}


function App() {
  
    return (
        <BrowserRouter>
            <link rel='icon' href={logo} />
            <TopNav />
            <ScrollToTop />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="/recipes" element={<AllRecipes />} />
                <Route path="/recipes/:uuid" element={<RecipePage />} />
                <Route path="/recipes/all" element={<AllRecipes />} />
                <Route path='/recipes/search' element={<SearchPage />} />
               <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
