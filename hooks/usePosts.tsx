import {useEffect, useState} from "react";
import axios from "axios";

type Posts = {
    id: string,
    date: string
    title: string
}
export const usePosts = () => {
    const [posts, setPosts] = useState<Posts[]>([]);
    const [loading, setLoading] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)

    useEffect(() => {
        setLoading(true);
        axios.get('/api/v1/posts').then(response => {
            console.log(response);
            if (response.data.length === 0) {
                setIsEmpty(true)
            }
            setLoading(false)
            setPosts(response.data)
        }, () => {
            setLoading(false)
        })
    }, [])
    return {
        posts, loading, isEmpty
    }
}