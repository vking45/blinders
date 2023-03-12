import { FaHome, FaUser, FaCoins, FaBasketballBall } from 'react-icons/fa';
import { BsPlusLg } from 'react-icons/bs';
import { GiSoccerBall } from 'react-icons/gi';
import { MdSpaceDashboard, MdSportsCricket } from 'react-icons/md';
import { Link } from 'react-router-dom';

const SideBar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-20 m-0 flex flex-col bg-gray-900 text-white shadow-lg">
            <Link to='/'><SidebarIcon icon={<FaHome size='28' />} text='Home' /></Link>
            <Link to='/dashboard/'><SidebarIcon icon={<MdSpaceDashboard size='28' />} text='Dashboard' /></Link>
            <Link to='/store/'><SidebarIcon icon={<FaCoins size='28' />} text='Store' /></Link>
            <Link to='/createBet/'><SidebarIcon icon={<BsPlusLg size='28' />} text='Create Bet' /></Link>
            <Link to='/soccer/'><SidebarIcon icon={<GiSoccerBall size='28' />} text='Soccer' /></Link>
            <SidebarIcon icon={<FaBasketballBall size='28' />} text='Basket Ball' />
            <SidebarIcon icon={<MdSportsCricket size='28' />} text='Cricket' />

            <SidebarIcon icon={<FaUser size='28' />} text='Profile' />
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