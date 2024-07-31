import {atom} from 'recoil';

export const username = atom({
    key : 'username',
    default : ''
})


export const UsersList = atom({
    key : 'UsersList',
    default : []
})

export const adminProfilemessageAtom = atom({
    key : 'adminProfilemessageAtom',
    default : [{message : '',success : null}]
})

export const adminProfileusernameAtom = atom({
    key : 'adminProfileusernameAtom',
    default : ''
})

export const adminProfilepasswordAtom = atom({
    key : 'adminProfilepasswordAtom',
    default : ''
})