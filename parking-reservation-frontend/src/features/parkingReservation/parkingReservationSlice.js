import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  displaySearchResults: false,
  searchString: '',
}

export const parkingReservationSlice = createSlice({
  name: 'parkingReservation',
  initialState,
  reducers: {
    setDisplaySearchResults: (state, action) => {
      state.displaySearchResults = action.payload
    },
    setSearchString: (state, action) => {
      state.searchString = action.payload
    },
  },
})

export const { setDisplaySearchResults, setSearchString } = parkingReservationSlice.actions

export default parkingReservationSlice.reducer
