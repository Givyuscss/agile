import React, { Component } from "react";
import ListItem from "./ListItem";
import NewItem from "./NewItem"
import DoneItem from "./DoneItem"

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
              {
                this.state.todolist.map(item => <ListItem item={item}/>)
              }
              <NewItem addItem = {this.addNewItem}/>
              <DoneItem doneItem = {this.DoneItem}/>
            </div>
          );
    }
}

export default TodoList