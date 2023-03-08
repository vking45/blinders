import { BiCoinStack } from 'react-icons/bi';

const Navbar = () => {
    return (
        <nav>
            <div className='shadow-md w-auto h-24'>
                <div className='h-full flex items-center justify-between bg-gray-900 py-6 px-32'> 
                    <div className='text-2xl cursor-pointer flex-items-center text-gray-50'>
                        <strong>BLIND</strong>ERS
                    </div>
                    <div className='flex gap-5 text-gray-50'>
                        <BiCoinStack size={28} />
                        <button>
                            Placeholder
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
