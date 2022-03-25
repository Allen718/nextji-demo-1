import {NextPage} from 'next';
import {useForm} from "../../hooks/useForm";
import {useRouter} from 'next/router';
import axios from "axios";

const AddPost: NextPage = () => {
    const router = useRouter()
    const {form, setErrors} = useForm({
        initFormData: {title: '', content: ''},
        fields: [
            {key: 'title', label: '标题', type: 'text'},
            {key: 'content', label: '内容', type: 'textarea'},
        ],
        buttons: <button type={'submit'}>上传</button>,
        submit: {
            request: (formData) => axios.post(`/api/v1/createPost`, formData),
            message: '上传成功',
            callback(res) {
                if (res.status === 200) {
                    router.push('/posts');
                }
            }


        }
    });
    return (
        <>
            <div className="postsNew">
                <h2>新增</h2>
                <div className="form-wrapper">
                    {form}
                </div>
            </div>
            <style jsx> {`
              h2 {
                padding: 16px;
              }

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
}
export default AddPost;
