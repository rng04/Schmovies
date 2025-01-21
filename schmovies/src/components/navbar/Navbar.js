import { useContext } from "react";
import { UserContext } from "../../context/userContext"
import NavButton from "./NavButton";
import NavSearchBar from "./NavSearch";
import logo from './schmovieslogo.png';

export default function Navbar() {
    const { user,signOut } = useContext(UserContext)

    return(
        <nav className='bg-black text-white sticky top-0 z-[100] overflow-hidden flex justify-between'>
            <img className="size-14 w-24" src={logo} alt="company logo"/>
            <div className="flex">
                <NavButton to='/' content='Home'/>
                <NavButton to='/about' content='About'/>
                <NavSearchBar/> 
            </div>
            <div className="">{
                user ? 
                <>
                    <NavButton to="/dashboard" content="Profile" /> 
                    <NavButton onClick={signOut} to="/login" content="Sign Out"/>
                </> :
                <>
                    <NavButton to='/login' content='Login'/>
                    <NavButton to='/register' content='Sign Up'/>
                </>
            }
            </div>
        </nav>
    )
}