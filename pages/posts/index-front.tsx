import React from 'react'
import {usePosts} from "hooks/usePosts";


export default () => {
const { loading,isEmpty,posts}=usePosts();
    return (
        <div>
            <h1>文章列表</h1>
            {loading ? <div>
                加载中
            </div> : isEmpty ? <div>暂无数据
                </div> :
                posts.map(item => <div key={item.id}>
                    {item.id}
                </div>)
            }
        </div>
    )
};