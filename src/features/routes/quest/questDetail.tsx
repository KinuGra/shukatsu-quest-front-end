"use client";
import { redirect, useParams, useSearchParams } from "next/navigation";
import { postQuestDone } from "@/utils/api";
import { toast } from "react-toastify";
/*
クエストをクリックした際に表示される詳細ページ

# UI
- 右上に丸いクエストに対するアドバイスボタンがある
- クエスト名を表示
- 行動内容を記述する入力フォーム
- 完了ボタン
*/

import React, { useState } from "react";

interface QuestDetailProps {
  quest: {
    id: string;
    name: string;
    type: string;
    num: number;
    baseExp: number;
  };
}

const QuestDetail: React.FC<QuestDetailProps> = ({ quest }) => {
  const [actionContent, setActionContent] = useState("");
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

  const handleComplete = async () => {
    await postQuestDone(userId, questId);
    toast.success("クエストを完了しました");
    redirect("/");
  };

  return (
    <div
      style={{
        padding: "20px",
        width: "50%",
        margin: "0 auto",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingTop: "10vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4 style={{ fontWeight: "bold", fontSize: "28px" }}>{quest.name}</h4>
        <button
          style={{
            background: "#007bff",
            border: "none",
            cursor: "pointer",
            fontSize: "24px",
            color: "#fff",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          aria-label="クエストに対するアドバイス"
        >
          ?
        </button>
      </div>
      <textarea
        placeholder="行動内容"
        rows={4}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "20px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
        value={actionContent}
        onChange={(e) => setActionContent(e.target.value)}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={handleComplete}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          完了
        </button>
      </div>
    </div>
  );
};

export default QuestDetail;
