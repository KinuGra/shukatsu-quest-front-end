"use client";

import ESForm from "@/features/routes/es/EsForm";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

export default function FormPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const params = useParams();
  const questId = params.id;
  if (!userId || !questId) {
    return <div>エラーが発生しました</div>;
  }
  // questIdがstringであることを確認する
  if (typeof questId !== "string") {
    return <div>エラーが発生しました</div>;
  }

  return (
    <div>
      <h1>ESフォームページ</h1>
      <ESForm userId={userId} questId={questId} />
    </div>
  );
}
