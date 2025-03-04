import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function CreateProduct() {
    const [Reportedissues, setReportedissues] = useState("ไฟไหม้");
    const [Notificationdate, setNotificationdate] = useState("2025-03-04");
    const [note, setnote] = useState("");
    const [Problematicplaces, setProblematicplaces] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post("http://localhost:5000/create-product", { Reportedissues, Notificationdate, note, Problematicplaces });
          navigate('/'); //redirect to home page
        } catch (error) {
            setMessage("Error creating user, please try again");
        }
    }

    return (
        <div className='container'>
            <h1>Create Product</h1>
            {message && <p className='text-danger'>{message}</p>}

            <form onSubmit={handleSubmit}>
                <div className="w-25 p-3">
                    <label className='form-label'>Reportedissues:</label>
                    <select 
                    className="form-control"
                    value={Reportedissues}
                    onChange={(e) => setReportedissues(e.target.value)} 
                    required>
                        <option value="ไฟไหม้">ไฟไหม้</option>
                        <option value="น้ำท่วม">น้ำท่วม</option>
                        <option value="ถนนเป็นหลุม">ถนนเป็นหลุม</option>
                        <option value="การจัดการขยะ">การจัดการขยะ</option>
                        <option value="โทรคมนาคม">โทรคมนาคม</option>
                        <option value="ระบบระบายน้ำ">ระบบระบายน้ำ</option>
                    </select>
                </div>

                <div className="w-25 p-3">
                    <label className='form-label'>Notificationdate:</label>
                    <input type="date"
                    className="form-control" 
                    value={Notificationdate}
                    onChange={(e) => setNotificationdate(e.target.value)} 
                    required />
                </div>

                <div className="w-25 p-3">
                    <label className='form-label'>Phone (Example: 0912345678):</label>
                    <small className='d-block text-muted mb-2'>เบอร์ติดต่อ(ห้ามเว้น เขียนติดกันเลย)</small>
                    <input type="text" 
                    className="form-control" 
                    value={note}
                    onChange={(e) => setnote(e.target.value)} 
                    required />
                </div>

                <div className="w-25 p-3">
                    <label className='form-label'>Problematicplaces:</label>
                    <small className='d-block text-muted mb-2'> สถานที่ที่เกิดเหตุ ตัวอย่าง: ถนนหน้าบ้านเลขที่ 123</small>
                    <input type="text" 
                    className="form-control" 
                    value={Problematicplaces}
                    onChange={(e) => setProblematicplaces(e.target.value)} 
                    required />
                </div>

                <div className="w-25 p-3">
                    <button type="submit" className="btn btn-success">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CreateProduct;