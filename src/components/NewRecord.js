import { useState} from 'react';

function NewRecord(){
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('')
    function AddRecord(e){
        e.preventDefault()
        let newRecord = {
            description: description,
            date: date,
            amount: amount,
            category: category
        }
        fetch('http://localhost:4001/transactions',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRecord)
        })
        .then(res=>res.json())
        .then(newData => console.log(newData))
        window.location.reload()
    }

    return(
        <div className='new-record'>
            <form onSubmit={AddRecord}>
                <input type="text" placeholder="Enter description" id="description" onChange={e=>setDescription(e.target.value)}/>
                <input type="date" id="date" onChange={e=>setDate(e.target.value)}/>
                <input type="number" placeholder="Enter amount" id="amount" onChange={e=>setAmount(e.target.value)}/>
                <input type="text" placeholder="Enter category" id="category" onChange={e=>setCategory(e.target.value)}/>
                <input type="submit" value="Add transaction"/>
            </form>
        </div>
    )
}

export default NewRecord;