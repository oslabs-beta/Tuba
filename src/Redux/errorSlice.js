import { createSlice } from "@reduxjs/toolkit";

// services is an array of objects, each object is a service in the app architecture 
const initialState = {
  services: [],
  allErrors: [],
}

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    updateServices: (state, action) => {
      state.services.forEach(service => {
        if(service.serviceName === action.payload.serviceName) {
            return service.errors.push(action.payload.error)
        }
        
      })
    },
    updateAllErrors: (state, action) => {
      state.allErrors.push(action.payload)
    }
  }
})
