import { RxAvatar } from "react-icons/rx";
import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";

const EditProfile = () => {
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
      console.error("Error fetching profile:", error);
    }
  }

  async function fetchReadingList() {
    const { data, error } = await supabase
      .from("reading_list")
      .select(`
                id,
                post:post (
                  id,
                  title,
                  slug
                ) 
              `)
      .eq("user_id", 1);

    if (error) {
      console.error("Error fetching reading list:", error);
    } else {
      setReadingList(data.map((item) => item.post));
    }
  }

  return (
    <div className="grid grid-cols-[1fr_auto] gap-12">
      <div className="p-6 lg:pl-32 transition-all duration-300 z-10">
        <div className="py-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-8 md:hidden">
              {profile.avatarurl ? (
                <img
                  src={profile.avatarurl}
                  alt="Avatar"
                  className="w-16 h-16 object-cover rounded-full"
                />
              ) : (
                <RxAvatar className="w-16 h-16 object-cover rounded-full text-black" />
              )
              }
              <h5 className="my-2 font-bold text-xl">{profile.name}</h5>
            </div>

            <h1 className="font-bold text-4xl mb-12 max-md:hidden">
              {profile.name}
            </h1>

            <a
              href="#"
              className="block p-4 border border-gray-200 bg-gray-100 rounded-lg hover:bg-gray-200 transition max-w-xl"
            >
              <h2 className="text-xl font-bold mb-4">Reading list</h2>

              <div>
                {readingList.length > 0 ? (
                  <ul className="list-disc pl-5 text-gray-700">
                    {readingList.map((post) => (
                      <li key={post.id}>
                        <a
                          href={`/posts/${post.slug}`}
                          className="text-blue-600 hover:underline"
                        >
                          {post.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">
                    You have no items in your reading list.
                  </p>
                )}
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="max-md:hidden top-14 right-0 h-[calc(100%-56px)] w-64 lg:w-96 bg-300 border-l border-gray-200 p-4">
        <div className="mx-2 my-3 flex flex-col items-start">
          {profile.avatarurl ? (
            <img
              src={profile.avatarurl}
              alt="Avatar"
              className="w-16 h-16 object-cover rounded-full"
            />
          ) : (
            <RxAvatar className="w-16 h-16 object-cover rounded-full text-black" />
          )
          }
          <h5 className="my-2">{profile.name}</h5>
          <p className="text-xs text-gray-600">{profile.bio}</p>
          <a
            href="/edit"
            className="mt-7 text-sm text-green-700 cursor-pointer hover:text-violet-900"
          >
            Edit Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
