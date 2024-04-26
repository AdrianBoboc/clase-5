// Esta es una forma de leer un JSON en ESmodules que no debería de usarse
// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

// Como leer un JSON en ESmodules recomendado por ahora
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
export const readJSON = (path) => require(path)
// Hasta aquí
