import {useCallback, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {withSessionSsr} from "lib/withSession";
// import {withIronSessionSsr} from "iron-session/next";
import {useForm} from "../../hooks/useForm";


export default (props: { user: {} }) => {
    const user = props.user;

    // const [formData, setFormData] = useState({username: '', password: ''})
    // const [errors, setErrors] = useState({
    //     username: [],
    //     password: [],
    //     passwordConfirm: [],
    // });
    const handleLogin = useCallback((formData) => {
            axios.post(`/api/v1/login`, formData)
                .then(() => {
                    console.log('登录成功')
                }, (error) => {
                    if (error.response) {
                        const response: AxiosResponse = error.response;
                        if (response.status === 422) {
                            console.log('response.data');
                            console.log(response.data);
                            setErrors({...response.data});
                        }
                    }
                });
            console.log('formData', formData)
        }, []
    );
    const {form, setErrors} = useForm({
        initFormData: {username: '', password: ''},
        fields: [
            {
                label: '用户名',
                type: 'text',
                key: 'username'
            },
            {
                label: '密码',
                type: 'password',
                key: 'password'
            }
        ],
        buttons: <button type={"submit"}>登录</button>,
        submit: {
            request: formData => axios.post(`/api/v1/login`, formData),
            message: '登录成功'
        },
    })
    return <div>
        <h1>hello 这是登录页面</h1>
        {/*<form onSubmit={handleLogin}>*/}
        {/*    <div>*/}
        {/*        <label>用户名</label>*/}
        {/*        <input value={formData.username} onChange={(e) => {*/}
        {/*            setFormData({...formData, username: e.target.value})*/}
        {/*        }*/}
        {/*        }/>*/}
        {/*        {errors.username?.length > 0 && <div>*/}
        {/*            {errors.username.join(',')}*/}
        {/*        </div>}*/}
        {/*    </div>*/}
        {/*    <div>*/}
        {/*        <label>密码</label>*/}
        {/*        <input type={'password'} value={formData.password} onChange={(e) => {*/}
        {/*            setFormData({...formData, password: e.target.value})*/}
        {/*        }*/}
        {/*        }/>*/}
        {/*        {errors.password?.length > 0 && <div>*/}
        {/*            {errors.password?.join(',')}*/}
        {/*        </div>}*/}
        {/*    </div>*/}
        {/*    <button type={"submit"}>登录</button>*/}
        {/*</form>*/}
        {form}
    </div>
}
;
export const getServerSideProps = withSessionSsr(
    async function getServerSideProps({req}) {
        const user = req.session.user;
        return {
            props: {
                user: JSON.parse(JSON.stringify(req.session.user || {})),
            },
        };
    }
    )
