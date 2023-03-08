import BannerContainer from "./components/BannerContainer";
import MatchContainer from "./components/MatchContainer";
import UpcomingMatchContainer from "./components/UpcomingMatchContainer";

const Home = () => {
    return (    
        <div className='flex flex-col w-[calc(100vw-5rem)] min-h-[calc(100vh-6rem)] float-right justify-center items-center bg-gray-800 py-4'>
            <BannerContainer />
            
            <h3 className="text-3xl text-center text-white mb-5">Live Matches</h3>
            <div className="flex flex-wrap gap-5 justify-evenly px-4">                
                <MatchContainer />
                <MatchContainer />
                <MatchContainer />
                <MatchContainer />
                <MatchContainer />
                <MatchContainer />
                <MatchContainer />
                <MatchContainer />
                <MatchContainer />
                <MatchContainer />
                <MatchContainer />
                <MatchContainer />
            </div>

            <h3 className="text-3xl text-center text-white my-5">Upcoming Matches</h3>
            <div className='flex flex-wrap gap-5 justify-around px-4'>
                <UpcomingMatchContainer />
                <UpcomingMatchContainer />
                <UpcomingMatchContainer />
                <UpcomingMatchContainer />
                <UpcomingMatchContainer />
                <UpcomingMatchContainer />
                <UpcomingMatchContainer />
                <UpcomingMatchContainer />
            </div>
        </div>
    );
}

export default Home;