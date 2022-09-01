import type { PostWithUser } from './Feed'
import TimeAgo from 'react-timeago'
import { ChatAlt2Icon, HeartIcon, SwitchHorizontalIcon, UploadIcon } from '@heroicons/react/outline'

interface Props {
    tweet: PostWithUser
}

function Tweet({ tweet }: Props) {
    return (
        <div className='flex flex-col space-x-3 p-5 border-y border-gray-100'>
            <div className='flex space-x-3'>
                <img className='h-10 w-10 rounded-full object-cover'
                    src={tweet.user.image ?? "https://links.papareact.com/gll"} alt="profile picture" />
                <div>
                    <div className='flex items-center space-x-1'>
                        <p className='mr-1 font-bold'>{tweet.user.name}</p>
                        <p className='hidden text-sm text-gray-500 sm:inline'>
                            @{tweet.user.name?.replace(/\s+/g, '').toLowerCase()}</p>
                        <TimeAgo
                            className='text-sm text-gray-500'
                            date={tweet.createdAt} />
                    </div>
                    <p className='pt-1'>{tweet.text}</p>
                </div>
            </div>
            <div className='flex justify-between mt-5'>
                <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
                    <ChatAlt2Icon className='h-5 w-5' />
                </div>
                <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
                    <SwitchHorizontalIcon className='h-5 w-5' />
                </div>
                <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
                    <HeartIcon className='h-5 w-5' />
                </div>
                <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
                    <UploadIcon className='h-5 w-5' />
                </div>
            </div>
        </div>
    )
}

export default Tweet
