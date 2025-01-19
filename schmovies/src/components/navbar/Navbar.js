import NavButton from "./NavButton";
import NavSearchBar from "./NavSearch";
import logo from './schmovieslogo.png';

export default function Navbar() {
    return(
        <nav className='bg-black text-white overflow-hidden flex justify-center '>
            <img className="size-14 w-24 hover:animate-pulse" src={logo} alt="company logo"/>
            <NavButton to='/' content='Home'/>
            <NavButton to='/about' content='About'/>
            <NavSearchBar/> 
        </nav>
    )
}