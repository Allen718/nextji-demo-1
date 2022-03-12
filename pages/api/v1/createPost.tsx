import {NextApiHandler, NextApiRequest, NextApiResponse} from "next";
import {getPosts} from "../../../lib/posts";
import {Post} from "../../../src/entity/Post";
import {getDatabaseConnection} from "../../../lib/getDatabaseConnection";
import {withIronSessionApiRoute} from "iron-session/next";

const createPost: NextApiHandler = withIronSessionApiRoute(async (req, res) => {
    const {content, title} = req.body
    const post = new Post();
    const user = req.session.user;
    post.content = content;
    post.title = title

    // @ts-ignore
    post.author=user.id
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    const connection = await getDatabaseConnection();
    await connection.manager.save(post);
    res.statusCode = 200;
    res.write(JSON.stringify(post));
    res.end();
}, {
    cookieName: "blog",
    password: process.env.SECRET,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
},)
export default createPost
