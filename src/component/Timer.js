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
		if(nextProps.stop === 1 || nextProps.stop === 2 || (nextProps.stop !== this.props.stop && nextProps.stop)){
			clearInterval(this.Time);
		}else if((nextProps.stop !== this.props.stop && !nextProps.stop)){
			this.Time = this.setTime();
		}
		console.log(nextProps.stop)
		if((nextProps.restart !== this.props.restart && !nextProps.restart) || (this.props.surrender !== nextProps.surrender)){
			this.setState({
				time : 0
			});
			clearInterval(this.Time);
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
