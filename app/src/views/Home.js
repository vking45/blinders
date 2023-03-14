import BannerContainer from "./components/BannerContainer";
import { useEffect, useState } from "react";
import { getMatches } from "./logic/firebase";
import { getBetsOnChain, getMatchesOnChain } from "./logic/chain-calls";
import MatchContainer from "./components/MatchContainer";
import UpcomingMatchContainer from "./components/UpcomingMatchContainer";
import dayjs from "dayjs";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import PreviousMatchContainer from "./components/PreviousMatchContainer";

const Home = () => {

    const wallet = useAnchorWallet();

    const [live, setLive] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [previous, setPrevious] = useState([]); 
    const [loading, setLoading] = useState(true);

    const now = dayjs();

    useEffect(() => {
        (async () => {
          const raw_data = await getMatches();
            
            await getMatchesOnChain(wallet);

          let tempLive = [];
          let tempUpcoming = [];
          let past = [];
          
          for(const i in raw_data){
            const date = dayjs.unix(raw_data[i].Time.seconds);
            if(date - now < 0 && raw_data[i].Past === false){
                tempLive.push(raw_data[i]);
            }
            else if(date - now < 0 && raw_data[i].Past === true){
                past.push(raw_data[i]);
            }
            else{
                tempUpcoming.push(raw_data[i]);
            }
          }

          setLive(tempLive);
          setUpcoming(tempUpcoming);
          setPrevious(past);
          setLoading(false);
        })();
      }, []);

    return (    
      <div>
        <div className='flex flex-col w-[calc(100vw-5rem)] min-h-[calc(100vh-6rem)] float-right justify-center items-center bg-dark-bg py-4'>
            <BannerContainer />
            
            <h3 className="text-3xl text-center text-white mb-5 mt-2">{ live.length === 0 ?"There Are No Live Matches At The Moment!" : "Live Matches" }</h3>
            <div className="flex flex-wrap gap-5 justify-evenly px-4">                
                {live.map((mat) => (
                <MatchContainer sideA={mat.SideA} sideB={mat.SideB} addr={mat.Address} />
                ))}
            </div>
            <h3 className="text-3xl text-center text-white my-5">{ upcoming.length === 0 ? "There Are No Upcoming Matches At The Moment" : "Upcoming Matches"}</h3>
            <div className='flex flex-wrap gap-5 justify-around px-4'>
                {upcoming.map((mat) => (
                <UpcomingMatchContainer date={mat.Time.seconds} sideA={mat.SideA} sideB={mat.SideB} addr={mat.Address} />
                ))}
            </div>
            <h3 className="text-3xl text-center text-white my-5">{ previous.length === 0 ? "There Are No Previous Matches" : "Previous Matches"}</h3>
            <div className='flex flex-wrap gap-5 justify-around px-4'>
                {previous.map((mat) => (
                <PreviousMatchContainer date={mat.Time.seconds} sideA={mat.SideA} sideB={mat.SideB} addr={mat.Address} />
                ))}
            </div>
        </div>
      </div>  
    );
}

export default Home;