import { readPostsInfo } from 'lib/helper';
import { InferGetStaticPropsType, NextPage } from 'next'
import { PostApiResponse } from 'utils/types';
// import { useEffect, useState } from 'react'

import BlogCard from '../../../components/BlogCard'



// interface PostApiResponse {
//    postInfo: {
//       title: string;
//       slug: string;
//       meta: string;
//    }[];
// }

// http://localhost:3000/api/posts/anyThings
// http://localhost:3000/api/posts/:id
export const getStaticProps = async () => {
   // const { postInfo }: PostApiResponse = await fetch(
   //    'http://localhost:3000/api/posts'
   // ).then(data => data.json())

   const postInfo: PostApiResponse = readPostsInfo()

   return {
      props: {
         posts: postInfo
      }
   }
};


type Props = InferGetStaticPropsType<typeof getStaticProps>

const Blogs: NextPage<Props> = ({ posts }): JSX.Element => {
   // const [posts, setPosts] = useState<
   //    { title: string; slug: string; meta: string; }[]
   // >([]);

   return (
      <div className='max-w-3xl mx-auto p-5 space-y-5'>
         {posts.map((post) => (
            <BlogCard
               title={post.title}
               desc={post.meta}
               slug={post.slug}
               key={post.slug}
            />
         ))}
      </div>
   )
}

export default Blogs