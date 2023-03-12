import { FaHome, FaUser, FaCoins } from 'react-icons/fa';
import { MdSpaceDashboard } from 'react-icons/md';
import { Link } from 'react-router-dom';

const SideBar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-20 m-0 flex flex-col bg-gray-900 text-white shadow-lg">
            <Link to='/'><SidebarIcon icon={<FaHome size='28' />} text='Home' /></Link>
            <Link to='/dashboard/'><SidebarIcon icon={<MdSpaceDashboard size='28' />} text='Dashboard' /></Link>
            <SidebarIcon icon={<FaCoins size='28' />} text='Tokens' />
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