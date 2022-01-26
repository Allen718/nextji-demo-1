import React from "react"
import {UAParser} from 'ua-parser-js';

import {GetServerSideProps, GetStaticProps, NextPage} from "next";

type Props = {
    browser: {
        name: string
        version: string
        major: string
    }

}

const PostsIndex: NextPage<Props> = (props) => {
    const {browser} = props;
    return (
        <div>
            <h1>{`你现在使用的浏览器是${browser.name}`}</h1>
        </div>
    )
};
export const getServerSideProps: GetServerSideProps =async (context) => {
    const ua = context.req.headers['user-agent']
    const result = new UAParser(ua).getResult()
    return {
        props: {
            browser: result.browser
        }
    }
};
export default PostsIndex