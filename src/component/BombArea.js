import React from 'react';
import Board from "./Board.js";

export default  class BombArea extends React.Component{


	constructor(props){
		super(props);
		this.state = {
			cell : props.cells
		};
	}

	componentWillReceiveProps(nextProps) {
		if(this.props !== nextProps){
	        this.setState({
	            cell:nextProps.cells
	        });
		}
    }

    clickarea(BombArea){
    	this.props.clickarea(BombArea);
    }

    rightclick(BombArea,e){
    	this.props.rightclick(BombArea,e);
    }

	render(){
		let Rows = this.state.cell.map((c,index) => {
			return(
				<Board key={"row_"+index} cell={c} clickarea={this.props.clickarea} rightclick={this.rightclick.bind(this)} />
			);
		});
		return(
			<tr>
				{Rows}
			</tr>
		);
	}
}