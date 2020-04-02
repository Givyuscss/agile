import React, {Component} from 'react';
import './ListItem.css'


const ListNewItem = (props) =>{
	const item = props.item;
	if(!item.done){
		return (
			<p className= 'item'>{props.item.content}</p>
			)
	} else{
		return null;
	}
}


export default ListNewItem