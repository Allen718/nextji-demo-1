import {useCallback, useState} from "react";
import axios, {AxiosResponse} from "axios";

export default () => {
    const [formData, setFormData] = useState({username: '', password: ''})
    const [errors, setErrors] = useState({
        username: [],
        password: [],
        passwordConfirm: [],
    });
    const handleLogin = useCallback((e) => {
            e.preventDefault();
            axios.post(`/api/v1/login`, formData)
                .then(() => {
                    console.log('登录成功')
                }, (error) => {
                    if (error.response) {
                        const response: AxiosResponse = error.response;
                        if (response.status === 422) {
                            console.log('response.data');
                            console.log(response.data);
                            setErrors({ ...response.data});
                        }
                    }
                });
            console.log('formData', formData)
        }, [formData]
    );
    return <div>
        <h1>hello 这是登录页面</h1>
        <form onSubmit={handleLogin}>
            <div>
                <label>用户名</label>
                <input value={formData.username} onChange={(e) => {
                    setFormData({...formData, username: e.target.value})
                }
                }/>
                {errors.username?.length > 0 && <div>
                    {errors.username.join(',')}
                </div>}
            </div>
            <div>
                <label>密码</label>
                <input type={'password'} value={formData.password} onChange={(e) => {
                    setFormData({...formData, password: e.target.value})
                }
                }/>
                {errors.password?.length > 0 && <div>
                    {errors.password?.join(',')}
                </div>}
            </div>
            <button type={"submit"}>登录</button>
        </form>
    </div>
}
;
