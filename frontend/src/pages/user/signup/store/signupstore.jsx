import { atom } from 'recoil'

export const usersignupmessageAtom = atom({
    key: 'usersignupmessageAtom',
    default: [{message: '', success: null}]
})

export const usersignupusernameAtom = atom({
    key: 'usersignupusernameAtom',
    default: ''
})

export const usersignuppasswordAtom = atom({
    key: 'usersignuppasswordAtom',
    default: ''
})