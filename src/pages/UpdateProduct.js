import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/product/${id}`);
                setName(res.data.name);
                setPrice(res.data.price);
                setStock(res.data.stock);
                setCategory(res.data.category);

            } catch (error) {
                setMessage("Error Fetching User")

            }
            //ถ้า ไม่มี Dependency => useEffect() จะทำงานทุกครั้งที่ Component ทำการ render
            //ถ้า [] ว่างเปล่า => useEffect() จะทำฃานแค่ตอน mount (โหลดครั้งแรกเท่านั้น)
            //ถ้ามีค่าใน Dependency => useEffect() จะทำงานเมื่อค่าที่กำหนดเปลี่ยนแปลง
        }
        if (id) {
            fetchUser();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
           await axios
                .put(`http://localhost:5000/update-product/${id}`, { name, price, stock, category });
            navigate("/")

        } catch (error) {
            setMessage("Error Updating User. Please Try Again")

        }
    }

    return (
        <div className='container'>
            <h2>Update Product</h2>
            {message && <p className='text-danger'>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className='w-25 mb-3'>
                    <label className='form-label'>Reportedissues: {name}</label>
                    <input
                        type='text'
                        className='form-control'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className='w-25 mb-3'>
                    <label className='form-label'>Notificationdate: {price}</label>
                    <input
                        type='text'
                        className='form-control'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>

                <div className='w-25 mb-3'>
                    <label className='form-label'>phone: {stock}</label>
                    <input
                        type='text'
                        className='form-control'
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                    />
                </div>

                <div className='w-25 mb-3'>
                    <label className='form-label'>Problematicplaces: {category}</label>
                    <input
                        type='text'
                        className='form-control'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </div>

                <button type='submit' className='btn btn-success'>Submit</button>
            </form>
        </div>
    )
}
export default UpdateProduct;