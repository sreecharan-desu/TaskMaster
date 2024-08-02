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
    default : [{}]
})

export const todosAtom = atom({
    key : 'todosAtom',
    default : []
})


export const todoTitle = atom({
    key : 'todoTitle',
    default : ''
}) 

export const todoDescription = atom({
    key : 'todoDescription',
    default : ''
}) 


export const updatedTitle =  atom({
    key : 'updatedTitle',
    default :  ''
})



export const updatedDescription =  atom({
    key : 'updatedDescription',
    default :  ''
})


export const updateStatus = atom({
    key : 'updateStatus',
    default : [{
        request : false,
        indexes : []
    }]
})