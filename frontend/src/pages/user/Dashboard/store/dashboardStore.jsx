import { atom } from "recoil";

export const Userusername = atom({
    key : 'Userusername',
    default : ''
})

export const updatedUsername = atom({
    key : 'updatedUsername',
    default : ''
})

export const updatedPassword = atom({
    key : 'updatedPassword',
    default : ''
})

export const messageAtom = atom({
    key : 'messageAtom',
    default : [{message : '',success : false}]
})