import React, { Component } from "react";
import ListDoneItem  from "./ListDoneItem";
import ListNewItem  from "./ListItem";
import NewItem from "./NewItem"
import DoneItem from "./DoneItem"
import "./ListItem.css"

class TodoList extends Component{
    constructor(props){
        super(props);
        this.state = {
            todolist : [
                {content:'React parctice',done:true},
                {content:'game time',done:false}
              ]
        }
    }
    addNewItem = (newItemContent) => {
        const newList = [...this.state.todolist, {content:newItemContent, done:false}];
        this.setState({
            todolist: newList
        })
    }
    DoneItem = (DoneItemContent) => {
        const ItemList = this.state.todolist.map(item =>{
            if (item.content == DoneItemContent){
                return {content: DoneItemContent, done:true}
            }else{
                return item
            }
        });
        this.setState({
            todolist: ItemList
        })
    }
    render(){
          return (
            <div> 
              <div id = "donelist">
              <p class= "tasklabel"> Done Task </p>
              {
                this.state.todolist.map(item => <ListDoneItem item={item}/>)
              }
              </div>
              <div id = "newlist">
              <p class= "tasklabel"> New Task </p>
              {
                this.state.todolist.map(item => <ListNewItem item={item}/>)
              }
              </div>
              <NewItem addItem = {this.addNewItem}/>
              <DoneItem doneItem = {this.DoneItem}/>
            </div>
          );
    }
}

export default TodoList