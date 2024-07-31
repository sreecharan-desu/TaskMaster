import {atom} from 'recoil'

export const adminsigninmessageAtom = atom({
    key : 'adminsigninmessageAtom',
    default : [{message : '',success : null}]
})

export const adminsigninusernameatom = atom({
    key : 'adminsignupusernameatom',
    default : ''
})

export const adminsigninpasswordAtom = atom({
    key : 'adminsigninpasswordAtom',
    default : ''
})