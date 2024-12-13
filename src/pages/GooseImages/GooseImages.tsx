import "./GooseImage.scss"

import { useEffect, useState } from 'react';

import axios from 'axios';
import trashIcon from "../../assets/icons/recycle-bin.png"

const URL = import.meta.env.VITE_API_URL;

const GooseImages = () => {
    const [gooseImage, setGooseImage] = useState<string | null>(null);
    const [geeseList, setGeeseList] = useState<{ id: number, name: string }[]>([]);
    const [newGooseName, setNewGooseName] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [isCreatingGoose, setIsCreatingGoose] = useState(false);
    const [latestGoose, setLatestGoose] = useState<string | null>(null);


    const getGeeseList = async () => {
        try {
            const response = await axios.get(`${URL}/geese`);
            if (response.data && Array.isArray(response.data.geese)) {
                setGeeseList(response.data.geese);
                if (response.data.geese.length > 0) {
                    fetchGooseImage(response.data.geese[0].name);
                }
            }
        } catch (error) {
            console.error('Error fetching geese list:', error);
        }
    };

    const createGoose = async (name: string) => {
        setIsCreatingGoose(true);
        try {
            const response = await axios.post(`${URL}/geese/${name}`);
            console.log('Created new goose:', response.data);
            setLatestGoose(name);
            await getGeeseList();
            await fetchGooseImage(name);
        } catch (error) {
            console.error('Error creating goose:', error);
        } finally {
            setIsCreatingGoose(false);
        }
    };

    //this previously worked, but now doesn't. I'm not sure why.
    /*     const fetchGooseImage = async (gooseName: string) => {
            setIsLoading(true);
            try {
                const encodedGooseName = encodeURIComponent(gooseName);
                const response = await axios.get(`${URL}/geese/${encodedGooseName}`, {
                    responseType: 'arraybuffer'
                });
    
                const blob = new Blob([response.data], { type: 'image/jpeg' });
                const imageUrl = URL.createObjectURL(blob);
                setGooseImage(imageUrl);
            } catch (error) {
                console.error('Error fetching goose image:', error);
            } finally {
                setIsLoading(false);
            }
        }; */

    const fetchGooseImage = async (gooseName: string) => {
        setIsLoading(true);
        try {
            const encodedGooseName = encodeURIComponent(gooseName);
            const response = await axios.get(`${URL}/geese/${encodedGooseName}`, {
                responseType: 'arraybuffer'
            });

            const blob = new Blob([response.data], { type: 'image/png' });
            const imageUrl = window.URL.createObjectURL(blob);

            setGooseImage(imageUrl);

            //cleanup to revoke object URL
            return () => {
                window.URL.revokeObjectURL(imageUrl);
            };
        } catch (error) {
            console.error('Error fetching goose image:', error);
            setGooseImage(null);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteGoose = async (gooseName: string) => {
        try {
            await axios.delete(`${URL}/geese/${gooseName}`);
            await getGeeseList();
        } catch (error) {
            console.error('Error deleting goose:', error);
        }
    }

    useEffect(() => {
        getGeeseList();
    }, []);

    useEffect(() => {
        if (latestGoose) {
            fetchGooseImage(latestGoose);
            setLatestGoose(null);
        }
    }, [geeseList]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newGooseName) {
            await createGoose(newGooseName);
            setNewGooseName('');
        }
    };

    return (
        <div className='goose-images'>
            <h1>Goose Images</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newGooseName}
                    onChange={(e) => setNewGooseName(e.target.value)}
                    placeholder="Enter goose name"
                    required
                />
                <button type="submit">Generate Image</button>
            </form>

            {isCreatingGoose ? (
                <p className="goose-images__loading">Wait while we create your goose! 🥚</p>
            ) : isLoading ? (
                <p className="goose-images__loading">Loading image...</p>
            ) : gooseImage ? (
                <img
                    src={gooseImage}
                    alt={`Generated Goose ${newGooseName}`}
                    className="goose-images__img"
                />
            ) : (
                <p>No image loaded</p>
            )}

            <h2>All Geese</h2>
            <ul className="goose-images__ul">
                {geeseList.map((goose) => (
                    <div key={goose.id} className="goose-images__goose">
                        <li

                            className="goose-images__li"
                            onClick={() => fetchGooseImage(goose.name)}
                        >
                            {goose.name}
                        </li>
                        <img src={trashIcon} alt="Delete" className="goose-images__delete" onClick={() => deleteGoose(goose.name)} />
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default GooseImages;