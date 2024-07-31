import {atom} from 'recoil'

export const adminsignupmessageAtom = atom({
    key : 'adminsignupmessageAtom',
    default : [{message : '',success : null}]
})

export const adminsignupusernameAtom = atom({
    key : 'adminsignupusernameAtom',
    default : ''
})

export const adminsignuppasswordAtom = atom({
    key : 'adminsignuppasswordAtom',
    default : ''
})