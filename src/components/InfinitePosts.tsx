
import { useInfinitePosts} from "../hooks/useInfinitePosts";
import type {Post} from "../hooks/useInfinitePosts";
import type {PageResponse} from "../hooks/useInfinitePosts";
export default function InfinitePosts() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfinitePosts(10, ""); // fetch 10 posts per page, no filter for now

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="infinite-container">
      <h2 className="title">Infinite Posts</h2>

      <div className="posts-grid">
        {data?.pages
          ?.flatMap((page: PageResponse) => page.data)
          .map((post: Post) => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))}
      </div>

      <div className="load-more">
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "No More Posts"}
        </button>
      </div>
    </div>
  );
}
