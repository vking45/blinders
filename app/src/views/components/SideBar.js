import { FaHome, FaUser, FaCoins, FaBasketballBall } from 'react-icons/fa';
import { GiSoccerBall } from 'react-icons/gi';
import { MdSpaceDashboard, MdSportsCricket } from 'react-icons/md';
import { Link } from 'react-router-dom';

const SideBar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-20 m-0 flex flex-col bg-gray-900 text-white shadow-lg">
            <Link to='/home/'><SidebarIcon icon={<FaHome size='28' />} text='Home' /></Link>
            <Link to='/soccer/'><SidebarIcon icon={<GiSoccerBall size='28' />} text='Soccer' /></Link>
            <Link to='/basketball/'><SidebarIcon icon={<FaBasketballBall size='28' />} text='Basket Ball' /></Link>
            <Link to='/cricket/'><SidebarIcon icon={<MdSportsCricket size='28' />} text='Cricket' /></Link>
            <Link to='/profile/'><SidebarIcon icon={<FaUser size='28' />} text='Profile' /></Link>
            <Link to='/'><SidebarIcon icon={<FaCoins size='28' />} text='Store' /></Link>
        </div>
    );
}

const SidebarIcon = ({ icon, text }) => (
    <div className='sidebar-icon group'>
        {icon}

        <span className='sidebar-tooltip group-hover:scale-100'>
            {text}
        </span>
    </div>
);

export default SideBar;