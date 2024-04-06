import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// services: array of objects, each object is a service in the app architecture. Also contains all associated errors.
// allErrors: array of objects, each object is an error. Queue data structure
const initialState = {
  services: [],
  allErrors: null,
  connections: [],
  status: 'idle',
  error: null,
}

export const getConnections = createAsyncThunk('/errorData/allConnections', async (connections, { rejectWithValue }) => {

  const connectionInfo = await fetch('/errorData/allConnections')
    .then(res => res.json())
    .then(json => {
      console.log('json connection data: ', json);
      return json
    })
    .catch(error => {
      console.log('error in allConnections, fetch catch block', error);
    })

  return connectionInfo


})

export const getAllErrors = createAsyncThunk('errorSlice/getErrors', async (allErrors, { rejectWithValue }) => {

  const errorFetch = await fetch(`/errorData/allErrors`)
    .then(data => data.json())
    .then(json => {
      console.log('json error data: ', json);
      return json;
    })
    .catch(error => {
      console.log('error in getAllErrors, fetch catch block', error);
    })

  return errorFetch;
})

export const getNewErrors = createAsyncThunk('errorSlice/getNewErrors', async (allErrors, { rejectWithValue }) => {
  try {
    const timeStamp = allErrors[allErrors.length - 1].err_time;
    const errorRes = await fetch(`/errorData/newErrors/${timeStamp}`);

    if (!errorRes) throw new TypeError('error response unsucessful in errorSlice, getNewErrors')

    const errorData = await errorRes.json()
    return errorData;

  } catch (error) {
    console.log('Error occured in errorSlice, getNewErrors');
    return rejectWithValue(error.message);
  }
})

export const getServices = createAsyncThunk('errorSlice/getServices', async (services, { rejectWithValue }) => {
  try {
    const servicesRes = await fetch('/errorData/allServices')

    if (!servicesRes) throw new TypeError('error response unsucessful in errorSlice, getServices')

    const servicesData = await servicesRes.json()
    return servicesData;
  } catch (error) {
    console.log('Error occured in errorSlice, getServices');
    return rejectWithValue(error.message);
  }
})


export const errorSlice = createSlice({
  name: 'errorSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllErrors.fulfilled, (state, action) => {
        console.log('getAllErrors Extra Reducer >>>', action.payload);
        const errorData = action.payload.errors;
        state.allErrors = action.payload.errors;

        // nested loops, needs refactor
        if (state.services[0]) {
          errorData.forEach(error => {
            state.services.forEach(service => {
              if (error.err_job_name === service.servName) {
                service.servErrors.push(error)
              }
            })
          })
        }
        state.status = 'success';
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
            if (error.err_job_name === service.servName) {
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
        console.log('getServices Extra Reducer >>>', action.payload);
        const serviceData = action.payload.services;
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
      .addCase(getConnections.fulfilled, (state, action) => {
        state.connections = action.payload
      })
      .addCase(getConnections.rejected, (state, action) => {
        state.status = 'failed';
        state.error = `Error occured in errorSlice getServices thunk: ${action.payload}`;
      })
  },
});


export default errorSlice.reducer;