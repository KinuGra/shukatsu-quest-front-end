// 採点結果表示
//フォーム
"use client";
import scoredEs from "@/class/scoredEs";
import React from "react";

export default function EsResult({ scoredEs }: { scoredEs: scoredEs }) {
  return (
    <div>
      <h1>採点結果</h1>
      <p>全体の点数: {scoredEs.allScore}</p>
      <p>修正点: {scoredEs.correction}</p>
      <p>修正コメント: {scoredEs.correctionComment}</p>
      <h2>カテゴリーごとの点数</h2>
      <ul>
        {scoredEs.categories.map((category) => (
          <li key={category.name}>
            <p>カテゴリー名: {category.name}</p>
            <p>得点: {category.score}</p>
            <p>満点: {category.fullScore}</p>
            <p>コメント: {category.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
