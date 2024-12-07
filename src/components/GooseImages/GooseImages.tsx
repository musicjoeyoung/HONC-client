import { useEffect, useState } from 'react'

import axios from 'axios'

const GooseImages = () => {
    const [gooseImage, setGooseImage] = useState<string | null>(null)

    const getData = async () => {
        try {
            const response = await axios.get("http://localhost:8787/api/geese/Angry Goose", {
                responseType: 'arraybuffer'
            });
            console.log(response);

            const blob = new Blob([response.data], { type: 'image/jpeg' });
            const imageUrl = URL.createObjectURL(blob);
            setGooseImage(imageUrl);
            console.log(imageUrl);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData()
    }, [])

    if (!gooseImage) {
        return <div>Loading...</div>
    }

    return (
        <div>GooseImages
            {/*       {gooseImage.map((image: string, index: number) => (
                <img key={index} src={image} alt="Goose" />
            ))} */}
            <img src={gooseImage} alt="Goose" />
        </div>
    )
}
export default GooseImages