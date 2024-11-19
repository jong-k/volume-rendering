"use client";

import { useRouter } from "next/navigation";

export default function ViewerPage() {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.back()}>뒤로가기</button>
      <h2>뷰어 페이지</h2>
    </div>
  );
}
