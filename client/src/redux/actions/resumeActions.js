import axios from 'axios';
import {
    SET_UPLOAD_RESUME,
    FAILURE_UPLOAD_FILE
} from './types';
// import { modifyFiles } from './utils'

export const uploadResumeRequest = formData  => dispatch => {
    axios
        .post('/resumeapi/parse_resume', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            console.log(res);
            dispatch({
                type: SET_UPLOAD_RESUME,
                payload: res
            })
        }).catch(err => {
            dispatch({
                type: FAILURE_UPLOAD_FILE,
                payload: err
            })
        });
}
