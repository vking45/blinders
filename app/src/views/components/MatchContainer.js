import React from "react";
import { Link } from "react-router-dom";

class MatchContainer extends React.Component {

    render() {
    return (
        <div className="flex justify-between items-center w-80 bg-purple-bg-dark p-5 rounded-lg">
            <div className="">
                <div className="rounded-full w-20 h-20 mb-1 bg-dark-bg">
                    
                </div>

                <div className="text-center text-white">
                    <span>{this.props.sideA}</span>
                </div>
            </div>
            <div className='flex justify-evenly items-center text-3xl'>
                <div> 
                    <p className='text-center text-white my-2'>VS</p>
                    <Link to={`/dashboard/view/${this.props.addr}`}>
                    <div className='flex justify-center gap-2 items-baseline bg-red-700 w-14 h-6 rounded-sm'>
                        <div className='bg-white w-2 h-2 ml-1 rounded-full'></div>
                        <p className='text-sm text-center text-white'>Live</p>
                    </div>
                    </Link>
                </div>
            </div>
            <div className="">
                <div className="rounded-full w-20 h-20 mb-1 bg-dark-bg">
                    
                </div>
    
                <div className="text-center text-white">
                    <span>{this.props.sideB}</span>
                </div>
            </div>
        </div>
        )
    }
}

export default MatchContainer;