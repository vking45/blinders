import AcceptedBetContainer from "./components/AcceptedBetContainer";

import BetContainer from "./components/BetContainer";

const DashBoard = () => {
    return (
        <div className='flex flex-col w-[calc(100vw-5rem)] min-h-[calc(100vh-6rem)] float-right justify-center items-center bg-gray-800 py-4'>
            <h3 className="text-3xl text-center text-white mb-5">Placed Bets</h3>
            <div className="flex flex-wrap gap-5 justify-evenly px-4">                
                <BetContainer />
                <BetContainer />
                <BetContainer />
            </div>

            <h3 className="text-3xl text-center text-white my-5">Accepted Bets</h3>
            <div className='flex flex-wrap gap-5 justify-around px-4'>
                <AcceptedBetContainer />
                <AcceptedBetContainer />
                <AcceptedBetContainer />
            </div>
        </div>
    );
};

export default DashBoard;