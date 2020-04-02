import React, {Component} from 'react';
import './ListItem.css'

const ListDoneItem = (props) => {
    const item = props.item;
    if (item.done){
        return (
        	<p className= 'done-item'>{props.item.content}</p>
        	)
    } else{
        return null    
    }
}


export default ListDoneItem;