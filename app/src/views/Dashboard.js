import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AcceptedBetContainer from "./components/AcceptedBetContainer";

import BetContainer from "./components/BetContainer";
import { getBetsOnChain } from "./logic/chain-calls";
import { getSpecificMatch } from "./logic/firebase";

const DashBoard = () => {

    const wallet = useAnchorWallet();
    const {address} = useParams();
    const [match, setMatch] = useState();
    const [loaded, setLoaded] = useState(false);
    const [avail, setAvail] = useState();
    const [accept, setAccept] = useState();

    useEffect(() => {
        (async () => {
          const match = await getSpecificMatch(address);
          const bets = await getBetsOnChain(wallet);
          let available = [];
          let accepted = [];
          for(const i in bets){
            if(bets[i].account.matchPubkey.toBase58() === address){
            if(Object.keys(bets[i].account.betState)[0] === "created"){
                available.push(bets[i]);
            } else if(Object.keys(bets[i].account.betState)[0] === "accepted"){
                accepted.push(bets[i]);
            }
            }
          }
          setAvail(available);
          setAccept(accepted);
          setMatch(match);
          setLoaded(true);
          
        })();
      }, []);

    return (
        <div className='flex flex-col w-[calc(100vw-5rem)] min-h-[calc(100vh-6rem)] float-right justify-center items-center bg-gray-800 py-4'>
            <h3 className="text-3xl text-center text-white my-5"> { loaded ? match[0].Title + " - " + match[0].SideA + " Vs " + match[0].SideB  : "Loading..."} </h3> <br />
            { loaded ? <Link to={`/create/${match[0].Address}/`} className="bg-gray-500 p-1 rounded-sm text-white">Create Bet</Link> : ""}
            <h3 className="text-3xl text-center text-white mb-5"> { loaded && avail.length !== 0 ? "Available Bets" : "There Are No Available Bets At The Moment" }</h3>
            { loaded ? 
            <div className="flex flex-wrap gap-5 justify-evenly px-4">    
                {avail.map((bet) => (  
                <BetContainer past={match[0].Past} addr={bet.account.matchPubkey.toBase58()} amount={ bet.account.amount.toNumber()} creator={ bet.account.creator.toBase58()} cond={ Object.keys(bet.account.betCondition)[0] } bet={ bet.publicKey.toBase58()} />
                ))}
            </div>
            : "" }
            <h3 className="text-3xl text-center text-white my-5">{ loaded && accept.length !== 0 ? "Accepted Bets" : "There Are No Accepted Bets" }</h3>
            { loaded ? 
            <div className='flex flex-wrap gap-5 justify-around px-4'>
                {accept.map((bet) => (
                <AcceptedBetContainer addr={bet.account.matchPubkey.toBase58()} amount={ bet.account.amount.toNumber()} cond={ Object.keys(bet.account.betCondition)[0] } />
                ))}
            </div>
            : "" }
        </div>
    );
};

export default DashBoard;