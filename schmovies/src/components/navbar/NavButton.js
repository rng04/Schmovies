import { Link } from 'react-router-dom';

export default function NavButton ({to, onClick, content}) {
    return (
        <>
            <Link className='float-left text-center p-4 hover:text-yellow-200' onClick={onClick} to={to}>{content}</Link>
        </>
    );
}