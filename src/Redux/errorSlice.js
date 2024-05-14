import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

// services: array of objects, each object is a service in the app architecture. Also contains all associated errors.
// allErrors: array of objects, each object is an error. Queue data structure
const initialState = {
  services: [],
  allErrors: [],
  connections: [],
  frontend: false,
  scanned: false,
  status: 'idle',
  description: 'Fetching Errors from Database',
  checking: true,
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

export const checkDbStatus = createAsyncThunk('setup/check', async (status, { rejectWithValue }) => {
  const response = await axios.get('/setup/check');
  const data = response.data;

  return data
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

    if (!servicesRes) throw new TypeError('error response unsuccessful in errorSlice, getServices')

    const servicesData = await servicesRes.json()
    return servicesData;
  } catch (error) {
    console.log('Error occurred in errorSlice, getServices');
    return rejectWithValue(error.message);
  }
})

export const errorSlice = createSlice({
  name: 'errorSlice',
  initialState: initialState,
  reducers: {
    enableFrontend: (state) => {
      state.frontend = true;
    },
    setVisibility: (state, action) => {
      state.allErrors = state.allErrors.map(error => {
        if (error.err_id === action.payload) {
          return { ...error, visible: !error.visible }
        } else return error
      })
    },
    toggleFavorite: (state, action) => {
      state.allErrors = state.allErrors.map(error => {
        if (error.err_id == action.payload) {
          return { ...error, favorite: !error.favorite }
        } else {
          return { ...error }
        }
      })
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkDbStatus.fulfilled, (state, action) => {
        console.log('does database exist??', action.payload)
        state.checking = action.payload ? false : true;
      })
      .addCase(getAllErrors.fulfilled, (state, action) => {
        console.log('getAllErrors Extra Reducer >>>', action.payload);
        const errorData = action.payload.errors;
        const allErrors = action.payload.errors.map((error) => {
          return { ...error, visible: false, favorite: false }
        });

        if (allErrors.length) allErrors[allErrors.length - 1].favorite = true;

        state.allErrors = allErrors

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
        state.description = 'Retrieved All Errors from Database'
      })
      .addCase(getAllErrors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = `Error occurred in errorSlice getAllErrors thunk: ${action.payload}`;
      })
      .addCase(getNewErrors.fulfilled, (state, action) => {
        state.status = 'success';
        const newErrors = action.payload;

        newErrors.forEach(error => {
          state.allErrors.push({ ...error, visible: false, favorite: false });
          state.services.forEach(service => {
            if (error.err_job_name === service.servName) {
              service.servErrors.push(error)
            }
          })
        });
      })
      .addCase(getNewErrors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = `Error occurred in errorSlice getNewErrors thunk: ${action.payload}`;
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
        state.description = 'Discovered All Microservices '
      })
      .addCase(getServices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = `Error occurred in errorSlice getServices thunk: ${action.payload}`;
      })
      .addCase(getConnections.fulfilled, (state, action) => {
        state.connections = action.payload;
        state.description = 'Generated All Service Connections '
      })
      .addCase(getConnections.rejected, (state, action) => {
        state.status = 'failed';
        state.error = `Error occurred in errorSlice getServices thunk: ${action.payload}`;
      })
  },
});

export const { enableFrontend, toggleFavorite, setVisibility } = errorSlice.actions

export default errorSlice.reducer;