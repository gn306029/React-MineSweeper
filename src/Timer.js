import React from 'react';

export default class Timer extends React.Component{

	constructor(){
		super();
		this.state = {
			time : 0
		};
	}

	componentDidMount(){
		this.Time = this.setTime();
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.stop === 1 || nextProps.stop === 2){
			clearInterval(this.Time);
		}
		if(nextProps.restart != this.props.restart && !nextProps.restart){
			this.setState({
				time : 0
			});
			this.Time = this.setTime();
		}
	}

	setTime(){
		return setInterval(()=>{
			this.setState({
				time : this.state.time + 1
			});
		},1000);
	}

	render(){
		return(
			<div>
				<p className="Time">Time : {this.state.time} s</p>
			</div>
		);
	}

}
