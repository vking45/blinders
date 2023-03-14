import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { getSpecificMatch } from "./logic/firebase";
import { getBetsOnChain } from "./logic/chain-calls";
import ProfileBetContainer from "./components/ProfileBetContainer";
import PreviousBetsContainer from "./components/PreviousBetsContainer";


const Profile = () => {

    const wallet = useAnchorWallet();
    const [loading, setLoading] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const [current, setCurrent] = useState([]);
    const [previous, setPrevious] = useState([]);

    useEffect(() => {
        (async () => {
            const bets = await getBetsOnChain(wallet);
            let current = [];
            let previous = [];
            for(const i in bets){
                if(bets[i].account.creator.toBase58() === wallet.publicKey.toBase58() || bets[i].account.challenger.toBase58() === wallet.publicKey.toBase58()){
                const match = await getSpecificMatch(bets[i].account.matchPubkey.toBase58());
                const t = bets[i].account.creator.toBase58() === wallet.publicKey.toBase58();
                // console.log(match[0]);
                if(Object.keys(bets[i].account.betState)[0] === "created"){
                    current.push({ creator : t, past : false, addr : match[0].Address, amount : bets[i].account.amount.toNumber(), condition : Object.keys(bets[i].account.betCondition)[0], bet : bets[i].publicKey.toBase58() });
                } else if(Object.keys(bets[i].account.betState)[0] === "accepted"){
                    current.push({ creator : t, past : true, addr : match[0].Address, amount : bets[i].account.amount.toNumber(), condition : Object.keys(bets[i].account.betCondition)[0], bet : bets[i].publicKey.toBase58() });
                } else if(Object.keys(bets[i].account.betState)[0] === "withdrawn"){
                    previous.push({ creator : t, past : false, addr : match[0].Address, amount : bets[i].account.amount.toNumber(), condition : Object.keys(bets[i].account.betCondition)[0], bet : bets[i].publicKey.toBase58() });
                } else{
                    previous.push({ creator : t, past : true, addr : match[0].Address, amount : bets[i].account.amount.toNumber(), condition : Object.keys(bets[i].account.betCondition)[0], bet : bets[i].publicKey.toBase58() });
                }
              }
            }

            setCurrent(current);
            setPrevious(previous);
            setLoaded(true);
            setLoading(false);
//            console.log(current);
//            console.log(previous);
        })();
      }, []);

    return (
        <div className='flex flex-col w-[calc(100vw-5rem)] min-h-[calc(100vh-6rem)] float-right justify-center items-center bg-dark-bg py-4'>
            <h3 className="text-3xl text-center text-white mb-5"> { loading ? "Loading..." : "Profile" }</h3>
            { loading ? "" : 
                <div>
                    <h3 className="text-3xl text-center text-white mb-5"> { loaded && current.length !== 0 ? "Current Bets" : "There Are No Current Bets" }</h3>
                    <div className="flex flex-wrap gap-5 justify-evenly px-4"> 
                        {current.map((curr) => (
                            <ProfileBetContainer creator={curr.creator} past={curr.past} addr={curr.addr} amount={curr.amount} cond={curr.condition} bet={curr.bet} />
                        ))}
                    </div>
                    <h3 className="text-3xl text-center text-white my-5">{ loaded && previous.length !== 0 ? "Previous Bets" : "There Are No Previous Bets" }</h3>         
                    <div className='flex flex-wrap gap-5 justify-around px-4'>
                        {previous.map((curr) => (
                            <PreviousBetsContainer creator={curr.creator} past={curr.past} addr={curr.addr} amount={curr.amount} cond={curr.condition} />
                        ))}   
                    </div>        
                </div>
            }
        </div>
    );
}

export default Profile;