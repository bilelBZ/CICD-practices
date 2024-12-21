import { createAsyncThunk } from '@reduxjs/toolkit';

const BACKEND_URL = 'http://localhost:5000/api';

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
    const response = await fetch(`${BACKEND_URL}/items`);
    return await response.json();
});

export const addItem = createAsyncThunk('items/addItem', async (item) => {
    const response = await fetch(`${BACKEND_URL}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
    });
    return await response.json();
});

export const deleteItem = createAsyncThunk('items/deleteItem', async (id) => {
    await fetch(`${BACKEND_URL}/items/${id}`, { method: 'DELETE' });
    return id; // Return the deleted ID for updating the state
});