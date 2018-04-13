import React from 'react';
import ReactDOM from 'react-dom';
import GameContainer from "./component/GameContainer.js";
import registerServiceWorker from './registerServiceWorker';

class Main extends React.Component{

	constructor(){
		// set gamecontainer size
		super();
		this.rows = 10;
		this.cols = 10;
	}

	render(){
		return(
			<div>
				<GameContainer
					rows={this.rows}
					cols={this.cols}
				/>
			</div>
		);
	}

}

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
