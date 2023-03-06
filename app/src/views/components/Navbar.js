import { BiCoinStack } from 'react-icons/bi';

const Navbar = () => {
    return (
        <nav>
            <div className='shadow-md w-full fixed top-0 left-20'>
                <div className='flex items-center justify-between bg-gray-900 py-6 px-10'> 
                    <div className='text-2xl cursor-pointer flex-items-center text-gray-50'>
                        <strong>BLIND</strong>ERS
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
