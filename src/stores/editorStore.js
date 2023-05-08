import { atom, createStore } from 'jotai'

const EditorStore = createStore()

const fileAtom = atom(null)

export { EditorStore, fileAtom }
