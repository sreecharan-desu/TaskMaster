import {atom} from 'recoil'

export const messageAtom = atom({
    key : 'messageAtom',
    default : [{message : '',success : null}]
})

export const usernameAtom = atom({
    key : 'usernameAtom',
    default : ''
})

export const passwordAtom = atom({
    key : 'passwordAtom',
    default : ''
})