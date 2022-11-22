import * as React from "react";
import * as ReactDOM from "react-dom/client";

interface ListProps {
    value: string,
}

interface BoardState {
    answers: string[],
    distractors: string[],
  }

function List(props: ListProps){
    return (
       <div className="list-content">
          {props.value}
       </div>
    )
}



class Board extends React.Component<{}, BoardState> {
  
  constructor(props: {}){
    super(props);
    this.state = {
        answers: [],
        distractors: [],
    }
  }
  
  componentDidMount() {
    fetch('http://kuiz.kixlab.org:8080/getOptions')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            answers: result.answers,
            distractors: result.distractors,
          })
        },
        (error) => {
          console.log("Failed to fetch");
        }
      )
  }
  
  updateList(e: any){
    e.preventDefault();
    let new_answers, new_distractors;
    
    const input = e.target.text.value;
    const isAnswer = (e.target.type.value == 0);
    
    if(input === '')
      return
    
    fetch('http://kuiz.kixlab.org:8080/submitOption', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        optionLabel: input,
        isAnswer: isAnswer,
      }),
  }).then(res => res.json())
    .then(
        (result) => {
          if(!result.success){
            alert('response was not successful!');
            return;
          }
          
          if (isAnswer){
            new_answers = [...this.state.answers, input];
            new_distractors = [...this.state.distractors];
          } else {
            new_answers = [...this.state.answers];
            new_distractors = [...this.state.distractors, input];
          }
          
          this.setState({
            answers: new_answers,
            distractors: new_distractors,
          })
        },
        (error) => {
          console.log("Failed to fetch");
        }
      )
  }
  
  render() {
    return (
      <div>
        <div className="list-scroll">
          <div className="list-wrapper">
            <div className="list-title">Answers</div>
            {this.state.answers.map((v, i) => (<List key={i} value={v}/>))}
               
          </div>
          <div className="list-wrapper">
            <div className="list-title">Distractors</div>
            {
                this.state.distractors.map((v, i) => (<List key={i} value={v}/>))
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
                <input type="radio" name="type" id="answer" value="0" defaultChecked={true}></input>
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