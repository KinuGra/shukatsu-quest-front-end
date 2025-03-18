'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./EsForm.module.css";
import Es from "@/class/es";


export default function EsForm({userId, questId}: {userId: string, questId: string}) {
  const [topic, setTopic] = useState("");
  const [charLimit, setCharLimit] = useState<number>(0);
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const es = new Es(questId, userId, topic, content, charLimit);
    router.push("/quest/[questId]/es/esResult", 
      
    );
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
            onChange={(e) => setCharLimit(Number(e.target.value))}
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
