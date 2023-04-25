import './style.css'
import ShowRecords from './Records';
import NewRecord from './NewRecord';
import { useState, useEffect } from 'react';

function Main(){
    const [records, postRecords] = useState([])
    const [userSearch, postSearch] = useState('')

    useEffect(()=>{
        fetch('http://localhost:4001/transactions')
        .then(res=>res.json())
        .then(data => postRecords(data))
    }, [])

    const matchingRecords = records.filter(record =>
        record.description.toLowerCase().search(userSearch.toLowerCase()) > -1
    );

    return(
        <main>
            <form>
                <input type="text" placeholder="Type to filter records..." id="filter" onChange={
                e=>{
                    postSearch(e.target.value) 
                    console.log(userSearch)
                    console.log(matchingRecords)
                }
                } 
                />
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
                                        />)}
                </tbody>
            </table>
        </main>
    )
}

export default Main;