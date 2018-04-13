import React from 'react';

export default class Surrender extends React.Component{

	surrender(){
		this.props.surrender();
	}

	render(){
		return(
			<div className="stop">
				<button className="btn btn-success" onClick={this.surrender.bind(this)}>
					Surrender
				</button>
			</div>
		);
	}

}