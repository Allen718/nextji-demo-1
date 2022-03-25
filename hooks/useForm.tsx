import React, {ReactChild, useCallback, useState} from 'react'
import {AxiosResponse} from "axios";
import cs from 'classnames';

type Field<T> = {
    label: string;
    type: 'text' | 'password' | 'textarea';
    key: keyof T;
    className?: string;
}
type useFormOptions<T> = {
    initFormData: T;
    fields: Field<T>[];
    buttons: ReactChild;
    submit: {
        request: (formData: T) => Promise<AxiosResponse<T>>;
        message: string;
        callback?: (res: AxiosResponse) => void
    }
}

export function useForm<T>(props: useFormOptions<T>) {
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

    // function showComponent(field: Field<T>) {
    //     switch (field.type) {
    //         case 'text':
    //             return <input type='text' className={'control'} onChange={(e) => onChange(field.key, e.target.value)}/>;
    //         case 'password':
    //             return <input type={'password'} className={'control'}
    //                           onChange={(e) => onChange(field.key, e.target.value)}/>
    //         case 'textarea':
    //             return <textarea className={'control'} onChange={(e) => onChange(field.key, e.target.value)}/>
    //     }
    // }

    const _onSubmit = useCallback((e) => {
        e.preventDefault();
        submit.request(formData).then((res) => {
            window.alert(submit.message)
            if (submit.callback && typeof submit.callback === "function") {
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
        <>
            <div>
                <form onSubmit={_onSubmit}>
                    {fields?.map(field => <div className={cs('field', `field-${field.key}`, field.className)}>
                        <label className="label">
                            <span className="label-text">{field.label}</span>
                            {field.type === 'textarea' ?
                                <textarea className="control"
                                          onChange={(e) => onChange(field.key, e.target.value)}
                                          value={formData[field.key].toString()}/>
                                :
                                <input className="control"
                                       type={field.type} value={formData[field.key].toString()}
                                       onChange={(e) => onChange(field.key, e.target.value)}/>
                            }
                        </label>
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
            <style jsx>{`
              .field {
                margin: 8px 0;
              }

              .label {
                display: flex;
                line-height: 32px;
              }

              .label input {
                height: 32px;
              }

              .label .label-text {
                white-space: nowrap;
                margin-right: 1em;
              }

              .label .control {
                width: 100%;
              }

              .control:focus {
                outline: none;
                border: 1px solid #000000;
              }
            `}</style>
        </>
    )
    return {
        form: form, setErrors: setErrors
    }
}
