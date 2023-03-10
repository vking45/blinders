import { BiCoinStack } from "react-icons/bi";

const BetContainer = () => {
    return (
        <div className="flex flex-col justify-between items-center gap-10 bg-white p-10 rounded-md">
            <div className='flex flex-row gap-8'>
                <div className="">
                    <div className="rounded-full w-20 h-20 mb-1 bg-gray-600">
                        
                    </div>

                    <div className="text-center">
                        <span>Team X</span>
                    </div>
                </div>
                <div className='flex flex-col justify-center gap-3 items-center text-3xl h-full'>
                    <div> 
                        <p className='text-sm mr-2 mb-1 text-center text-red-500'>3h 45m</p>
                        <p className='text-xs text-center text-black'>Today, 7:30AM IST</p>
                    </div>
                </div>
                <div className="">
                    <div className="rounded-full w-20 h-20 mb-1 bg-gray-600">
                        
                    </div>
        
                    <div className="text-center">
                        <span>Team Y</span>
                    </div>
                </div>
            </div>

            <div className=''>
                <h6 className='text-md'>Your Prediction</h6>
                <div className='bg-gray-500 rounded-md'>
                    <p className="text-white text-sm w-80 h-7 p-1 px-4">Lorem ipsum dolar simat</p>
                </div>
            </div>

            <div className='flex flex-row justify-between items-center w-full'>
                <div className="flex justify-center items-center">
                    {/* <p className="rounded-md text-sm text-center">Prize</p> */}
                    <BiCoinStack size={28} title="Prize" />
                    <span>69</span>
                </div>

                <div className="flex"> 
                    <button className="bg-gray-500 p-1 rounded-sm text-white">Available Bets</button>
                </div>
            </div>
        </div>
    );
}

export default BetContainer;