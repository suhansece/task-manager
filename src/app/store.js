import {configureStore} from '@reduxjs/toolkit';

import authReaducer from '../feature/auth/authSlice';

 const store=configureStore({
    reducer:{
        auth:authReaducer,
    },
});
export default store;