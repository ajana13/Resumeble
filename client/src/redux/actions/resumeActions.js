import axios from 'axios';
import {
    SET_UPLOAD_RESUME,
    FAILURE_UPLOAD_FILE
} from './types';
// import { modifyFiles } from './utils'

export const uploadResumeRequest = (userData)  => async dispatch => {
    await axios
        .post('/resume/', userData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => 
            dispatch({
                type: SET_UPLOAD_RESUME,
                payload: res.data
            })
        ).catch(err => {
            dispatch({
                type: FAILURE_UPLOAD_FILE,
                payload: err
            })
        });
}
