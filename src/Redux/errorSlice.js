import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// services is an array of objects, each object is a service in the app architecture 
const initialState = {
  services: [],
  allErrors: [],
  status: 'idle',
  error: null,
}

export const getAllErrors = createAsyncThunk('errorSlice/getErrors', async (allErrors, {rejectWithValue}) => {
 
  try {
    const errorRes = await fetch(`/errorData/allErrors/`)

    if(!errorRes) throw new TypeError('error response unsucessful in errorSlice, getErrors')

    const errorData = await errorRes.json()
    return errorData;

  } catch (error) {
    console.log('Error occured in errorSlice, getErrors');
    return rejectWithValue(error.message);
  }
})

export const getNewErrors = createAsyncThunk('errorSlice/getNewErrors', async (allErrors, {rejectWithValue}) => {
  try {
    const timeStamp = allErrors[allErrors.length -1].err_time;
    const errorRes = await fetch(`/errorData/newErrors/${timeStamp}`);

    if(!errorRes) throw new TypeError('error response unsucessful in errorSlice, getNewErrors')

    const errorData = await errorRes.json()
    return errorData;

  } catch (error) {
    console.log('Error occured in errorSlice, getNewErrors');
    return rejectWithValue(error.message);
  }
})

export const getServices = createAsyncThunk('errorSlice/getServices', async (services, {rejectWithValue}) => {
    // /errorData/allServices
  try {
    const servicesRes = await fetch('/errorData/allServices')

    if(!servicesRes) throw new TypeError('error response unsucessful in errorSlice, getServices')

    const servicesData = await servicesRes.json()
    return servicesData;
  } catch (error) {
    console.log('Error occured in errorSlice, getServices');
    return rejectWithValue(error.message);
  }
})

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllErrors.fulfilled, (state, action) => {
        state.status = 'success';
        const errorData = action.payload;
        state.allErrors = errorData;

        // nested loops, needs refactor
        if (state.services[0]) {
          errorData.forEach(error => {
            state.services.forEach(service => {
              if(error.err_job_name === service.servName) {
                  service.servErrors.push(error)
                }
              })
          })
        }
      })
      .addCase(getAllErrors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = `Error occured in errorSlice getAllErrors thunk: ${action.payload}`;
      })
      .addCase(getNewErrors.fulfilled, (state, action) => {
        state.status = 'success';
        const newErrors = action.payload;

        // nested loops, needs refactor
        newErrors.forEach(error => {
          state.allErrors.push(error);
          state.services.forEach(service => {
            if(error.err_job_name === service.servName) {
                service.servErrors.push(error)
              }
            })
        });
      })
      .addCase(getNewErrors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = `Error occured in errorSlice getNewErrors thunk: ${action.payload}`;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.status = 'success';
        const serviceData = action.payload;
        serviceData.forEach(service => {
          const servObj = {
            serviceName: service,
            servErrors: []
          }
          state.services.push(servObj)
        })
      })
      .addCase(getServices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = `Error occured in errorSlice getServices thunk: ${action.payload}`;
      })
  },
});


export default errorSlice.reducer;