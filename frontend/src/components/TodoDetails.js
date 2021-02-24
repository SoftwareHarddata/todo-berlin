import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getTodo} from "../services/todoApi";
import Todo from "./Todo";

export default function TodoDetails(){
    const {id} = useParams()
    const [todo, setTodo] = useState(null)

    // ich bin die Todo id #: {todo.id}
    useEffect(()=> {
        getTodo(id).then(setTodo)
    }, [])
    return(
        <>{
                todo && <Todo todo={todo} detailView/>}</>
    )
}