import React from 'react';

export default class Timer extends React.Component{

	constructor(){
		super();
		this.state = {
			time : 0
		};
		this.init.bind(this);
	}

	componentDidMount(){
		this.Time = this.setTime();
	}

	init(){
		clearInterval(this.Time)
		this.setState({
			time:0
		});
		this.Time = this.setTime();
	}
	// 0 => init
	// 1 => gameover
	// 2 => win
	// 3 => surrender
	// 4 => stop
	componentWillReceiveProps(nextProps){
		console.log(nextProps.type)
		console.log(nextProps.stop +" "+this.props.stop)
		if(nextProps.type === 1 ){
			clearInterval(this.Time);
		}else if(nextProps.type === 2){
			clearInterval(this.Time);
		}else if(nextProps.type === 3){
			this.init();
		}else if(nextProps.type === 4){
			if(nextProps.stop !== this.props.stop && !nextProps.stop){
				clearInterval(this.Time);
			}else if(nextProps.stop !== this.props.stop && nextProps.stop){
				this.Time = this.setTime();
			}
		}else if(nextProps.type === 0){
			if(nextProps.restart !== this.props.restart && !nextProps.restart){
				this.setState({
					time:0
				});
				clearInterval(this.Time);
				this.Time = this.setTime();
			}
		}


		// if(nextProps.stop === 1 || nextProps.stop === 2 || (nextProps.stop !== this.props.stop && nextProps.stop)){
		// 	clearInterval(this.Time);
		// }else if((nextProps.stop !== this.props.stop && !nextProps.stop)){
		// 	this.Time = this.setTime();
		// }
		// console.log(nextProps.stop)
		// if((nextProps.restart !== this.props.restart && !nextProps.restart) || (this.props.surrender !== nextProps.surrender)){
		// 	this.setState({
		// 		time : 0
		// 	});
		// 	clearInterval(this.Time);
		// 	this.Time = this.setTime();
		// }
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
