import {NextApiHandler} from "next";
import {Post} from "../../../../src/entity/Post";
import {getDatabaseConnection} from "../../../../lib/getDatabaseConnection";


const updatePost: NextApiHandler = async (req, res) => {
    const connection = await getDatabaseConnection();
    if(req.method==='POST'){
    const {content, title, id} = req.body
    const post = await connection.manager.findOne<Post>('posts', id);
    if (post) {
        post.content = content;
        post.title = title
        await connection.manager.save(post)
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.statusCode = 200;
        res.write(JSON.stringify(post));
    }else{
        res.statusCode=422
    }
    }else if(req.method==='DELETE'){
        const id = req.query.id.toString();
        await connection.manager.delete('Post', id)
        res.statusCode = 200;
    }
    res.end();
};

export default updatePost
