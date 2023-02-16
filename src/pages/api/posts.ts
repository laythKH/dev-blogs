import { readPostsInfo } from "lib/helper"
import { NextApiHandler } from "next"
// import path from "path"
// import fs from "fs"
// import matter from "gray-matter"
// Methods
// GET => When you need to just get or read the data.
// POST => When you want to send some fresh data.
// PATCH => When you want to update some part of the data.
// PUT => When you want to replace the old data with new one.
// DELETE =>when you want to remove record.



const handler: NextApiHandler = (req, res) => {
   const { method } = req


   switch (method) {
      case "GET": {
         const data = readPostsInfo()
         return res.json({ postInfo: data })
      }
      default:
         return res.status(404).send('Not Found');
   }

}

// const readPostsInfo = () => {
//    // console.log(`this is CWD => ${process.cwd()}`)
//    // console.log(`this is __dirname => ${__dirname}`)
//    const dirPathToRead = path.join(process.cwd(), 'posts')
//    // console.log(dirPathToRead)
//    const dirs = fs.readdirSync(dirPathToRead)
//    const data = dirs.map((filename) => {
//       const filePathToRead = path.join(process.cwd(), 'posts/' + filename)
//       const fileContent = fs.readFileSync(filePathToRead, { encoding: 'utf-8' })
//       return matter(fileContent).data
//    })

//    return data
// }



export default handler