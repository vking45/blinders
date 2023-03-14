import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as anchor from "@project-serum/anchor";
import { createBet, getMatchesOnChain } from "./logic/chain-calls";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { getSpecificMatch } from "./logic/firebase";
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from "dayjs";
dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)

const CreateBet = () => {
    const wallet = useAnchorWallet();
    const {address} = useParams();

    const [match, setMatch] = useState();
    const [loading, setLoading] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const [fire, setFire] = useState();
    const [amt, setAmt] = useState(0);
    const [option, setOption] = useState();
    
    useEffect(() => {
        (async () => {
            const raw_data = await getMatchesOnChain(wallet);
            const found = raw_data.find(el => el.publicKey.toBase58() === address);
            const match = await getSpecificMatch(address);
            setMatch(found);
            setLoaded(true);
            setFire(match);
            setLoading(false);

        })();
      }, []);

    const onCreate = async() => {
        setLoading(true);
        await createBet(wallet, new anchor.web3.PublicKey(address), new anchor.web3.PublicKey(match.account.mint.toBase58()), new anchor.BN(amt * 10**6), option);
        setLoading(false);
    }

    return (
        <div className='flex flex-col w-[calc(100vw-5rem)] min-h-[calc(100vh-6rem)] float-right justify-center items-center bg-dark-bg py-4'>
            <div className="flex flex-col justify-between items-center w-6/12 gap-5 bg-white p-10 rounded-md">
                <div className="flex w-full justify-between items-center">
                    <div className="">
                        <div className="flex items-center gap-2 justify-center rounded-full w-20 h-20 mb-1 bg-gray-600">
                            
                        </div>

                        <div className="text-center">
                            <span>{loaded ? match.account.sideA : "Side A"}</span>
                        </div>
                    </div>
                    <div className='flex flex-col justify-end gap-3 items-center text-3xl h-full'>
                        <div> 
                            <p className='text-lg mr-2 mb-1 text-center text-red-500'>{ loaded ? dayjs.unix(fire[0].Time.seconds).fromNow(true) : ""}</p>
                            <p className='text-xs text-center text-black'>{ loaded ? dayjs.unix(fire[0].Time.seconds).format('lll') : ""}</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="flex items-center gap-2 justify-center rounded-full w-20 h-20 mb-1 bg-gray-600">
                            
                        </div>

                        <div className="text-center">
                            <span>{loaded ? match.account.sideB : "Side B"}</span>
                        </div>
                    </div>
                </div>

                <div className="flex w-full flex-col gap-2">
                    <label htmlFor="drop-prediction">Select Prediction</label>
                    <select id="drop-prediction" className="p-2 rounded-md outline-none bg-gray-500 text-white" data-te-select-init onChange={(e) => setOption(e.target.value)}>
                        <option value={1}>{ loaded ? match.account.conditionOne : ""}</option>
                        <option value={2}>{ loaded? match.account.conditionTwo : ""}</option>
                        <option value={3}>{loaded ? match.account.conditionThree : ""}</option>
                        <option value={4}>{ loaded ? match.account.conditionFour : ""}</option>
                        <option value={5}>{ loaded ? match.account.conditionFive : ""}</option>
                    </select>
                </div>

                <div className="flex w-full flex-col gap-4 items-center">
                    <label htmlFor="withdraw-amt" className="self-start">Bet Amount</label>
                    <input type="number" min={1} id="withdraw-amt" className="w-full border-b-2 border-gray-600 outline-none" value={amt} onChange={(e) => setAmt(e.target.value)} />

                    <button className="rounded-md bg-gray-600 text-white w-full p-2" onClick={onCreate}>
                        { loading ? "Loading.." : "Create Bet" }
                    </button>
                </div>
            </div>
        </div>
    );
}

 export default CreateBet;