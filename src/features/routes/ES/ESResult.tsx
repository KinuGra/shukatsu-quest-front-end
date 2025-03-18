// 採点結果表示
//フォーム
'use client';
import React from  "react";

export default function EsResult({ result }: { result: any }) {
  return (
    <div>
      <h1>ES添削結果</h1>
      <p>クエストID: {result.questId}</p>
      <p>ユーザーID: {result.userId}</p>
      <p>お題: {result.topic}</p>
      <p>内容: {result.content}</p>
      <p>制限文字数: {result.charLimit}</p>
      <p>採点結果: {result.score}</p>
    </div>
  );
}
