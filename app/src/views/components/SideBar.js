import { FaHome, FaUser, FaCoins } from 'react-icons/fa';
import { MdSpaceDashboard } from 'react-icons/md'

const SideBar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-gray-900 text-white shadow-lg">
            <SideBarIcon icon={<FaHome size='28' />} text='Home' />
            <SideBarIcon icon={<MdSpaceDashboard size='28' />} text='Dashboard' />
            <SideBarIcon icon={<FaCoins size='28' />} text='Tokens' />
            <SideBarIcon icon={<FaUser size='28' />} text='Profile' />
        </div>
    );
}

const SideBarIcon = ({ icon, text }) => (
    <div className='sidebar-icon group'>
        {icon}

        <span className='sidebar-tooltip group-hover:scale-100'>
            {text}
        </span>
    </div>
);

export default SideBar;