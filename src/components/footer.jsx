import { Link } from 'react-router-dom'

export default function Footer(){
    return (
      <footer className="bg-brown-700 text-black border border-top-black bg-chestnut-brown py-6 mt-10">
        <div className="container mx-auto flex flex-col items-center">
          <h2 className="text-lg font-handwritten">Angie's Cookbook</h2>
          <p className="text-xs mt-4">&copy; {new Date().getFullYear()} Angie's Cookbook. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  