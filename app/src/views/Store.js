import { AiOutlineSwap } from "react-icons/ai";
import { FaCoins } from "react-icons/fa";
import { TbCurrencySolana } from "react-icons/tb";
import { RiErrorWarningLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import { exchangeToTokens, SOLBalance, tokenBalance, withdrawSOL } from "./logic/chain-calls";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

const Store = () => {

    const wallet = useAnchorWallet();

    const [bal, setBal] = useState(0);
    const [amt, setAmt] = useState(0);
    const [sol, setSol] = useState(0);

    const onExchange = async() => {
        await exchangeToTokens(wallet, amt);
    }

    const onWithdraw = async() => {
        await withdrawSOL(wallet, amt);
    }

    useEffect(() => {
        (async () => {
            const b = await tokenBalance(wallet);
            setBal(b/10**6);
            const s = await SOLBalance(wallet);
            setSol(s/10**9);
        })();
      }, []);    

    return (
        <div className='flex flex-col w-[calc(100vw-5rem)] min-h-[calc(100vh-6rem)] float-right justify-center items-center bg-gray-800 py-4'>
            <div className="flex flex-col justify-between items-center w-6/12 gap-5 bg-white p-5 rounded-lg">
                <div className="flex w-full justify-between">
                    <div className="">
                        <div className="flex items-center gap-2 text-xl justify-center w-52 h-52 mb-1 bg-gray-600 text-white">
                            <TbCurrencySolana /> {sol}
                        </div>
                    </div>
                    <div className='flex justify-evenly items-center text-3xl'>
                        <div> 
                            <AiOutlineSwap size={72} />
                        </div>
                    </div>
                    <div className="">
                        <div className="flex items-center gap-2 text-xl justify-center w-52 h-52 mb-1 bg-gray-600 text-white">
                            <FaCoins /> {bal}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-1 items-center text-red-600">
                        <RiErrorWarningLine size={25} />
                        <p>Exchange Rates</p>
                    </div>

                    <div className="flex items-center justify-evenly">
                        <FaCoins />1 = <TbCurrencySolana /> 0.0001 
                    </div>
                </div>

                <div className="flex flex-col gap-4 items-center">
                    <label htmlFor="withdraw-amt">Exchange Amount</label>
                    <input type="number" min={1} value={amt} id="withdraw-amt" className="border-b-2 border-gray-600 outline-none" onChange={(e) => setAmt(e.target.value)}/>

                    <button className="rounded-md bg-gray-600 text-white w-48 p-2" onClick={onExchange}>
                        Exchange
                    </button>
                </div>
            </div>
        </div>
    );
}

 export default Store;