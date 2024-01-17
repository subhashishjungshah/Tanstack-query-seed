import "./App.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const posts = [
  { id: 1, title: "Post 1", content: "Content 1" },
  { id: 2, title: "Post 2", content: "Content 2" },
];

function App() {
  const queryClient = useQueryClient();

  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      await wait(1000);
      return [...posts];
    },
  });

  const newPostMutation = useMutation({
    mutationFn: async () => {
      await wait(1000);
      return posts.push({ id: 3, title: "Post 3", content: "Content 3" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  if (postQuery.isLoading) return <h1>Loading...</h1>;
  if (postQuery.isError) return <h1>Error</h1>;
  return (
    <>
      <h1>{postQuery.data.map((post) => post.title)}</h1>
      <button
        disabled={newPostMutation.isLoading}
        onClick={() => newPostMutation.mutate()}
      >
        Add new post
      </button>
    </>
  );
}

function wait(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

export default App;
