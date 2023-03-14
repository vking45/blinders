import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

class PreviousMatchContainer extends React.Component {

    render() {
    return (
        <Link to={`/dashboard/view/${this.props.addr}`}>
        <div className="flex justify-between items-center w-80 bg-purple-bg-dark p-5 rounded-lg">
            {/* <div> */}
            <div className="">
                <div className="rounded-full w-20 h-20 mb-1 bg-dark-bg">
                    
                </div>

                <div className="text-center text-white">
                    <span>{this.props.sideA}</span>
                </div>
            </div>
{/*             
            <div className='flex justify-evenly items-center text-3xl'>
                <div> 
                    <p className='text-center my-2'>VS</p>
                </div>
            </div> */}
            <div className='flex flex-col justify-end gap-3 items-center text-3xl h-full'>
                <div> 
                    <p className='text-lg mr-2 mb-1 text-center text-red-500'></p>
                    <p className='text-center my-2 text-white'>VS</p>
                    <p className='text-xs text-center text-white'>{dayjs.unix(this.props.date).format('DD/MM/YYYY')}</p>
                </div>
            </div>
            <div className="">
                <div className="rounded-full w-20 h-20 mb-1 bg-dark-bg">
                    
                </div>
    
                <div className="text-center text-white">
                    <span>{this.props.sideB}</span>
                </div>
            </div>
            {/* </div> */}
        </div>
            </Link>
        )
    }
}

export default PreviousMatchContainer;