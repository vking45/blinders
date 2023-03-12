import React from "react";
import dayjs from "dayjs";
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

class UpcomingMatchContainer extends React.Component {

    render() {
    return (
        <div className="flex justify-between items-center w-80 bg-white p-5 rounded-lg">
            <div className="">
                <div className="rounded-full w-20 h-20 mb-1 bg-gray-600">
                    
                </div>

                <div className="text-center">
                    <span>{this.props.sideA}</span>
                </div>
            </div>
            <div className='flex flex-col justify-end gap-3 items-center text-3xl h-full'>
                <div> 
                    <p className='text-lg mr-2 mb-1 text-center text-red-500'>{dayjs.unix(this.props.date).fromNow(true)}</p>
                    <p className='text-xs text-center text-black'>{dayjs.unix(this.props.date).format('DD/MM/YYYY')}</p>
                </div>
                <button className="justify-self-end text-lg text-center text-white bg-gray-700 px-3 rounded">Bet</button>
            </div>
            <div className="">
                <div className="rounded-full w-20 h-20 mb-1 bg-gray-600">
                    
                </div>
    
                <div className="text-center">
                    <span>{this.props.sideB}</span>
                </div>
            </div>
        </div>
    )
    }
}

export default UpcomingMatchContainer;