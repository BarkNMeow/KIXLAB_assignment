class List extends React.Component {  
  render() {
    return (
       <div>
          {this.props.value}
       </div>
    )
  }
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        answers: [],
        distractors: [],
    }
  }
  render() {
    return (
      <div>
        <div className="list-scroll">
          <div className="list-wrapper">
            <div className="list-title">Answers</div>
            {
                this.state.answers.map(v => (<List value={v}/>))
            }
          </div>
          <div className="list-wrapper">
            <div className="list-title">Distractors</div>
            {
                this.state.distractors.map(v => (<List value={v}/>))
            }
          </div>
        </div>
        <div className="list-insert">
          <div>Create a New Option</div>
          <div>
              <div>
                <input placeholder="Type to create option..."></input>
              </div>
              <div>
                 <label name="answer">Answer</label>
                 <input type="radio" name="answer"></input>
              </div>
              <div>
                 <label name="answer">Answer</label>
                 <input type="radio" name="answer"></input>
              </div>
          </div>
          <div>
            <button>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Board />);
