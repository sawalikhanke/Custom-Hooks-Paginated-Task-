import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface PageResponse {
  data: Post[];
  nextPage: number;
  total: number;
}

export function useInfinitePosts(pageSize: number, filter: string) {
  return useInfiniteQuery<PageResponse, Error, PageResponse, [string, number, string]>({
    queryKey: ["infinite-posts", pageSize, filter],
    queryFn: async (context): Promise<PageResponse> => {
      const pageParam = typeof context.pageParam === "number" ? context.pageParam : 1;
      const res = await axios.get<Post[]>(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: {
            _page: pageParam,
            _limit: pageSize,
            title_like: filter || undefined,
          },
        }
      );
      const total = Number(res.headers["x-total-count"] || 100);
      return { data: res.data, nextPage: pageParam + 1, total };
    },
    getNextPageParam: (lastPage) =>
      lastPage.data.length === 0 ? undefined : lastPage.nextPage,
    initialPageParam: 1, 
  });
}
