import { RxAvatar } from "react-icons/rx";
import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";

const ReadingList = () => {
    const [profile, setProfile] = useState({
        name: "userName",
        avatarurl: null,
        bio: "text"
    });
    const [readingList, setReadingList] = useState([]);

    //fake userId, useParam later
    const userId = 1;

    useEffect(() => {
        fetchProfile();
        fetchReadingList();
    }, []);

    async function fetchProfile() {
        const { data, error } = await supabase
            .from("profile")
            .select("name, avatarurl, bio")
            .eq("user_id", userId)
            .single();

        if (!error && data) {
            setProfile(data);
        } else {
            console.error("Error fetching reading list:", JSON.stringify(error, null, 2));
        }
    }

    async function fetchReadingList() {
        const { data, error } = await supabase
            .from("reading_list")
            .select(`
                    id,
                    post:post_id (
                        id,
                        title,
                        slug,
                        coverimageurl,
                        updatedat,
                        user :user_id (
                        username
                        ),
                        publication:publication_id (
                        name
                        )
                    )
                    `)
            .eq("user_id", userId);

        if (error) {
            console.error("Error fetching reading list:", error);
        } else {
            // Mỗi item có post.user và post.publication
            console.log("Reading list:", data);
            setReadingList(data.map((item) => item.post));
        }
    }


    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <div className="flex items-center gap-4 mb-8">
                {profile.avatarurl ? (
                    <img
                        src={profile.avatarurl}
                        alt="Avatar"
                        className="w-16 h-16 rounded-full object-cover"
                    />
                ) : (
                    <RxAvatar className="w-16 h-16 rounded-full text-gray-500" />
                )}
                <h2 className="text-lg font-semibold">{profile.name}</h2>
            </div>

            <div className="flex justify-between items-center mb-6 pb-3">
                <h1 className="text-2xl font-bold">Reading list</h1>
            </div>

            {readingList.length === 0 && (
                <p className="text-gray-500 italic mb-6">No post here</p>
            )}

            <div className="space-y-8">
                {readingList.map((post) => (
                    <div
                        key={post.id}
                        className="flex flex-col md:flex-row justify-between border-b border-gray-100 pb-6"
                    >
                        <div className="flex-1 pr-4">
                            <p className="text-sm text-gray-500 mb-1">
                                In{" "}
                                <span className="font-semibold">
                                    {post.publication?.name || "Independent"}
                                </span>{" "}
                                by {post.user?.username || "Unknown"}
                            </p>

                            <a
                                href={`/posts/${post.slug}`}
                                className="block text-xl font-bold text-gray-900 hover:underline"
                            >
                                {post.title}
                            </a>

                            <span className="text-gray-700 text-sm mt-1">
                                {post.updatedat
                                    ? new Date(post.updatedat).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    })
                                    : ""}
                            </span>

                        </div>

                        {post.coverImageUrl && (
                            <img
                                src={post.coverImageUrl}
                                alt={post.title}
                                className="w-40 h-28 object-cover rounded-md mt-4 md:mt-0"
                            />
                        )}
                    </div>
                ))}

            </div>
        </div>
    );
};

export default ReadingList;
