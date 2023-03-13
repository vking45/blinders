import React from "react";
import { BiCoinStack } from "react-icons/bi";
import dayjs from "dayjs";
import { getSpecificMatch } from "../logic/firebase";
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

class AcceptedBetContainer extends React.Component {

    state = { sideA : "", sideB : "", condition : "" , date : "" ,loading : true};

    componentDidMount() {
        getSpecificMatch(this.props.addr).then((mat) => {
            console.log(mat);
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
        <div className="flex flex-col justify-between items-center gap-10 bg-white p-10 rounded-md">
            <div className='flex flex-row gap-8'>
                <div className="">
                    <div className="rounded-full w-20 h-20 mb-1 bg-gray-600">
                        
                    </div>

                    <div className="text-center">
                        <span>{this.state.sideA}</span>
                    </div>
                </div>
                <div className='flex flex-col justify-center gap-3 items-center text-3xl h-full'>
                    <div> 
                        <p className='text-sm mr-2 mb-1 text-center text-red-500'>{dayjs.unix(this.state.date).fromNow(true)}</p>
                        <p className='text-xs text-center text-black'>{dayjs.unix(this.state.date).format('DD/MM/YYYY')}</p>
                    </div>
                </div>
                <div className="">
                    <div className="rounded-full w-20 h-20 mb-1 bg-gray-600">
                        
                    </div>
        
                    <div className="text-center">
                        <span>{this.state.sideB}</span>
                    </div>
                </div>
            </div>

            <div className=''>
                <h6 className='text-md'>Prediction</h6>
                <div className='bg-gray-500 rounded-md'>
                    <p className="text-white text-sm w-80 h-7 p-1 px-4">{this.state.condition}</p>
                </div>
            </div>

            <div className='flex flex-row justify-between items-center w-full'>
                <div className="flex justify-center items-center">
                    <BiCoinStack size={28} title="Prize" />
                    <span>{this.props.amount/10**6}</span>
                </div>
            </div>
        </div>
    );
    }
}

export default AcceptedBetContainer;