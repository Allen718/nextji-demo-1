import React from 'react';
import {GetServerSideProps, NextPage} from "next";

import {Post} from '../../src/entity/Post';

import {getPost,getIds} from "../../lib/posts";
import {getDatabaseConnection} from "../../lib/getDatabaseConnection";

type Props={
    post:Post
}
const PostShow:NextPage<Props> = (props) => {
    const {post} = props;
    console.log(post);
    return(
        <div>
            <h1>{post.title}</h1>
            <article>
                {post.content}
            </article>
        </div>
    )

};
export const getServerSideProps: GetServerSideProps<any, { id: string }> = async (context) => {
    const connection = await getDatabaseConnection();
    const post = await connection.manager.findOne(Post, context.params.id);
    return {
        props: {
            post: JSON.parse(JSON.stringify(post))
        }
    };
};


// export const getStaticPaths=async ()=>{
//     const idList=await getIds();
//     return {
//         paths: idList.map(id => ({params: {id: id}})),
//         fallback: true
//     };
//
// };
// export const getStaticProps=async (x:any)=>{
//     const id=x.params.id;
//     const post= await getPost(id);
//     console.log(post,'====');
//     return{
//         props:{
//             post,
//         }
//     }
// }
export default PostShow;