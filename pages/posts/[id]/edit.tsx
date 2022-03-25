import {GetServerSideProps, GetServerSidePropsContext, NextPage} from "next";
import {getDatabaseConnection} from "../../../lib/getDatabaseConnection";
import {Post} from "../../../src/entity/Post";
import {useForm} from "../../../hooks/useForm";
import axios from "axios";
import {useRouter} from "next/router";

type Props = {
    id: string;
    post: Post;
};
const EditPost: NextPage<Props> = (props) => {
    const router = useRouter()
    const {post, id} = props;

    const {form} = useForm({
        initFormData: {title: post.title, content: post.content},
        fields: [
            {label: '大标题', type: 'text', key: 'title'},
            {label: '内容', type: 'textarea', key: 'content'},
        ],
        buttons: <div className="actions">
            <button type="submit">提交</button>
        </div>,
        submit: {
            request: formData => axios.patch(`/api/v1/posts/${id}`, {...formData, id:Number(id)}),
            message: '编辑成功',
            callback(res) {
                if (res.status === 200) {
                    window.alert('提交成功');
                    router.push('/posts');
                }
            }

        }
    });
    return (
        <>
            <div className={'form-wrapper '}>
                <h2>编辑</h2>

                {form}
            </div>
            <style jsx global>{`
              .form-wrapper {
                padding: 16px;
              }

              .postsNew .field-content textarea {
                height: 20em;
                resize: none;
              }

              .postsNew .label-text {
                width: 4em;
                text-align: right;
              }

              .postsNew .actions {
                text-align: center;
                background: #ddd;
                padding: 4px 0;
              }
            `}</style>
        </>
    )
};


export const getServerSideProps: GetServerSideProps = async (context) => {
    const {id} = context.params;
    const connection = await getDatabaseConnection();
    const post = await connection.manager.findOne(Post, id as string);

    return {
        props: {
            post: JSON.parse(JSON.stringify(post)),
            id,
        }
    };
};

export default EditPost;
