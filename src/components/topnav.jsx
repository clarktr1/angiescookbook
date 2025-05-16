import leaf from '../assets/leaf.png'
import { Link } from 'react-router-dom'
import SearchBar from './searchbar'

export default function TopNav() {
    return(
        <div id='navbar' className="w-full flex justify-center items-center flex-col mb-24 pt-2">
            <img className='w-80 h-80 mb-3' src={leaf} />
            <ul className=" w-100 flex justify-evenly mb-8">
                <li className='gloria-hallelujah-regular text-3xl'><Link to='/'>Home</Link></li>
                {/* <li className='gloria-hallelujah-regular text-3xl'><Link to='/about'>About</Link></li> */}
                <li className='gloria-hallelujah-regular text-3xl'><Link to='/recipes/all'>Recpies</Link></li>
            </ul>
            <SearchBar />
        </div>
    )
}