import { AiOutlineSwap } from "react-icons/ai";
import { FaCoins } from "react-icons/fa";
import { TbCurrencySolana } from "react-icons/tb";
import { RiErrorWarningLine } from "react-icons/ri";

const CreateBet = () => {
    return (
        <div className='flex flex-col w-[calc(100vw-5rem)] min-h-[calc(100vh-6rem)] float-right justify-center items-center bg-gray-800 py-4'>
            <div className="flex flex-col justify-between items-center w-6/12 gap-5 bg-white p-10 rounded-md">
                <div className="flex w-full justify-between items-center">
                    <div className="">
                        <div className="flex items-center gap-2 justify-center rounded-full w-20 h-20 mb-1 bg-gray-600">
                            
                        </div>

                        <div className="text-center">
                            <span>Team X</span>
                        </div>
                    </div>
                    <div className='flex flex-col justify-end gap-3 items-center text-3xl h-full'>
                        <div> 
                            <p className='text-lg mr-2 mb-1 text-center text-red-500'>3h 45m</p>
                            <p className='text-xs text-center text-black'>Today, 7:30AM</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="flex items-center gap-2 justify-center rounded-full w-20 h-20 mb-1 bg-gray-600">
                            
                        </div>

                        <div className="text-center">
                            <span>Team Y</span>
                        </div>
                    </div>
                </div>

                <div className="flex w-full flex-col gap-2">
                    <label htmlFor="drop-prediction">Select Prediction</label>
                    <select id="drop-prediction" className="p-2 rounded-md outline-none bg-gray-500 text-white" data-te-select-init>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>

                <div className="flex w-full flex-col gap-4 items-center">
                    <label htmlFor="withdraw-amt" className="self-start">Bet Amount</label>
                    <input type="number" id="withdraw-amt" className="w-full border-b-2 border-gray-600 outline-none"/>

                    <div className="flex w-full justify-center gap-8">
                        <button className="rounded-md bg-gray-600 text-white px-2">
                            100%
                        </button>

                        <button className="rounded-md bg-gray-600 text-white px-2">
                            50%
                        </button>

                        <button className="rounded-md bg-gray-600 text-white px-2">
                            25%
                        </button>
                    </div>

                    <button className="rounded-md bg-gray-600 text-white w-full p-2">
                        Create Bet
                    </button>
                </div>
            </div>
        </div>
    );
}

 export default CreateBet;