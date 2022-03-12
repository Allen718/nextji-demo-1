import React, {useCallback, useState} from "react";
import axios, {AxiosResponse} from 'axios';
import {useRouter} from 'next/router';
import {useForm} from "../../hooks/useForm";

export default () => {
    const router = useRouter()
    // const [formData, setFormData] = useState({
    //     username: '',
    //     password: '',
    //     passwordConfirm: '',
    // });
    // const [errors, setErrors] = useState({
    //     username: [],
    //     password: [],
    //     passwordConfirm: [],
    // });
    // const onSubmit = useCallback((e) => {
    //     e.preventDefault();
    //     axios.post(`/api/v1/AddUser`, formData)
    //         .then((res) => {
    //             if (res.status === 200) {
    //                 router.push('/sign_in');
    //             }
    //
    //         }, (error) => {
    //             if (error.response) {
    //                 const response: AxiosResponse = error.response;
    //                 if (response.status === 422) {
    //                     console.log('response.data');
    //                     console.log(response.data);
    //                     setErrors({...response.data});
    //                 }
    //             }
    //         });
    //
    // }, [formData])
    const {form} = useForm({
        initFormData: {
            username: '', password: '', passwordConfirm: ''
        },
        fields: [
            {label: '用户名', key: 'username', type: 'text'},
            {label: '密码', key: 'password', type: 'password'},
            {label: '确认密码', key: 'passwordConfirm', type: 'password'}
        ],
        buttons: <button type={'submit'}>注册</button>,
        submit: {
            request: (formData) => axios.post(`/api/v1/AddUser`, formData),
            message: '注册成功',
            callback: (res) => {
                if (res.status === 200) {
                    router.push('/sign_in');
                }
            }
        }
    })
    return (
        <div>
            <h1>hello 这是一个注册页面</h1>
            {form}
            {/*<form onSubmit={onSubmit}>*/}
            {/*    <div>*/}
            {/*        <label>*/}
            {/*            用户名<input type={'text'} onChange={(e) => {*/}
            {/*            setFormData({...formData, username: e.target.value})*/}
            {/*        }}/>*/}
            {/*        </label>*/}
            {/*        {errors.username?.length > 0 && <div>*/}
            {/*            {errors.username.join(',')}*/}
            {/*        </div>}*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <label>*/}
            {/*            密码<input type={'password'} onChange={(e) => {*/}
            {/*            console.log(e.target.value);*/}
            {/*            setFormData({...formData, password: e.target.value})*/}
            {/*        }}/>*/}
            {/*        </label>*/}
            {/*        {errors.password?.length > 0 && <div>*/}
            {/*            {errors.password.join(',')}*/}
            {/*        </div>}*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <label>*/}
            {/*            再次输入密码<input type={'password'} onChange={(e) => {*/}
            {/*            setFormData({...formData, passwordConfirm: e.target.value})*/}
            {/*        }}/>*/}
            {/*        </label>*/}
            {/*        {errors.passwordConfirm?.length > 0 && <div>*/}
            {/*            {errors.passwordConfirm.join(',')}*/}
            {/*        </div>}*/}
            {/*    </div>*/}
            {/*    <button type={'submit'}>注册</button>*/}
            {/*</form>*/}

        </div>
    )
};
