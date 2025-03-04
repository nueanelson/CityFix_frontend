import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Home() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const res = await axios.get('http://localhost:5000/');
            console.log("Fetched Data:", res.data);
            setData(res.data);
            console.log("Success");
        } catch (error) {
            console.log("Fail", error);
        }
    };

    const deleteUser = async (id) => {
        if (window.confirm("Are you sure ?")) {
            try {
                await axios.delete(`http://localhost:5000/delete-product/${id}`);
                fetchProduct();
            } catch (error) {
                console.log("Error deleting product: " + error);
            }
        }
    }

    return (
        <div className='container text-center py-5'>
            <h1 className='display-3 text-primary mb-4'>CityFix</h1>

            <Link to="/create-product" className='btn btn-success btn-lg mb-4 shadow'>Create New</Link>

            <div className='table-responsive'>
                <table className="table table-hover table-striped table-bordered shadow">
                    <thead className="table-primary">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Reported Issues</th>
                            <th scope="col">Notification Date</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Problematic Places</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <th scope="row">{item.id}</th>
                                <td>{item.Reportedissues}</td>
                                <td>{item.Notificationdate}</td>
                                <td>{item.note}</td>
                                <td>{item.Problematicplaces}</td>
                                <td>
                                    <div className="btn-group" role="group">
                                        <Link to={`edit-product/${item.id}`} className='btn btn-warning text-dark me-2'>Edit</Link>
                                        <button className="btn btn-danger" onClick={() => deleteUser(item.id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
