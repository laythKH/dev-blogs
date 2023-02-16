import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { ParsedUrlQuery } from 'querystring'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'


type Props = InferGetStaticPropsType<typeof getStaticProps>

const SinglePage: NextPage<Props> = ({ post }): JSX.Element => {
   // console.log(props);
   const { title, content } = post
   return (
      <div className='max-w-3xl mx-auto'>
         <h1 className='font-semibold text-2xl py-5'>{title}</h1>
         <div className='prose pb-20 mx-auto'>
            <MDXRemote {...content} />
         </div>
      </div>
   )
}

export const getStaticPaths: GetStaticPaths = () => {

   // reading paths
   const dirPathToRead = path.join(process.cwd(), 'posts')
   // console.log(dirPathToRead)
   const dirs = fs.readdirSync(dirPathToRead)
   const paths = dirs.map((filename) => {
      const filePathToRead = path.join(process.cwd(), 'posts/' + filename)
      const fileContent = fs.readFileSync(filePathToRead, { encoding: 'utf-8' })
      return { params: { postSlug: matter(fileContent).data.slug } }
   })
   return {
      // every single obj to single routes
      // it must equal => filename => [postSlug] === equal to here
      paths,
      // fallback: false,
      fallback: "blocking",
   }
}

interface IStaticProps extends ParsedUrlQuery {
   postSlug: string
}

type Post = {
   post: {
      title: string;
      content: MDXRemoteSerializeResult;
   }
}


export const getStaticProps: GetStaticProps<Post> = async (context) => {
   try {
      const { params } = context;
      const { postSlug } = params as IStaticProps
      // console.log(context);

      const filePathToRead = path.join(process.cwd(), 'posts/' + postSlug + '.md')
      const fileContent = fs.readFileSync(filePathToRead, { encoding: 'utf-8' })
      const { content, data } = matter(fileContent)
      // const source: any = await serialize(fileContent, { parseFrontmatter: true })
      // console.log(AAA.frontmatter);
      // console.log(content)
      const source = await serialize(content)

      return {
         props: {
            post: {
               content: source,
               // content: source.frontmatter.title,
               title: data.title
               // title: source.compiledSource
            }
         }
      }
   } catch (error) {
      return {
         notFound: true
      }
   }
}

export default SinglePage