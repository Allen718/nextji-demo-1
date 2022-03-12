import React from "react"
import {UAParser} from 'ua-parser-js';
import qs from 'qs';

import {GetServerSideProps, GetStaticProps, NextPage} from "next";
import {getDatabaseConnection} from "../../lib/getDatabaseConnection";
import Link from "next/link";
import {Post} from "../../src/entity/Post";
import {number} from "prop-types";
import {usePager} from "../../hooks/usePager";

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

}

const PostsIndex: NextPage<Props> = (props) => {
    const {browser, posts, count, pageSize,page} = props;
    const {pager} = usePager({
        page,
        totalPage:Math.ceil(count/pageSize),
        pageSize,
    })
    return (
        <div>
            {posts.map(post => <div key={post.id}><Link href={`/posts/${post.id}`}>
                <a>{post.title}</a>
            </Link></div>)}
            {pager}
            {/*<h1>{`你现在使用的浏览器是23322${browser.name}`}</h1>*/}
        </div>
    )
};
export const getServerSideProps: GetServerSideProps = async (context) => {
    const ua = context.req.headers['user-agent']
    const connection = await getDatabaseConnection()
    const index = context.req.url.indexOf('?');
    const search = context.req.url.substr(index + 1);
    const query = qs.parse(search);

    const page = parseInt(query.page.toString()) || 1;
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
            posts: JSON.parse(JSON.stringify(posts)),
            count,
            page,
            pageSize
        }
    }
};
export default PostsIndex
