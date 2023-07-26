import { toast } from "react-toastify";
import { Data, SessionsProps } from "./constant";
import { useSession } from "next-auth/react";

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

export const singleUser = async (_id: string) => {
    try {
        const response = await fetch(`/api/user/${_id}`, {
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
export const singlePin = async (_id: string) => {
    try {
        const response = await fetch(`/api/pins/${_id}`, {
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
        console.log(error)
    }
}
export const follow = async (_id: string) => {
    const id = toast.loading("Please wait...")
    try {
        const response = await fetch(`/api/follow/${_id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },

        });
        if (response.ok) {
            const responseData = await response.json();
            toast.update(id, {
                render: responseData.message, type: "success", isLoading: false, autoClose: 5000, hideProgressBar: false, closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return responseData;
        }

    } catch (error) {
        console.error(error)
        toast.update(id, {
            render: "Something went wrong", type: "error", isLoading: false, autoClose: 5000, hideProgressBar: false, closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
}
export const savePost = async (_id: string) => {
    const id = toast.loading("Please wait...")
    try {
        const response = await fetch(`/api/pins/${_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (response.ok) {
            const responseData = await response.json()
            toast.update(id, {
                render: responseData.message, type: "success", isLoading: false, autoClose: 5000, hideProgressBar: false, closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return responseData
        }
    } catch (error) {
        console.log(error)
        toast.update(id, {
            render: "Something went wrong", type: "error", isLoading: false, autoClose: 5000, hideProgressBar: false, closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
}
export const editPin = async (_id: string, data: object) => {
    const id = toast.loading("Please wait...")
    try {
        const response = await fetch(`/api/pins/${_id}`, {
            method: 'PUT',
            body: JSON.stringify({ ...data }),
        })
        if (response.ok) {
            const responseData = await response.json()
            toast.update(id, {
                render: responseData.message, type: "success", isLoading: false, autoClose: 5000, hideProgressBar: false, closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return responseData
        }
        return { message: 'failed to fetch!' }
    } catch (error) {
        console.log(error)
        toast.update(id, {
            render: "Something went wrong", type: "error", isLoading: false, autoClose: 5000, hideProgressBar: false, closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        return { message: 'Internal server error' }

    }
}
export const newComment = async (data: object) => {
    const id = toast.loading("Please wait...")
    try {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ ...data }),
        })
        if (response.ok) {
            const responseData = await response.json()
            toast.update(id, {
                render: responseData.message, type: "success", isLoading: false, autoClose: 5000, hideProgressBar: false, closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return responseData
        }
    } catch (error) {
        console.log(error)
        toast.update(id, {
            render: "Something went wrong", type: "error", isLoading: false, autoClose: 5000, hideProgressBar: false, closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
}
export const deleteComment = async (
    _id: string,
    authorId: string,
    itemUserId: string,
    SessionUser: SessionsProps
) => {
    const id = toast.loading("Please wait...")
    try {
        if (authorId === SessionUser?.user.id || itemUserId === SessionUser?.user.id || SessionUser?.user.isAdmin) {

            const response = await fetch(`/api/comment/${_id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (response.ok) {
                const responseData = await response.json()
                toast.update(id, {
                    render: responseData.message, type: "success", isLoading: false, autoClose: 5000, hideProgressBar: false, closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                return responseData
            }
        }
        toast.update(id, {
            render: 'Unauthorized', type: "error", isLoading: false, autoClose: 5000, hideProgressBar: false, closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        return
    } catch (error) {
        console.log(error)
        toast.update(id, {
            render: "Something went wrong", type: "error", isLoading: false, autoClose: 5000, hideProgressBar: false, closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
}
export const deletePin = async (_id: string) => {
    const id = toast.loading("Please wait...")
    try {
        const response = await fetch(`/api/pins/${_id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (response.ok) {
            const responseData = await response.json()
            toast.update(id, {
                render: responseData.message, type: "success", isLoading: false, autoClose: 5000, hideProgressBar: false, closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return responseData
        }
    } catch (error) {
        console.log(error)
        toast.update(id, {
            render: "Something went wrong", type: "error", isLoading: false, autoClose: 5000, hideProgressBar: false, closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
}