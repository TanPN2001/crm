import { atom } from "recoil"
import {Auth} from './interface'

export const auth = atom<Auth>({
    key: "auth",
    default: JSON.parse(localStorage.getItem("auth")!) ?? { username:"", token: "" }
})

