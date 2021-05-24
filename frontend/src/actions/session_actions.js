import * as ApiUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

export const signup = (user) => (dispatch)=> {
    ApiUtil.signup()
    .then(() => dispatch(receiveUserSignIn()))
    .catch(res => dispatch(receiveErrors()))
}

export const login = (user) => dispatch => {
    return ApiUtil.login(user)
    .then(res=> {
        const {token} = res.data;
        localStoreage.setItem('jwtToken', token);
        ApiUtil.setAuthToken(token)
        const decoded =jwt_decode(token);
        dispatch(receiveCurrentUser(decoded))
    }).catch(err => {
        dispatch(receiveErrors(err.response.data))
    })
} 

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken');
    ApiUtil.setAuthToken(false);
    dispatch(logoutUser())

}