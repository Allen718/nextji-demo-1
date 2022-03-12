import React, { ReactChild, useCallback, useState} from 'react'
import {AxiosResponse} from "axios";

type Field<T> = {
    label: string;
    type: 'text' | 'password' | 'textarea';
    key: keyof T;
}
type useFormOptions<T> = {
    initFormData: T;
    fields: Field<T>[];
    buttons: ReactChild;
    submit: {
        request: (formData: T) => Promise<AxiosResponse<T>>;
        message: string;
        callback?:(res:AxiosResponse)=>void
    }
}

export function useForm<T>(props:useFormOptions<T>) {
    const {initFormData, fields, buttons, submit} = props
    const [formData, setFormData] = useState(initFormData);
    const [errors, setErrors] = useState(() => {
        const e: { [K in keyof T]?: string[] } = {}
        for (let key in formData) {
            if (initFormData.hasOwnProperty(key)) {
                e[key] = []
            }
        }
        return e
    });
    const onChange = useCallback((key: keyof T, value: any) => {
        setFormData({
            ...formData,
            [key]: value
        })
    }, [formData])

    function showComponent( field: Field<T>) {
        switch (field.type) {
            case 'text':
                return <input type='text' onChange={(e) => onChange(field.key, e.target.value)}/>;
            case 'password':
                return <input type={'password'} onChange={(e) => onChange(field.key, e.target.value)}/>
            case 'textarea':
                return <input type={'textarea'} onChange={(e) => onChange(field.key, e.target.value)}/>
        }
    }
    const _onSubmit = useCallback((e) => {
        e.preventDefault();
        submit.request(formData).then((res) => {
            window.alert(submit.message)
            if(submit.callback&&typeof submit.callback==="function"){
                submit.callback(res)
            }
        }, (error) => {
            if (error.response) {
                const response: AxiosResponse = error.response;
                if (response.status === 422) {
                    setErrors(response.data);
                }
            }
        })

    }, [formData, submit])
    const form = (
        <div>hello
            <form onSubmit={_onSubmit}>
                {fields?.map(field => <div><label>{field.label}{
                    showComponent( field)
                }</label>
                    {
                        errors[field.key]?.length > 0 && <div>
                            {errors[field.key].join(',')}
                        </div>
                    }</div>)}
                {
                    buttons
                }
            </form>
        </div>
    )
    return {
        form: form, setErrors: setErrors
    }
}
