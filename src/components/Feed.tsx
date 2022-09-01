import { RefreshIcon } from "@heroicons/react/outline"
import Tweetbox from "./Tweetbox"
import TweetComponent from "./Tweet"
import { Prisma } from '@prisma/client'

export type PostWithUser = Prisma.PostGetPayload<{
    include: { user: true }
}>

interface Props {
    tweets: PostWithUser[] | undefined
}

function Feed({ tweets }: Props) {
    return (
        <div className="col-span-7 border max-h-screen overflow-y-scroll scrollbar-hide lg:col-span-5 ">
            <div className="flex items-center justify-between">
                <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
                <RefreshIcon className="h-8 w-8 cursor-pointer text-twitter mr-5 mt-5 
                transition-all duration-500 ease-out hover:rotate-180 active:scale-125" />
            </div>
            <div>
                <Tweetbox />
            </div>
            <div>
                {tweets?.map((tweet) => (
                    <TweetComponent key={tweet.id} tweet={tweet} />
                ))}
            </div>
        </div>
    )
}

export default Feed
