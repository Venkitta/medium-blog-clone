import { atom } from "recoil"
import { BlogType } from "@venkitta/medium-common"

export const blogCacheAtom = atom<Record<string, BlogType>>({
    key: "blogCache",
    default: {},
})