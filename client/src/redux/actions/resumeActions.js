import axios from 'axios';
import {
    SET_UPLOAD_RESUME,
    FAILURE_UPLOAD_FILE
} from './types';
// import { modifyFiles } from './utils'

export const uploadResumeRequest = formData  => async dispatch => {
    return await axios
        .post('/resumeapi/parse_resume', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            return res;
        }).catch(err => {
            dispatch({
                type: FAILURE_UPLOAD_FILE,
                payload: err
            });
            return err
        });
}

export const updateProfile = (formData, userID) => async dispatch => {
    return await axios
        .post(`/profile_api/upsertProfile/${userID}`, formData)
        .then(res => {
            return res;
        }).catch(err => {
            return err
        });
}