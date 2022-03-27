import React, {useCallback} from 'react';
import {GetServerSideProps, NextPage} from "next";
// import {withIronSessionSsr} from "iron-session/next";
import marked from 'marked';
import {Post} from '../../src/entity/Post';

import {getPost, getIds} from "../../lib/posts";
import {getDatabaseConnection} from "../../lib/getDatabaseConnection";

import {User} from "../../src/entity/User";
import Link from 'next/link';
import axios from "axios";
import {useRouter} from "next/router";
import {withSessionSsr} from "../../lib/withSession";

type Props = {
    post: Post,
    id:string,
    currentUser: User | null;
}
const PostShow: NextPage<Props> = (props) => {
    const {post, currentUser,id} = props;
    const router=useRouter()
  const onRemove=useCallback(()=>{
      axios.delete(`/api/v1/posts/${id}`).then((res)=>{
          window.alert('删除成功');
          router.push('/posts')
      },()=>{
          window.alert('删除失败');
      })
  },[])
    return (
        <>
            <div className="wrapper">
                <header>
                    <h1>{post.title}</h1>
                    {currentUser &&
                        <p>
                            <Link href="/posts/[id]/edit" as={`/posts/${post.id}/edit`}><a>编辑</a></Link>
                            <button onClick={onRemove}>删除</button>
                        </p>
                    }
                </header>
                <article className="markdown-body" dangerouslySetInnerHTML={{__html: marked(post.content)}}>
                </article>
            </div>
            <style jsx>{`
              .wrapper {
                max-width: 800px;
                margin: 16px auto;
                padding: 0 16px;
              }

              h1 {
                padding-bottom: 16px;
                border-bottom: 1px solid #666;
              }
              button{
              margin-left: 16px;
              padding:4px 8px;
              border-radius: 4px;
              background-color: #fff;
              border:1px solid black;
              }
            `}</style>
        </>
    )

};
export const getServerSideProps = withSessionSsr(
    async function getServerSideProps({req, params}) {
        const connection = await getDatabaseConnection();
        const post = await connection.manager.findOne(Post, params.id as string);
        const currentUser = req.session.user || null;
        return {
            props: {
                post: JSON.parse(JSON.stringify(post)),
                currentUser: JSON.parse(JSON.stringify(currentUser || {})),
                id:params.id,
            }

        };
    }

)


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
