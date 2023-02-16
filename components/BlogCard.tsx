import Link from 'next/link';
import { FC } from 'react';

interface Props {
   title: string;
   desc: string;
   slug: string;
}

const BlogCard: FC<Props> = ({ title, desc, slug }): JSX.Element => {
   return (
      <Link href={'/blogs/' + slug} className="block cursor-pointer">
         <div className='bg-green-100 p-3 rounded'>
            <h1 className='text-3xl text-gray-900 font-semibold mb-1'>
               {title}
            </h1>
            <p className='text-gray-500 '>
               {desc}
            </p>
         </div>
      </Link>
   )
}

export default BlogCard