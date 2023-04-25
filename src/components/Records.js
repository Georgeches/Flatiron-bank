function ShowRecords(props){

    function removeRecord(e){
        fetch(`http://localhost:4001/transactions/${props.id}`,{
            method: 'DELETE'
        })
        .then(res=>res.json())
        .then(removedData=>console.log(removedData))
        e.target.parentNode.parentNode.remove()
    }

    return(
        <>
        <tr>
            <td>{props.id}</td>
            <td>{props.description}</td>
            <td>{props.date}</td>
            <td>{props.amount}</td>
            <td>{props.category}</td>
            <td><button onClick={removeRecord}>Delete</button></td>
        </tr>
        </> 
    )
}

export default ShowRecords;