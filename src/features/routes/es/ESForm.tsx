"use client";

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import styles from "./EsForm.module.css";
import Es from "@/class/es";
import { MyContext } from "@/provider/esProvider";

export default function ESForm({
  userId,
  questId,
}: {
  userId: string;
  questId: string;
}) {
  const [topic, setTopic] = useState("");
  const [charLimit, setCharLimit] = useState<number>(0);
  const [content, setContent] = useState("");
  const router = useRouter();
  const { es, setEs } = useContext(MyContext);

  console.log(es);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // フォーム送信時にESインスタンスを作成してコンテキストを更新
    const newEs = {
      questId,
      userId,
      theme: topic,
      answer: content,
      length: charLimit,
    } as Es;
    setEs(newEs);
    router.push(`/quest/${questId}/es/esResult`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>お題の入力:</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className={styles.input}
            placeholder="例：学生時代に力を入れたことはなんですか？"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>ESの制限文字数:</label>
          <input
            type="number"
            value={charLimit}
            onChange={(e) => setCharLimit(Number(e.target.value))}
            className={styles.input}
            placeholder="400"
            min="0"
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
      </form>
    </div>
  );
}
