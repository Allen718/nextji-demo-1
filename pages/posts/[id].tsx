import React from 'react';
import {NextPage} from "next";
import {getPost,getIds} from "../../lib/posts";
type Post={
    content:string,
    title:string,
    date:string,
    id:string
};
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


export const getStaticPaths=async ()=>{
    const idList=await getIds();
    return {
        paths: idList.map(id => ({params: {id: id}})),
        fallback: true
    };

};
export const getStaticProps=async (x:any)=>{
    const id=x.params.id;
    const post= await getPost(id);
    console.log(post,'====');
    return{
        props:{
            post,
        }
    }
}
export default PostShow;