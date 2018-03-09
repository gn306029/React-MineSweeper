import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Timer from "./Timer.js";
import GGWP from "./Ggwp.js";
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

class GameContainer extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			// the row will save every give the child dom props
			rows:this.createBombArea(props),
			gg : 0
		}
		this.bombNum = this.state.rows["bombNum"];
		this.re = false;
	}

	createBombArea(props){
		let table = [];
		let bomb = 0;
		for(let i =0;i<props.rows;i++){
			table.push([]);
			for(let j=0;j<props.cols;j++){
				let boom = (Math.floor(Math.random()*100)<=20?true:false);
				bomb += (boom)?1:0;
				// let every props push in the table , 
				// the table will return to constructor then save in the state
				table[i].push({
					row:i,
					col:j,
					isOpened:false,
					hasMine:boom,
					hasFlag:false,
					count:"",
					boxClass:"box off"
				});
			}
		}
		// All bomb num 
		table["bombNum"] = bomb;
		return table;
	}

	checkallarea(){
		let _rows = this.state.rows;
		let bombNum = 0;
		_rows.filter((r) => {
			r.filter((_r) =>{
				if(_r.hasMine && (_r.isOpened || _r.hasFlag)){
					bombNum ++;
				}
			});
		});
		if(bombNum === this.state.rows["bombNum"]){
			this.win();
		}
	}

	restart(){
		let table = this.createBombArea(this.props);
		this.setState({
			rows : table,
			gg : 0
		});
		this.bombNum = this.state.rows["bombNum"];
		this.re = false;
	}

	gameover(){
		this.setState({
			gg : 1
		});
		this.re = true;
	}

	win(){
		this.setState({
			gg : 2
		});
	}

	rightclick(BombArea,e){
		e.preventDefault();
		if(BombArea.isOpened || this.state.gg === 1) return;
		let _rows = this.state.rows;
		if(!_rows[BombArea.row][BombArea.col].hasFlag){
			_rows[BombArea.row][BombArea.col].hasFlag = true;
			_rows[BombArea.row][BombArea.col].count = "F";
			this.bombNum --;
			this.checkallarea();
		}else{
			_rows[BombArea.row][BombArea.col].hasFlag = false;
			_rows[BombArea.row][BombArea.col].count = "";
			this.bombNum ++;
		}
		this.setState({
			rows:_rows
		});
	}

	clickarea(BombArea){
		let _rows = this.state.rows;
		let NeiBombSum = this.countbomb(BombArea);
		if(BombArea.isOpened || BombArea.hasFlag || this.state.gg === 1) return;
		_rows[BombArea.row][BombArea.col].isOpened = true;
		_rows[BombArea.row][BombArea.col].boxClass = "box on";
		// if click's BombArea has the Bomb , the game over
		// else if neighbour BombArea not have a bomb , it not show anything
		// then call openaround
		// other will show neighbour Bomb Num
		if(BombArea.hasMine){
			_rows[BombArea.row][BombArea.col].count = "X";
		}else{
			if(NeiBombSum === 0){
				_rows[BombArea.row][BombArea.col].count = "";
			}else{
				_rows[BombArea.row][BombArea.col].count = NeiBombSum
			}
		}
		this.setState({
			rows:_rows
		});
		if(BombArea.hasMine && BombArea.isOpened){
			this.gameover();
		}
		if(!BombArea.hasMine && NeiBombSum === 0){
			this.openaround(BombArea);
		}
		this.checkallarea();
	}

	openaround(BombArea){
		// if this BombArea around not over the gamecontainer edge
		// and this BombArea position not has Bomb
		// and this BombArea position not equal now BombArea position
		// and this BombArea position not open
		// will call clickarea do recursive 
		let rowsArr = this.state.rows;
		for(let row = -1;row<=1;row++){
			for(let col=-1;col<=1;col++){
				if(BombArea.row + row >= 0 && BombArea.col + col >= 0 &&
				   BombArea.row + row < this.state.rows.length &&
				   BombArea.col + col < this.state.rows[0].length &&
				   !this.state.rows[BombArea.row + row][BombArea.col + col].hasFlag &&
				   !this.state.rows[BombArea.row + row][BombArea.col + col].hasMine &&
				   !(row === 0 && col === 0) &&
				   !this.state.rows[BombArea.row + row][BombArea.col + col].isOpened){
					this.clickarea(rowsArr[BombArea.row + row][BombArea.col + col]);
				}
			}
		}
	}

	countbomb(BombArea){
		// cul BombArea around Bomb Num
		// condition like openaround
		let count = 0;
		for(let row = -1;row<=1;row++){
			for(let col=-1;col<=1;col++){
				if(BombArea.row + row >= 0 && BombArea.col + col >= 0 &&
				   BombArea.row + row < this.state.rows.length &&
				   BombArea.col + col < this.state.rows[0].length &&
				   this.state.rows[BombArea.row + row][BombArea.col + col].hasMine &&
				   !(row === 0 && col === 0)){
					count ++;
				}
			}
		}
		return count;
	}

	render(){
		let width = this.props.rows * 35;
		let Rows = this.state.rows.map((row,index) => {
			// render row child elements
			return(
				<BombArea key={"_"+index} cells={row} clickarea={this.clickarea.bind(this)} rightclick={this.rightclick.bind(this)}/>
			)
		});
		return(
			<div>
			<table className="grid" style={{"width":width}}>
				<tbody>
				{Rows}
				</tbody>
			</table>
			<p className="BombCul">Boom Quantity:{this.bombNum}</p>
			<Timer 
				stop={this.state.gg}
				restart={this.re}
			/>
			<GGWP
				start={this.state.gg}
				restart={this.restart.bind(this)}
			/>
			</div>
		);
	}

}

class Board extends React.Component{

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
				className={this.state.boxClass}
				onClick={this.clickarea.bind(this)}
				onContextMenu={this.rightclick.bind(this)}
				key={this.props.row+"_"+this.props.col}
			>
			<p>{this.state.count}</p>
			</td>
		);
	}

}

class BombArea extends React.Component{


	constructor(props){
		super(props);
		this.state = {
			cell : props.cells
		};
	}

	componentWillReceiveProps(nextProps) {
		if(this.props != nextProps){
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

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
