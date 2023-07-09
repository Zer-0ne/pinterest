// 'use server'
interface FetchFromApiProps {
    data: {
        user?: {
            name: string | undefined | null;
            username: string | undefined | null;
            id: string;
            image: string;
            saved: string | undefined | null;
            followers: [] | undefined | null;
            followings: [
                {
                    userId: string;
                }
            ];
            posts: [] | undefined | null;
        } | undefined;
    }
}

export const singleUser = async (id: string) => {
    try {
        const response = await fetch(`/api/user/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            next: { revalidate: 30 }
        });
        if (response.ok) {
            const responseData = await response.json()
            const { data } = await responseData
            return data;
        }
        console.error('failed to fetch')
        return
    } catch (error) {
        console.error(error)
    }
}
export const singlePin = async (id: string) => {
    try {
        const response = await fetch(`/api/pins/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            next: { revalidate: 30 }
        });
        if (response.ok) {
            const responseData = await response.json()
            const { Pin } = await responseData
            // console.log(Pin)
            return Pin;
        }
    } catch (error) {

    }
}
export const follow = async (id: string) => {
    try {

        const response = await fetch(`/api/follow/${id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },

        });
        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        }

    } catch (error) {
        console.error(error)
    }
}
export const savePost = async (id: string) => {
    try {
        const response = await fetch(`/api/pins/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (response.ok) {
            const responseData = await response.json()
            return responseData
        }
    } catch (error) {
        console.log(error)
    }
}
export const editPin = async (id: string, data: object) => {
    try {
        const response = await fetch(`/api/pins/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ ...data }),
        })
        if (response.ok) {
            const responseData = await response.json()
            return responseData
        }
        return { message: 'failed to fetch!' }
    } catch (error) {
        console.log(error)
        return { message: 'Internal server error' }
    }
}
export const newComment = async (data: object) => {
    try {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ ...data }),
        })
        if (response.ok) {
            const responseData = await response.json()
            return responseData
        }
    } catch (error) {
        console.log(error)
    }
}
export const deleteComment = async (id: string) => {
    try {
        const response = await fetch(`/api/comment/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        })
        if(response.ok){
            const responseData = await response.json()
            return responseData
        }
    } catch (error) {
        console.log(error)
    }
}