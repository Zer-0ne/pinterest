import { GoHome, GoSearch } from "react-icons/go";
import { MdAdd, MdDeleteOutline } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { RiChat1Line, RiEditBoxFill } from "react-icons/ri";
import { HiOutlineDownload } from "react-icons/hi"
import { useSession } from "next-auth/react";
export interface NavbarIcon {
    name: string;
    icon: JSX.Element | string;
    path: string;
}
export const saveCreateBtn = [
    {
        name: 'create',
        text: 'Created'
    },
    {
        name: 'saved',
        text: 'saved'
    }
]
export const moreOptionsBtn = [
    {
        name: 'Download',
        icon: <HiOutlineDownload />,
        action: ''
    },
    {
        name: 'Edit',
        icon: <RiEditBoxFill />,
        action: ''
    },
    {
        name: 'Delete',
        icon: <MdDeleteOutline />,
        action: ''
    },
]
export const NavbarIcons: NavbarIcon[] = [
    {
        name: 'Logo',
        icon: '',
        path: ''
    },
    {
        name: 'Home',
        icon: <GoHome />,
        path: '/'
    },
    // {
    //     name: 'Explore',
    //     icon: <GoSearch />,
    //     path: '/explore'
    // },
    {
        name: 'Create',
        icon: <MdAdd />,
        path: '/create'
    },
    {
        name: 'Search',
        icon: <GoSearch />,
        path: ''
    },
    // {
    //     name: 'Notification',
    //     icon: <RiChat1Line />,
    //     path: ''
    // },
    {
        name: 'Profile',
        icon: <CgProfile />,
        path: ''
    },

]
export interface Image {
    name?: string;
    src: string;
}
export const images: Image[] = [
    {
        name: 'ss',
        src: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F2.bp.blogspot.com%2F-9MIwQEstND0%2FT45QOs9L-LI%2FAAAAAAAADh0%2FPEDSFotZ3mg%2Fs1600%2Faudi%2Bcars%2Bhd%2Bwallpapers.jpg&f=1&nofb=1&ipt=2fdf2008d960e191d9dbf59241104995a7900563a1ff2e032c22d7f38a5c74b9&ipo=images'
    },
    {
        name: 'ss',
        src: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F2.bp.blogspot.com%2F-9MIwQEstND0%2FT45QOs9L-LI%2FAAAAAAAADh0%2FPEDSFotZ3mg%2Fs1600%2Faudi%2Bcars%2Bhd%2Bwallpapers.jpg&f=1&nofb=1&ipt=2fdf2008d960e191d9dbf59241104995a7900563a1ff2e032c22d7f38a5c74b9&ipo=images'
    },
    {
        name: 'ss',
        src: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F2.bp.blogspot.com%2F-9MIwQEstND0%2FT45QOs9L-LI%2FAAAAAAAADh0%2FPEDSFotZ3mg%2Fs1600%2Faudi%2Bcars%2Bhd%2Bwallpapers.jpg&f=1&nofb=1&ipt=2fdf2008d960e191d9dbf59241104995a7900563a1ff2e032c22d7f38a5c74b9&ipo=images'
    },
    {
        name: 'ss',
        src: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F2.bp.blogspot.com%2F-9MIwQEstND0%2FT45QOs9L-LI%2FAAAAAAAADh0%2FPEDSFotZ3mg%2Fs1600%2Faudi%2Bcars%2Bhd%2Bwallpapers.jpg&f=1&nofb=1&ipt=2fdf2008d960e191d9dbf59241104995a7900563a1ff2e032c22d7f38a5c74b9&ipo=images'
    },
]
export const inputForm = [
    {
        name: 'title',
        placeholder: 'Add a title',
        title: 'Title'
    },
    {
        name: 'Description',
        placeholder: 'Write the detailed description for your Pin here or add a specific list below',
        title: 'Description'
    },
    {
        name: 'tag',
        placeholder: 'Tagged topics',
        title: 'Tagged topics'
    },
]
export const signUp = [
    {
        name: 'name',
        placeholder: 'Enter your name',
        type: 'text'
    },
    {
        name: 'username',
        placeholder: 'username',
        type: 'text'
    },
    {
        name: 'email',
        placeholder: 'Enter your email',
        type: 'email'
    },
    {
        name: 'password',
        placeholder: 'Create a password',
        type: 'password'
    },
    {
        name: 'adminPassword',
        placeholder: 'Confirm password',
        type: 'password'
    },
    {
        name: 'otp',
        placeholder: 'Enter otp',
        type: 'number'
    },

]
export const logIn = [
    {
        name: 'username',
        placeholder: 'Enter username or email or phone number',
        type: 'text'
    },
    {
        name: 'password',
        placeholder: 'Enter password',
        type: 'password'
    }
]
export interface Data {
    data: {
        user?: User
    }
    status?: any
}
export interface User {
    name: string;
    username: string | null | undefined;
    id: string;
    image: string;
    saved: [];
    followers: [{
        userId: string;
    }];
    followings: [{
        userId: string;
    }];
    posts: [] | null | undefined;
    isAdmin: Boolean
}
export interface SessionsProps {
    user: {

        name: string;
        username: string;
        id: string;
        isAdmin: Boolean
        image: string;
        saved: [];
        followers: [];
        followings: [{
            userId: string;
        }];
        posts: [];
        // }
    }
}
export interface Post {
    _id: string;
    title: string;
    image: string;
    Description: string;
    imageid: string;
    tag: string;
    authorId: string;
    comments: [];
    [key: string]: any;
}
export interface CommentProps {
    comment: string,
    pinId: string,
    userId: string,
    _id: string
}
export const UserSession = async () => {
    const { data: session } = useSession() as Data
    return session
}
export interface PostCardProps {
    Pin: {
        image: string;
        title: string;
        _id: string;
        comments: [];
        authorId: string;
        tag:string
        Description:string
    },
    user: User
}