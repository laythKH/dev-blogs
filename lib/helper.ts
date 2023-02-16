import path from "path"
import fs from "fs"
import matter from "gray-matter"
import { PostApiResponse } from "utils/types"

export const readPostsInfo = (): PostApiResponse => {
   // console.log(`this is CWD => ${process.cwd()}`)
   // console.log(`this is __dirname => ${__dirname}`)
   const dirPathToRead = path.join(process.cwd(), 'posts')
   // console.log(dirPathToRead)
   const dirs = fs.readdirSync(dirPathToRead)
   const data = dirs.map((filename) => {
      const filePathToRead = path.join(process.cwd(), 'posts/' + filename)
      const fileContent = fs.readFileSync(filePathToRead, { encoding: 'utf-8' })
      return matter(fileContent).data
   })

   return data as PostApiResponse
}
