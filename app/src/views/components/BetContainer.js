import React from "react";
import dayjs from "dayjs";
import { BiCoinStack } from "react-icons/bi";
import { getSpecificMatch } from "../logic/firebase";
import { Link } from "react-router-dom";
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

class BetContainer extends React.Component {

    state = { sideA : "", sideB : "", condition : "" , date : "" ,loading : true};

    componentDidMount() {
        getSpecificMatch(this.props.addr).then((mat) => {
            if(this.props.cond === "one"){
                this.setState({ condition : mat[0].One });
            } else if(this.props.cond === "two"){
                this.setState({ condition : mat[0].Two });
            } else if(this.props.cond === "three"){
                this.setState({ condition : mat[0].Three });
            } else if(this.props.cond === "four"){
                this.setState({ condition : mat[0].Four });
            } else if(this.props.cond === "five"){
                this.setState({ condition : mat[0].Five });
            }
            this.setState({ sideA : mat[0].SideA, sideB : mat[0].SideB, date : mat[0].Time.seconds, loading : false});
        });
    }

    render() {
    return (
        <div className="flex flex-col justify-between items-center gap-10 bg-purple-bg-dark p-10 rounded-md">
            <div className='flex flex-row gap-8'>
                <div className="">
                    <div className="rounded-full w-20 h-20 mb-1 bg-gray-600">
                        
                    </div>

                    <div className="text-center text-white">
                        <span>{this.state.loading ? "Loading..." : this.state.sideA}</span>
                    </div>
                </div>
                <div className='flex flex-col justify-center gap-3 items-center text-3xl h-full'>
                    <div> 
                        <p className='text-sm mr-2 mb-1 text-center text-red-500'>Creator : </p>
                        <p className='text-xs text-center text-white'>{this.props.creator.slice(0,10)}</p>
                    </div>
                </div>
                <div className="">
                    <div className="rounded-full w-20 h-20 mb-1 bg-gray-600">
                        
                    </div>
        
                    <div className="text-center text-white">
                        <span>{this.state.loading ? "Loading..." : this.state.sideB}</span>
                    </div>
                </div>
            </div>

            <div className=''>
                <h6 className='text-md text-white'>Prediction</h6>
                <div className='bg-gray-500 rounded-md'>
                    <p className="text-white text-sm w-80 h-7 p-1 px-4">{this.state.condition}</p>
                </div>
            </div>

            <div className='flex flex-row justify-between items-center w-full'>
                <div className="flex justify-center items-center text-white">
                    {/* <p className="rounded-md text-sm text-center">Prize</p> */}
                    <BiCoinStack size={28} title="Prize" />
                    <span>{this.props.amount/10**6}</span>
                </div>

                <div className="flex"> 
                { this.props.past ?
                    <Link to={`/withdraw/${this.props.bet}/`} className="bg-gray-500 p-1 rounded-sm text-white">Withdraw Bet</Link>
                    :
                    <Link to={`/accept/${this.props.bet}/`} className="bg-gray-500 p-1 rounded-sm text-white">Accept Bet</Link>
                }
                </div>
            </div>
        </div>
    );
    }
}

export default BetContainer;