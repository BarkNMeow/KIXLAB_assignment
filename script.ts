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
  
  updateList(e){
    e.preventDefault();
    let new_answers, new_distractors;
    
    if (e.target.type.value == 0){
      new_answers = [...this.state.answers, e.target.text.value];
      new_distractors = [...this.state.distractors];
    } else {
      new_answers = [...this.state.answers];
      new_distractors = [...this.state.distractors, e.target.text.value];
    }
    
    this.setState({
      answers: new_answers,
      distractors: new_distractors,
    })
  }
  
  render() {
    return (
      <div>
        <div className="list-scroll">
          <div className="list-wrapper">
            <div className="list-title">Answers</div>
            {this.state.answers.map(v => (<List value={v}/>))}
               
          </div>
          <div className="list-wrapper">
            <div className="list-title">Distractors</div>
            {
                this.state.distractors.map(v => (<List value={v}/>))
            }
          </div>
        </div>
        <form className="list-insert" onSubmit={e => this.updateList(e)}>
          <div>Create a New Option</div>
          <div>
              <div>
                <input placeholder="Type to create option..." name="text"></input>
              </div>
              <label>
                Answer
                <input type="radio" name="type" id="answer" value="0"></input>
              </label>
              <label>
                Distractors
                <input type="radio" name="type" id="distractors" value="1"></input>
              </label>
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Board />);
