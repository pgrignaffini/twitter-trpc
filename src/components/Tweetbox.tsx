import { CalendarIcon, EmojiHappyIcon, LocationMarkerIcon, PhotographIcon, SearchCircleIcon } from "@heroicons/react/outline"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { trpc } from "../utils/trpc"
import toast from "react-hot-toast"

function Tweetbox() {

    const [input, setInput] = useState<string>('')
    const ctx = trpc.useContext();
    const { data: session } = useSession();

    const postMessage = trpc.useMutation("post.create-post", {
        onMutate: () => {
            ctx.cancelQuery(["post.posts"]);

            let optimisticUpdate = ctx.getQueryData(["post.posts"]);
            if (optimisticUpdate) {
                ctx.setQueryData(["post.posts"], optimisticUpdate);
            }
        },
        onSettled: () => {
            ctx.invalidateQueries(["post.posts"]);
        }
    })

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const loading = toast.loading("Posting tweet...")
        postMessage.mutate({
            text: input,
        });

        setInput("");

        toast.success("Tweet posted!", {
            id: loading
        })
    }

    return (
        <div className="flex space-x-2 p-5">
            <img className="h-14 w-14 object-cover rounded-full mt-4"
                src={session?.user?.image ?? "https://links.papareact.com/gll"} />
            <div className="flex flex-1 items-center pl-2">
                <form className="flex flex-1 flex-col" onSubmit={handleSubmit}>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text" placeholder="What's happening?" className="h-24 text-xl outline-none" />
                    <div className="flex items-center">
                        <div className="flex flex-1 space-x-2 text-twitter">
                            <PhotographIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
                            <SearchCircleIcon className="h-5 w-5" />
                            <EmojiHappyIcon className="h-5 w-5" />
                            <CalendarIcon className="h-5 w-5" />
                            <LocationMarkerIcon className="h-5 w-5" />
                        </div>
                        <button
                            type="submit"
                            disabled={!input}
                            className="bg-twitter rounded-full font-semibold px-5 py-2 text-white disabled:opacity-40">Tweet</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Tweetbox
