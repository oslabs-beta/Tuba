import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx'
import { store } from './Redux/store'
import { Provider } from 'react-redux'

import './style.css';

if (typeof document !== 'undefined') {
    const root = createRoot(document.getElementById('root'));
    root.render(
        <Provider store={store}>
            <App />
        </Provider>
    );
}