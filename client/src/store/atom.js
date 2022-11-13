import { atom } from "recoil";

const token = atom({
    key: "token",
    default: ""
})

export {
    token
}