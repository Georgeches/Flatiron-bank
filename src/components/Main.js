import './style.css'
import ShowRecords from './Records';
import NewRecord from './NewRecord';
import { useState, useEffect } from 'react';

function Main(){
    const [records, postRecords] = useState([])
    const [userSearch, postSearch] = useState('')
    const [selectedCategory, postSelection] = useState('')

    useEffect(()=>{
        fetch('http://localhost:4001/transactions')
        .then(res=>res.json())
        .then(data => postRecords(data))
    }, [])


    console.log(records)

    const filterRecords = records.filter(record =>
        record.description.toLowerCase().search(userSearch.toLowerCase()) > -1
    );
    
    const matchingRecords = filterRecords.filter(record=>
        record.category.toLowerCase().search(selectedCategory) > -1
    );

    return(
        <main>
            <form>
                <input type="text" placeholder="Type to filter records..." id="filter" onChange={
                e=>{
                    postSearch(e.target.value) 
                    console.log(userSearch)
                    console.log(records)
                }
                } 
                />
                <select onChange={e=>postSelection(e.target.value)}>
                    <option value="">All</option>
                    <option value="income">Income</option>
                    <option value="food">Food</option>
                    <option value="fashion">Fashion</option>
                    <option value="gift">Gift</option>
                    <option value="transportation">Transportation</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="housing">Housing</option>
                </select>
            </form>
            <NewRecord />
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Description</td>
                        <td>Date</td>
                        <td>Amount</td>
                        <td>Category</td>
                    </tr>
                </thead>
                
                <tbody>
                    {matchingRecords.map(record => <ShowRecords 
                                            id={record.id}
                                            description={record.description} 
                                            date={record.date} 
                                            amount={record.amount}
                                            category={record.category}
                                            recordsPost = {postRecords}
                                            allRecords = {records}
                                        />)}
                </tbody>
            </table>
        </main>
    )
}

export default Main;