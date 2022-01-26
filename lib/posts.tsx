import fs, {promises as fsPromise} from "fs";
import path from 'path';
import matter from 'gray-matter';
const markdownDir = path.join(process.cwd(), 'markdown')
export const getPosts = async () => {
    const fileNames = await fsPromise.readdir(markdownDir)
    const x = fileNames.map(filename => {
        const id = filename.replace(/\.md$/, '')
        const fullPath = path.join(markdownDir, filename)
        const text = fs.readFileSync(fullPath, 'utf-8')
        const {data} = matter(text)
        const {title, date} = data;
        return {id, title, date}
    })
    return x
}
export const getPost = async (id:string) => {
    const fullPath = path.join(markdownDir, id + '.md');
        const text = fs.readFileSync(fullPath, 'utf-8')
        const {data,content} = matter(text)
        const {title, date} = data;
    return   JSON.parse(JSON.stringify({id, title, date, content}));

};
export const getIds = async () => {
    const fileNames = await fsPromise.readdir(markdownDir)
       const x=fileNames.map(item=>item.replace(/\.md$/,''))
    return x
};