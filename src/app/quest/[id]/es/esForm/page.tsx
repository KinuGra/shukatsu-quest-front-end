'use client';
import EsForm from "@/features/routes/es/EsForm";
import React from "react";

export default function FormPage() {
    const userId = "user123"; // 仮のユーザーID
    const questId = "quest456"; // 仮のクエストID
    // console.log(.env.BACK_END_API_BASE_URL);
  
    return (
      <div>
        <h1>ESフォームページ</h1>
        <EsForm userId={userId} questId={questId} />
      </div>
    );
  }