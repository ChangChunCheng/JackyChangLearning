import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

/*
https://zh-hant.reactjs.org/tutorial/tutorial.html#wrapping-up

React: 用組件(Component)建立畫面
組件特性:
1. 建立時 
  (1)啟動建構子(constructor)
  (2)從父層取得props(properties)
  (3)建立畫面render()
  (4)掛載畫面componentDidMount()
2. 更新時
  (1)從父層取得props static getDerivedStateFromProps()
  (2)判斷原/新組件差異shouldComponentUpdate()
  (3)建立畫面render()
  (4)紀錄前次畫面getSnapshotBeforeUpdate()
  (5)更新畫面componentDidUpdate()
Note: https://zh-hant.reactjs.org/docs/react-component.html
3. 單向資料流
  依靠父層props傳遞資料
4. 物件資料利用Component.state存取
  Component.state不可變: 不可直接進行計算
  註記：可透過區域變數進行複製，計算完成透利用setState更新
*/

class Square extends React.Component {
  render() {
    return (
      <button
        onClick={() => this.props.onClick()}
        className="square"
        style={this.props.current_changed}
      >
        {" "}
        {this.props.value}{" "}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        current_changed={
          this.props.focus.includes(i) ? { border: "2px solid #000" } : {}
        }
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    let get_squares = [];
    for (var i = 0; i < this.props.squares.length; i = i + 3) {
      get_squares = get_squares.concat([
        <div className="board-row">
          {" "}
          {this.renderSquare(i)}
          {this.renderSquare(i + 1)}
          {this.renderSquare(i + 2)}{" "}
        </div>,
      ]);
    }
    return <div> {get_squares} </div>;
    // <div>
    //   {" "}
    //   <div className="board-row">
    //     {" "}
    //     {this.renderSquare(0)} {this.renderSquare(1)} {this.renderSquare(2)}{" "}
    //   </div>{" "}
    //   <div className="board-row">
    //     {" "}
    //     {this.renderSquare(3)} {this.renderSquare(4)} {this.renderSquare(5)}{" "}
    //   </div>{" "}
    //   <div className="board-row">
    //     {" "}
    //     {this.renderSquare(6)} {this.renderSquare(7)} {this.renderSquare(8)}{" "}
    //   </div>{" "}
    // </div>
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], win: lines[i] };
    }
  }
  return null;
}

function diff_arr(a1, a2) {
  if (a1.length !== a2.length) {
    console.log("Length err");
    return;
  }
  var changed = [];
  for (var i = 0; i < a1.length; i++) {
    if (a1[i] !== a2[i]) {
      changed = changed.concat([i]);
    }
  }
  return changed;
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.init_state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      changed: [null],
      rev: false,
    };
    this.state = this.init_state;
  }

  reset_Game() {
    this.setState(this.init_state);
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const changed = this.state.changed.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    var current_changed = null;
    current_changed = diff_arr(history[history.length - 1].squares, squares);

    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      changed: changed.concat(current_changed),
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  rev_show() {
    const rev = this.state.rev;
    this.setState({
      rev: !rev,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const changed = this.state.changed;
    console.log(changed);
    const current_changed = changed[changed.length - 1];
    console.log(current_changed);

    var moves = changed.map((step, move) => {
      // const desc = move ? "Go to move #" + move : "Go to game start";
      const desc = move
        ? "(" + ((step % 3) + 1) + "," + Math.floor(step / 3 + 1) + ")"
        : "Go to game start!";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}> {desc} </button>{" "}
        </li>
      );
    });
    if (this.state.rev) {
      moves = moves.reverse();
    }

    let status;
    let focus;
    if (winner) {
      status = "Winner: " + winner.winner;
      focus = winner.win;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      focus = [current_changed];
      if (this.state.stepNumber === 9) {
        status = "Duce: No player win!";
      }
    }

    return (
      <div className="game">
        <div className="game-board">
          {" "}
          <Board
            squares={current.squares}
            focus={focus}
            onClick={(i) => this.handleClick(i)}
          />{" "}
        </div>{" "}
        <div className="game-info">
          <div> {status} </div>
          <li>
            <button onClick={() => this.reset_Game()}>Reset</button>
            <button onClick={() => this.rev_show()}>Reverse</button>
          </li>
          <ol> {moves} </ol>{" "}
        </div>{" "}
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
