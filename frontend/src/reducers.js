import { createSlice } from '@reduxjs/toolkit';
import { fetchItems, addItem, deleteItem } from './actions';

const initialState = { items: [], loading: false, error: null };

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchItems.fulfilled, (state, action) => { state.items = action.payload; state.loading = false; })
            .addCase(fetchItems.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
            .addCase(addItem.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(addItem.fulfilled, (state, action) => { state.loading = false; })
            .addCase(addItem.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
            .addCase(deleteItem.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter(item => item.id !== action.payload); // Update state after delete
            })
            .addCase(deleteItem.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });
    },
});

export default itemsSlice.reducer;