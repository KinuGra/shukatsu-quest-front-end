//クエストボード
//中央ステージ一覧
import React from "react";
import "./LevelBadge.css";

export default function LevelBadge() {
  const currentLevel = 7; // 現在のレベル
  const experiencePercentage = 90; // 次のレベルまでの経験値の割合

  return (
    <div className="level-badge">
      <svg className="circular-chart" viewBox="0 0 36 36">
        <path
          className="circle-bg"
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="circle"
          strokeDasharray={`${experiencePercentage}, 100`}
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text x="18" y="18" className="percentage">{`Lv ${currentLevel}`}</text>
      </svg>
      <div className="background-circle" />
    </div>
  );
}
