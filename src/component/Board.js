import React from 'react';

export default  class Board extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			hasMine : props.cell.hasMine,
			hasFlag : props.cell.hasFlag,
			isOpened : props.cell.isOpened,
			boxClass : props.cell.boxClass,
			count : props.cell.count
		}
	}

	componentWillReceiveProps(nextProps) {
        this.setState({
            isOpened : nextProps.cell.isOpened,
            hasMine : nextProps.cell.hasMine,
            hasFlag : nextProps.cell.hasFlag,
            boxClass : nextProps.cell.boxClass,
            count : nextProps.cell.count
        });
    }

	clickarea(){
    	this.props.clickarea(this.props.cell);
    }

    rightclick(e){
    	this.props.rightclick(this.props.cell,e);
    }

	render(){
		// render every row the child elements

		return(
			<td 
				className={(this.state.hasFlag?"box flag off":this.state.boxClass)}
				onClick={this.clickarea.bind(this)}
				onContextMenu={this.rightclick.bind(this)}
				key={this.props.row+"_"+this.props.col}
			>
			<p>{this.state.count}</p>
			</td>
		);
	}

}