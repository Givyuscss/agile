import React, { Component } from "react"

class DoneItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            inputContent: ''
        }
    }

    onInputChange = (event) => {
        this.setState({
            inputContent: event.target.value
        })
    } 
    onDoneBtnClick = () => {
        this.props.doneItem(this.state.inputContent)
        this.setState({
            inputContent: ''
        })
    }
    render(){
        return(
            <div>
                <input  value={this.state.inputContent} onChange={this.onInputChange} />
                <button onClick = {this.onDoneBtnClick}>Done</button>
            </div>
        )
    }
}

export default DoneItem