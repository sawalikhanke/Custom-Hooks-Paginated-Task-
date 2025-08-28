import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";

export interface Post {
  id: number;
  title: string;
  body: string;
}

export function usePaginatedData(
  page: number,
  pageSize: number,
  filter: string
) {
  return useQuery({
    queryKey: ["posts", page, pageSize, filter],
    queryFn: async () => {
      const res = await axios.get<Post[]>(
        `https://jsonplaceholder.typicode.com/posts`,
        {
          params: {
            _page: page,
            _limit: pageSize,
            title_like: filter || undefined,
          },
        }
      );

      const total = Number(res.headers["x-total-count"] || 100); 
      return { data: res.data, total };
    },
    placeholderData: keepPreviousData, 
  });
}
