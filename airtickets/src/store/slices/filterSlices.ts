import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface FilterState {
    selectedCompanies: string[]
    selectedTransfers: number[]
}

const initialState: FilterState = {
    selectedCompanies: [],
    selectedTransfers: [],
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSelectedCompanies(state, action: PayloadAction<string[]>) {
            state.selectedCompanies = action.payload
        },
        setSelectedTransfers(state, action: PayloadAction<number[]>) {
            state.selectedTransfers = action.payload
        },
    },
})

export const { setSelectedCompanies, setSelectedTransfers } = filterSlice.actions
export default filterSlice.reducer 