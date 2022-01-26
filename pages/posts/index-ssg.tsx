import React from 'react'
import {usePosts} from "hooks/usePosts";
import {getPosts} from "../../lib/posts";
import {GetStaticProps, NextPage} from "next";
import Link from "next/link";
type Post={
    id:string
    title:string
    date:string

}

 const PostsIndex:NextPage<{posts:Post[]}>= (props) => {
    const {posts}=props;

     return (
        <div>
            <h1>文章列表</h1>
            {posts.map(post=><div key={post.id}><Link href={`/posts/${post.id}`} as={`/posts/${post.id}`}><a>{post.id}</a></Link></div>)}
        </div>
    )
};
export const getStaticProps = async () => {
    const posts = await getPosts()
    console.log(posts,'====');
    return {
        props: {
            posts,
        }
    }
};
export default PostsIndex