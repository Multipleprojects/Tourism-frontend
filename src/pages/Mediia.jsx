import React, { useState } from 'react';
import axios from 'axios';

const Mediia = () => {
    const [img1, setImg1] = useState(null);
    const [img2, setImg2] = useState(null);
    const [video1, setVideo1] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('img1', img1);
        formData.append('img2', img2);
        formData.append('video1', video1);

        try {
            const res = await axios.post('http://localhost:8000/api/media/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Upload Image 1:</label>
                <input type="file" onChange={(e) => setImg1(e.target.files[0])} accept="image/*" required />
            </div>
            <div>
                <label>Upload Image 2:</label>
                <input type="file" onChange={(e) => setImg2(e.target.files[0])} accept="image/*" required />
            </div>
            <div>
                <label>Upload Video:</label>
                <input type="file" onChange={(e) => setVideo1(e.target.files[0])} accept="video/*" required />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default Mediia;
