import React, {useCallback, useState} from "react";
import axios, {AxiosResponse} from 'axios';

export default () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConfirm: '',
    });
    const [errors, setErrors] = useState({
        username: [],
        password: [],
        passwordConfirm: [],
    });
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        axios.post(`/api/v1/AddUser`, formData)
            .then(() => {}, (error) => {
                if (error.response) {
                    const response: AxiosResponse = error.response;
                    if (response.status === 422) {
                        console.log('response.data');
                        console.log(response.data);
                        setErrors({...errors, ...response.data});
                    }
                }
            });

    }, [formData])
    return (
        <div>
            <h1>登陆页</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label>
                        用户名<input type={'text'} onChange={(e) => {
                        setFormData({...formData, username: e.target.value})
                    }}/>
                    </label>
                    {errors.username?.length > 0 && <div>
                        {errors.username.join(',')}
                    </div>}
                </div>
                <div>
                    <label>
                        密码<input type={'password'} onChange={(e) => {
                        console.log(e.target.value);
                        setFormData({...formData, password: e.target.value})
                    }}/>
                    </label>
                    {errors.password?.length > 0 && <div>
                        {errors.password.join(',')}
                    </div>}
                </div>
                <div>
                    <label>
                        再次输入密码<input type={'password'} onChange={(e) => {
                        setFormData({...formData, passwordConfirm: e.target.value})
                    }}/>
                    </label>
                    {errors.passwordConfirm?.length > 0 && <div>
                        {errors.passwordConfirm.join(',')}
                    </div>}
                </div>
                <button type={'submit'}>注册</button>
            </form>

        </div>
    )
};