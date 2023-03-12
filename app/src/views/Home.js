import BannerContainer from "./components/BannerContainer";
import { useEffect, useState } from "react";
import { getMatches } from "./logic/firebase";
import { getBetsOnChain, getMatchesOnChain } from "./logic/chain-calls";
import MatchContainer from "./components/MatchContainer";
import UpcomingMatchContainer from "./components/UpcomingMatchContainer";
import dayjs from "dayjs";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

const Home = () => {

    const wallet = useAnchorWallet();

    const [live, setLive] = useState([]);
    const [upcoming, setUpcoming] = useState([]);

    const now = dayjs();

    useEffect(() => {
        (async () => {
          const raw_data = await getMatches();
            
            await getMatchesOnChain(wallet);
            await getBetsOnChain(wallet);

          let tempLive = [];
          let tempUpcoming = [];
          
          for(const i in raw_data){
            const date = dayjs.unix(raw_data[i].Time.seconds);
            if(date - now < 0){
                tempLive.push(raw_data[i]);
            }
            else{
                tempUpcoming.push(raw_data[i]);
            }
          }

          setLive(tempLive);
          setUpcoming(tempUpcoming);

        })();
      }, []);

    return (    
        <div className='flex flex-col w-[calc(100vw-5rem)] min-h-[calc(100vh-6rem)] float-right justify-center items-center bg-gray-800 py-4'>
            <BannerContainer />
            
            <h3 className="text-3xl text-center text-white mb-5">{ live.length === 0 ?"There No Live Matches At The Moment!" : "Live Matches" }</h3>
            <div className="flex flex-wrap gap-5 justify-evenly px-4">                
                {live.map((mat) => (
                <MatchContainer sideA={mat.SideA} sideB={mat.SideB} />
                ))}
            </div>
            <h3 className="text-3xl text-center text-white my-5">Upcoming Matches</h3>
            <div className='flex flex-wrap gap-5 justify-around px-4'>
                {upcoming.map((mat) => (
                <UpcomingMatchContainer date={mat.Time.seconds} sideA={mat.SideA} sideB={mat.SideB} addr={mat.Address} />
                ))}
            </div>
        </div>
    );
}

export default Home;