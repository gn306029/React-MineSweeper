import React from 'react';

export default class Stop extends React.Component{

	render(){
		return(
			<div className="stop">
				<button className="btn btn-danger" onClick={this.props.stop}>
					Stop
				</button>
			</div>
		);
	}

}