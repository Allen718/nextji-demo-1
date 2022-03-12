import {NextPage} from 'next';
import {useForm} from "../../hooks/useForm";
import {useRouter} from 'next/router';
import axios from "axios";

const AddPost: NextPage = () => {
    const router=useRouter()
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
               if(res.status===200){
                   router.push('/posts');
               }
            }


        }
    });
    return (
        <div> AddPost
            {form}
        </div>)
}
export default AddPost;
