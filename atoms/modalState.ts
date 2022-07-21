import {DocumentData} from 'firebase/firestore'
import { atom } from 'recoil'
import { Movie } from '../typings'


export const modalState = atom({
    key: 'modalState',
    default: false
})

export const movieState = atom<Movie | null | DocumentData>({
    key: 'movieState',
    default: null
})