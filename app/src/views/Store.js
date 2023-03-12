import { AiOutlineSwap } from "react-icons/ai";
import { FaCoins } from "react-icons/fa";
import { TbCurrencySolana } from "react-icons/tb";
import { RiErrorWarningLine } from "react-icons/ri";

const Store = () => {
    return (
        <div className='flex flex-col w-[calc(100vw-5rem)] min-h-[calc(100vh-6rem)] float-right justify-center items-center bg-gray-800 py-4'>
            <div className="flex flex-col justify-between items-center w-6/12 gap-5 bg-white p-5 rounded-lg">
                <div className="flex w-full justify-between">
                    <div className="">
                        <div className="flex items-center gap-2 text-5xl justify-center w-52 h-52 mb-1 bg-gray-600 text-white">
                            <TbCurrencySolana /> 6969
                        </div>
                    </div>
                    <div className='flex justify-evenly items-center text-3xl'>
                        <div> 
                            <AiOutlineSwap size={72} />
                        </div>
                    </div>
                    <div className="">
                        <div className="flex items-center gap-2 text-2xl justify-center w-52 h-52 mb-1 bg-gray-600 text-white">
                            <FaCoins /> 6969
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <button className="rounded-md bg-gray-600 text-white px-5 p-2">
                        Exchange
                    </button>

                    <div className="flex flex-row gap-1 items-center text-red-600">
                        <RiErrorWarningLine size={25} />
                        <p>Exchange Rates</p>
                    </div>

                    <div className="flex items-center justify-evenly">
                        <FaCoins />1 = <TbCurrencySolana /> 0.001 
                    </div>
                </div>

                <div className="flex flex-col gap-4 items-center">
                    <label htmlFor="withdraw-amt">Withdraw Amount</label>
                    <input type="number" id="withdraw-amt" className="border-b-2 border-gray-600 outline-none"/>

                    <div className="flex gap-5">
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

                    <button className="rounded-md bg-gray-600 text-white w-48 p-2">
                        Withdraw
                    </button>
                </div>
            </div>
        </div>
    );
}

 export default Store;