import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as anchor from "@project-serum/anchor";
import { BiCoinStack } from "react-icons/bi";
import { acceptBet, claimBet, createBet, getSpecificBetOnChain } from "./logic/chain-calls";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { getSpecificMatch } from "./logic/firebase";
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from "dayjs";
dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)

const ClaimBet = () => {
    const wallet = useAnchorWallet();
    const {address} = useParams();

    const [bet, setBet] = useState();
    const [loading, setLoading] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const [fire, setFire] = useState();
    const [cond, setCond] = useState("");
    
    const onClaim = async() => {
        await claimBet(wallet, new anchor.web3.PublicKey(fire.Address), new anchor.web3.PublicKey(address) ,new anchor.web3.PublicKey("4ke5umoZLkRByReUXZFSUeYtD6y6WQze6cbwH9nEPefE"), new anchor.web3.PublicKey(bet.creator.toBase58()), new anchor.web3.PublicKey(bet.challenger.toBase58()));
    }

    useEffect(() => {
        (async () => {
            const raw_data = await getSpecificBetOnChain(wallet, address);
        //    setMatch(found);
            setBet(raw_data);
            const match = await getSpecificMatch(raw_data.matchPubkey.toBase58());
            setLoaded(true);
            setFire(match[0]);
            setLoading(false);

            if(Object.keys(raw_data.betCondition)[0] === "one"){
                setCond(match[0].One);
            } else if(Object.keys(raw_data.betCondition)[0] === "two"){
                setCond(match[0].Two);
            } else if(Object.keys(raw_data.betCondition)[0] === "three"){
                setCond(match[0].Three);
            } else if(Object.keys(raw_data.betCondition)[0] === "four"){
                setCond(match[0].Four);
            } else if(Object.keys(raw_data.betCondition)[0] === "five"){
                setCond(match[0].Five);
            }

        })();
      }, []);

    return (
        <div className='flex flex-col w-[calc(100vw-5rem)] min-h-[calc(100vh-6rem)] float-right justify-center items-center bg-gray-800 py-4'>
            <h3 className="text-3xl text-center text-white my-5"> Accept The Bet </h3>
            <div className="flex flex-col justify-between items-center w-6/12 gap-5 bg-white p-10 rounded-md">
                <div className="flex w-full justify-between items-center">
                    <div className="">
                        <div className="flex items-center gap-2 justify-center rounded-full w-20 h-20 mb-1 bg-gray-600">
                            
                        </div>

                        <div className="text-center">
                            <span>{loaded ? fire.SideA : "Side A"}</span>
                        </div>
                    </div>
                    <div className='flex flex-col justify-end gap-3 items-center text-3xl h-full'>
                        <div> 
                            <p className='text-lg mr-2 mb-1 text-center text-red-500'>{ loaded ? dayjs.unix(fire.Time.seconds).fromNow(true) : ""}</p>
                            <p className='text-xs text-center text-black'>{ loaded ? dayjs.unix(fire.Time.seconds).format('lll') : ""}</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="flex items-center gap-2 justify-center rounded-full w-20 h-20 mb-1 bg-gray-600">
                            
                        </div>

                        <div className="text-center">
                            <span>{loaded ? fire.SideB : "Side B"}</span>
                        </div>
                    </div>
                </div>

                <div className="flex w-full flex-col gap-2">
                    <label htmlFor="drop-prediction">The Prediction</label>
                    <input type="text" id="disabled-input-2" aria-label="disabled input 2" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5" value={cond} disabled readonly/>
                </div>

                <div className='flex flex-row justify-between items-center w-full'>
                <div className="flex justify-center items-center">
                    {/* <p className="rounded-md text-sm text-center">Prize</p> */}
                    <BiCoinStack size={28} title="Prize" />
                    <span>{ loaded ? bet.amount.toNumber() : ""}</span>
                </div>

                <div className="flex"> 
                    <button className="bg-gray-500 p-1 rounded-sm text-white" onClick={onClaim}>Claim Bet</button>
                </div>
                </div>
                
            </div>
        </div>
    );
}

 export default ClaimBet;