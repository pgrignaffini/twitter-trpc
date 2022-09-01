import type { PostWithUser } from './Feed'
import TimeAgo from 'react-timeago'
import { ChatAlt2Icon, HeartIcon, SwitchHorizontalIcon, UploadIcon } from '@heroicons/react/outline'
import { PlusCircleIcon } from '@heroicons/react/solid'

import { trpc } from "../utils/trpc";
import { useState } from 'react';
import { Prisma } from '@prisma/client'
import { useSession } from 'next-auth/react';

interface Props {
    tweet: PostWithUser
}

type CommentWithUser = Prisma.CommentGetPayload<{
    include: { user: true }
}>

function Tweet({ tweet }: Props) {

    const [input, setInput] = useState("")
    const { data: session } = useSession()
    const ctx = trpc.useContext();
    const { data: comments, isLoading } = trpc.useQuery(["comment.post-comments", { postId: tweet.id }]);

    const insertComment = trpc.useMutation("comment.create-comment", {
        onMutate: () => {
            ctx.cancelQuery(["comment.post-comments"]);

            const optimisticUpdate = ctx.getQueryData(["comment.post-comments", { postId: tweet.id }]);
            if (optimisticUpdate) {
                ctx.setQueryData(["comment.post-comments"], optimisticUpdate);
            }
        },
        onSettled: () => {
            ctx.invalidateQueries(["comment.post-comments"]);
        }
    })

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        insertComment.mutate({
            text: input,
            postId: tweet.id
        });

        setInput("");
    }


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
                    <p>{comments?.length ?? 0}</p>
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

            {session && (
                <div className='flex items-center space-x-1'>
                    <img src={session?.user?.image ?? ""} className="h-6 w-6 mt-2 rounded-full object-cover" />
                    <form onSubmit={handleSubmit} className="flex space-x-2 w-full items-center mt-2">
                        <input type="text" className="flex-1 border-twitter px-4 py-2 rounded-full outline-twitter" placeholder="Tweet your reply" value={input} onChange={(e) => setInput(e.target.value)} />
                        <button type="submit"
                            disabled={!input}
                            className="disabled:opacity-40"><PlusCircleIcon className='h-7 w-7 text-twitter' /></button>
                    </form>
                </div>
            )}


            {comments && (
                <div className='my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll scrollbar-hide border-t border-gray-100 p-5'>
                    {comments?.map((comment) => (
                        <div key={comment.id} className="flex relative space-x-2">
                            <hr className='absolute left-5 top-10 h-8 border-x border-twitter/30' />
                            <img src={comment.user.image ?? "https://links.papareact.com/gll"} alt="profile picture"
                                className="h-6 w-6 mt-2 rounded-full object-cover" />
                            <div>
                                <div className='flex items-center space-x-1'>
                                    <p className='mr-1 font-bold'>{comment.user.name}</p>
                                    <p className='hidden text-sm text-gray-500 lg:inline'>@{comment.user.name?.replace(/\s+/g, '').toLowerCase()}</p>
                                    <TimeAgo
                                        className='text-sm text-gray-500'
                                        date={comment.createdAt} />
                                </div>
                                <p>{comment.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Tweet
