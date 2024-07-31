import {atom} from 'recoil'

export const userSigninmessageAtom = atom({
    key : 'userSigninmessageAtom',
    default : [{message : '',success : null}]
})

export const userSigninusernameAtom = atom({
    key : 'userSigninusernameAtom',
    default : ''
})

export const userSigninpasswordAtom = atom({
    key : 'userSigninpasswordAtom',
    default : ''
})