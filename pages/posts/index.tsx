import React from "react"
import {UAParser} from 'ua-parser-js';

import {GetServerSideProps, GetStaticProps, NextPage} from "next";
import {getDatabaseConnection} from "../../lib/getDatabaseConnection";
import Link from "next/link";

type Props = {
    browser: {
        name: string
        version: string
        major: string
    }
    posts: Post[]

}

const PostsIndex: NextPage<Props> = (props) => {
    const {browser, posts} = props;
    console.log(posts);
    return (
        <div>
            {posts.map(post => <Link href={`/posts/${post.id}`}>
                <a>{post.title}</a>
            </Link>)}
            <div>11222</div>
            <h1>{`你现在使用的浏览器是222${browser.name}`}</h1>
        </div>
    )
};
export const getServerSideProps: GetServerSideProps = async (context) => {
    const ua = context.req.headers['user-agent']
    const connection = await getDatabaseConnection()
    const posts = await connection.manager.find('posts');
    const result = new UAParser(ua).getResult()
    return {
        props: {
            browser: result.browser,
            posts: JSON.parse(JSON.stringify(posts))
        }
    }
};
export default PostsIndex