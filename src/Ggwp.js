import React from 'react';

export default class GGWP extends React.Component{

	constructor(){
		super();
		this.gg = 0;
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.start === 1){
			this.gg = 1;
		}else if(nextProps.start === 2){
			this.gg = 2;
		}
	}

	restart(){
		this.props.restart();
		this.gg = 0;
	}

	render(){
		if(this.gg === 1){
			return(
				<div className="Restart">
					<p className="GGWP">!!!! GGWP !!!!</p>
					<button 
					onClick={this.restart.bind(this)}
					>
						Restart
					</button>
				</div>
			);
		}else if(this.gg === 2){
			return(
				<div className="Restart">
					<p className="GGWP">!!!! You Win !!!!</p>
					<button 
					onClick={this.restart.bind(this)}
					>
						Restart
					</button>
				</div>
			);
		}else{
			return(
				<div>
					<p className="GGWP">MineSweeper</p>
				</div>
			);
		}	
	}
}