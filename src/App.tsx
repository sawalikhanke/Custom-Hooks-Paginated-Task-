import React, { useState } from "react";
import PostsList from "./components/PostLists";
import InfinitePosts from "./components/InfinitePosts";

export default function App() {
  const [mode, setMode] = useState<"pagination" | "infinite">("pagination");

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button onClick={() => setMode("pagination")}>
          📖 Pagination Mode
        </button>
        <button onClick={() => setMode("infinite")} style={{ marginLeft: "10px" }}>
          🌟 Infinite Scroll Mode
        </button>
      </div>

      {mode === "pagination" ? <PostsList /> : <InfinitePosts />}
    </div>
  );
}
