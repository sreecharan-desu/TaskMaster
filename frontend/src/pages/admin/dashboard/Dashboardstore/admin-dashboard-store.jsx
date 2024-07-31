import {atom} from 'recoil';

export const username = atom({
    key : 'username',
    default : ''
})


export const UsersList = atom({
    key : 'UsersList',
    default : []
})