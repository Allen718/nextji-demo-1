import React from "react"
import {UAParser} from 'ua-parser-js';
import {withSessionSsr} from "lib/withSession";
import qs from 'qs';

import {GetServerSideProps, GetStaticProps, NextPage} from "next";
import {getDatabaseConnection} from "../../lib/getDatabaseConnection";
import Link from "next/link";
import {Post} from "../../src/entity/Post";
import {usePager} from "../../hooks/usePager";
import {withIronSessionSsr} from "iron-session/next";
import {User} from "../../src/entity/User";

type Props = {
    browser: {
        name: string
        version: string
        major: string
    }
    posts: Post[],
    count: number,
    page: number,
    pageSize: number,
    currentUser: User,

}

const PostsIndex: NextPage<Props> = (props) => {
    const {browser, posts, count, pageSize, page, currentUser} = props;
    const {pager} = usePager({
        page,
        totalPage: Math.ceil(count / pageSize),
        pageSize,
    })
    return (
        <>
            <div className="posts">
                <header>
                    <h1>文章列表</h1>
                    {currentUser &&
                        <span> <Link href="/add-post"><a>新增</a></Link></span>}

                </header>

                {posts.map(post =>
                    <div className="onePost">
                        <Link key={post.id} href={`/posts/${post.id}`}>
                            <a>
                                {post.title}
                            </a>
                        </Link>
                    </div>
                )}
                <footer>
                    {pager}
                </footer>
            </div>
            <style jsx>{`
              .posts {
                max-width: 800px;
                margin: 0 auto;
                padding: 16px;

              }


              .onePost {
                border-bottom: 1px solid #ddd;
                padding: 8px 0;
              }

              .onePost > a {
                border-bottom: none;
                color: #000;
              }

              .onePost > a:hover {
                color: #00adb5;
              }
            `}</style>
        </>
    )
};
export const getServerSideProps: GetServerSideProps = withSessionSsr(async (context) => {
        const ua = context.req.headers['user-agent']
        const connection = await getDatabaseConnection()
        const index = context.req.url.indexOf('?');
        const search = context.req.url.substr(index + 1);
        const query = qs.parse(search);
        const currentUser = context.req.session.user;
        const page = parseInt(query?.page?.toString()) || 1;
        const pageSize = Number(query.pageSize) || 3;
        // console.log(context, 'context');
        const [posts, count] = await connection.manager.findAndCount(Post,
            {
                skip: (page - 1) * pageSize,
                take: pageSize,
            });
        //用于解析浏览器的一个插件库
        const result = new UAParser(ua).getResult()
        return {
            props: {
                browser: result.browser,
                posts: JSON.parse(JSON.stringify(posts || {})),
                currentUser: JSON.parse(JSON.stringify(currentUser || {})),
                count,
                page,
                pageSize
            }
        }
    },
)
export default PostsIndex
