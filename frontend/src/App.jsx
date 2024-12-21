import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, addItem, deleteItem } from './actions';
import './App.css';

function App() {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.items);
    const [newItem, setNewItem] = useState({ name: '', description: '' });

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    const handleAddItem = () => {
        if (newItem.name.trim() !== '') {
            dispatch(addItem(newItem)).then(() => dispatch(fetchItems()));
            setNewItem({ name: '', description: '' });
        }
    };

    const handleDeleteItem = (id) => {
        dispatch(deleteItem(id));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="App">
            <h1>Items</h1>
            <input type="text" placeholder="Name" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
            <input type="text" placeholder="Description" value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} />
            <button onClick={handleAddItem}>Add Item</button>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;