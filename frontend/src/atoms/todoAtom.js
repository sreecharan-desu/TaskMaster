import { atom } from 'recoil';

export const todosAtom = atom({
    key: 'todosState',
    default: []
}); 