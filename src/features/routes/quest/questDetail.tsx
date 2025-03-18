"use client";
import { redirect, useParams, useSearchParams } from "next/navigation";
import { getUser, postLevelUp, postQuestDone } from "@/utils/api";
import { toast } from "react-toastify";

/*imp
クエストをクリックした際に表示される詳細ページ

# UI
- 右上に丸いクエストに対するアドバイスボタンがある
- クエスト名を表示
- 行動内容を記述する入力フォーム
- 完了ボタン
*/

import React, { use, useEffect, useState } from "react";
const initialLevelUpExp = 100;
const ratio = 1.1;

interface QuestDetailProps {
  quest: {
    id: string;
    name: string;
    type: string;
    num: number;
    baseExp: number;
  };
  onComplete: () => void;
  setCurrentLevel: (level: number) => void;
  setTotalExp: (exp: number) => void;
}
const getNextLevelUpExp = (lv: number) => {
  // 切り捨てした結果を返す
  return Math.floor(initialLevelUpExp * Math.pow(ratio, lv));
};

const getTotalExp = (lv: number, exp: number) => {
  const total =
    (initialLevelUpExp * (1 - Math.pow(ratio, lv))) / (1 - ratio) + exp;
  return Math.floor(total);
};

const QuestDetail: React.FC<QuestDetailProps> = ({
  quest,
  onComplete,
  setCurrentLevel,
  setTotalExp,
}) => {
  const [actionContent, setActionContent] = useState(""); // ユーザー情報の状態ード中の状態
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const params = useParams();
  const questId = params.id;

  if (!userId || !questId) {
    return <div>エラーが発生しました</div>;
  }

  if (typeof questId !== "string") {
    return <div>エラーが発生しました</div>;
  }

  const handleComplete = async () => {
    const JsonUser = await getUser(userId);
    const user = JSON.parse(JsonUser);
    if (!user) {
      console.error("ユーザー情報がロードされていません");
      return;
    }

    //　経験値の分だけレベルアップ処理 ただし、2回以上レベルアップすることもある
    // 例えば、レベル1で経験値100を得た場合、レベル2になるが、その後も経験値100を得た場合、レベル3になる
    // その処理を記述して
    var flag = false;
    if (user.exp + quest.baseExp >= getNextLevelUpExp(user.lv)) {
      while (user.exp + quest.baseExp >= getNextLevelUpExp(user.lv)) {
        flag = true;
        user.lv += 1;
        user.exp = user.exp + quest.baseExp - getNextLevelUpExp(user.lv);
      }
    } else {
      user.exp += quest.baseExp;
    }
    while (user.exp + quest.baseExp >= getNextLevelUpExp(user.lv)) {
      flag = true;
      user.lv += 1;
      user.exp = user.exp + quest.baseExp - getNextLevelUpExp(user.lv);
    }
    console.log(user.lv, user.exp);
    await postLevelUp(userId, user.lv, user.exp);
    await postQuestDone(userId, questId);
    if (flag) {
      onComplete();
      setCurrentLevel(user.lv);
      setTotalExp(getTotalExp(user.lv, user.exp));
    } else {
      redirect("/");
    }
    // const nextLevelUpExp = 100 * Math.pow(1.1, user.lv);
    // if (user.exp + quest.baseExp >= getNextLevelUpExp) {
    //   // レベルアップ
    //   user.lv += 1;

    //   user.exp = user.exp + quest.baseExp - nextLevelUpExp;
    //   await postLevelUp(userId, user.lv, user.exp);
    //   onComplete();
    // } else {
    //   user.exp += quest.baseExp;
    //   await postLevelUp(userId, user.lv, user.exp);
    // }
    toast.success("クエストを完了しました");
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
