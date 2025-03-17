//クエストボード
//中央ステージ一覧
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function LevelBadge() {
  const currentLevel = 7; // 現在のレベル
  const experiencePercentage = 90; // 次のレベルまでの経験値の割合

  return (
    <div style={{ width: 100, height: 100, position: "relative" }}>
      <CircularProgressbar
        value={experiencePercentage}
        text={`Lv ${currentLevel}`}
        styles={buildStyles({
          textSize: "30px",
          pathColor: "#FFA500", // オレンジ色
          textColor: "#8B4513", // 茶色
          trailColor: "#d6d6d6",
          backgroundColor: "#FFF8DC", // コーンシルク色
        })}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: "radial-gradient(circle, #FFF8DC 60%, #8B4513 100%)",
          zIndex: -1,
        }}
      />
    </div>
  );
}
