import { SocialIcon } from 'react-social-icons';
import { BellIcon, BookmarkIcon, CollectionIcon, DotsCircleHorizontalIcon, HashtagIcon, HomeIcon, MailIcon, UserIcon } from '@heroicons/react/outline'
import SidebarRow from './SidebarRow';
import { useSession, signIn, signOut } from "next-auth/react"

function Sidebar() {

    const { data: session } = useSession();

    return (
        <div className='flex flex-col col-span-2 items-center mt-5 px-4 md:items-start'>
            <div className='mx-auto'>
                <SocialIcon url="https://twitter.com/@twitter" />
            </div>
            <SidebarRow Icon={HomeIcon} title="Home" />
            <SidebarRow Icon={HashtagIcon} title="Explore" />
            <SidebarRow Icon={BellIcon} title="Notifications" />
            <SidebarRow Icon={MailIcon} title="Messages" />
            <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
            <SidebarRow Icon={CollectionIcon} title="Lists" />
            <SidebarRow Icon={UserIcon} onClick={session ? signOut : signIn} title={session ? "Sign out" : "Sign in"} />
            <SidebarRow Icon={DotsCircleHorizontalIcon} title="More" />
        </div>
    )
}

export default Sidebar