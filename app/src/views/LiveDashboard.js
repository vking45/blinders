import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import InActiveBetsContainer from "./components/InActiveBetContainer";
import { getBetsOnChain } from "./logic/chain-calls";
import { getSpecificMatch } from "./logic/firebase";

const LiveDashBoard = () => {

    const wallet = useAnchorWallet();
    const {address} = useParams();
    const [match, setMatch] = useState();
    const [loaded, setLoaded] = useState(false);
    const [bets, setBets] = useState();

    useEffect(() => {
        (async () => {
          const match = await getSpecificMatch(address);
          const bets = await getBetsOnChain(wallet);
          let accepted = [];
          for(const i in bets){
            if(bets[i].account.matchPubkey.toBase58() === address){
            if(Object.keys(bets[i].account.betState)[0] === "accepted"){
                accepted.push(bets[i]);
            }
            }
          }
          setBets(accepted);
          setMatch(match);
          setLoaded(true);
          
        })();
      }, []);

    return (
        <div className='flex flex-col w-[calc(100vw-5rem)] min-h-[calc(100vh-6rem)] float-right justify-center items-center bg-dark-bg py-4'>
            <h3 className="text-3xl text-center text-white my-5"> { loaded ? match[0].Title + " - " + match[0].SideA + " Vs " + match[0].SideB  : "Loading..."} </h3> <br />
            <h3 className="text-3xl text-center text-white mb-5"> { loaded && bets.length !== 0 ? "Bets" : "There Are No Bets" }</h3>
            { loaded ? 
            <div className="flex flex-wrap gap-5 justify-evenly px-4">    
                {bets.map((bet) => (  
                <InActiveBetsContainer addr={bet.account.matchPubkey.toBase58()} amount={ bet.account.amount.toNumber()} challenger={bet.account.challenger.toBase58()} creator={ bet.account.creator.toBase58()} cond={ Object.keys(bet.account.betCondition)[0] } bet={ bet.publicKey.toBase58()} />
                ))}
            </div>
            : "" }
        </div>
    );
};

export default LiveDashBoard;