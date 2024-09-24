import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Ticket } from "../../types/types"
import axios from "axios"

export const fetchTickets = createAsyncThunk<Ticket[], void>(
    'tickets/fetchTickets',
    async (): Promise<Ticket[]> => {
        const response = await axios.get('https://6ed34cebf4fa44db.mokky.dev/feilds')
        return response.data as Ticket[]
    }
)

interface TicketState {
    tickets: Ticket[]
    status: 'idle' | 'loading' | 'success' | 'error'
    error: string | null
}

const initialTicketState: TicketState = {
    tickets: [],
    status: 'idle',
    error: null
}

const ticketSlice = createSlice({
    name: 'tickets',
    initialState: initialTicketState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTickets.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchTickets.fulfilled, (state, action: PayloadAction<Ticket[]>) => {
                state.status = 'success'
                state.tickets = action.payload
            })
            .addCase(fetchTickets.rejected, (state, action) => {
                state.status = 'error'
                state.error = action.error.message || 'Something went wrong'
            })
    }
})

export default ticketSlice.reducer