import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./ESForm.module.css";

export default function EsForm() {
  const [topic, setTopic] = useState("");
  const [charLimit, setCharLimit] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 採点ロジックをここに追加
    console.log("採点中...");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ESフォーム</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>お題の選択:</label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className={styles.select}
          >
            <option value="">選択してください</option>
            <option value="topic1">お題1</option>
            <option value="topic2">お題2</option>
            {/* 他のお題を追加 */}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>ESの制限文字数の選択:</label>
          <input
            type="number"
            value={charLimit}
            onChange={(e) => setCharLimit(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>ESの内容を入力:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={charLimit}
            className={styles.textarea}
          />
        </div>
        <button type="submit" className={styles.button}>
          採点
        </button>
        <button
          type="button"
          onClick={() => router.push("/")}
          className={styles.button}
        >
          Homeに戻る
        </button>
      </form>
    </div>
  );
}
