import React, { useState } from "react";
import { usePaginatedData } from "../hooks/usePaginatedData";
import Pagination from "./Pagination";
import Skeleton from "./Skeleton";

export default function PostsList() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [filter, setFilter] = useState("");

  const { data, isLoading, isFetching } = usePaginatedData(page, pageSize, filter);

  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="posts-container">
      <h1>📖 Paginated Posts</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search posts..."
          value={filter}
          onChange={(e) => {
            setPage(1);
            setFilter(e.target.value);
          }}
        />

        <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </select>
      </div>

      {isLoading || isFetching ? (
        <div>
          {[...Array(pageSize)].map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="post-list">
          {data?.data.map((post) => (
            <div className="post-card" key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
