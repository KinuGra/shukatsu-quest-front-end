"use client";
import React, { useState, useEffect } from "react";

interface LevelUpNotificationProps {
    isOpen: boolean;
    onClose: () => void;
    currentLevel: number;
}

const LevelUpNotification: React.FC<LevelUpNotificationProps> = ({ isOpen, onClose, currentLevel }) => {
    const [progress, setProgress] = useState(0);
    const [nextLevel, setNextLevel] = useState(currentLevel + 1);

    useEffect(() => {
        if (isOpen) {
            setProgress(0);
            setNextLevel(currentLevel + 1);
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev < 100) {
                        return prev + 1;
                    } else {
                        clearInterval(interval);
                        return 100;
                    }
                });
            }, 30);
        }
    }, [isOpen, currentLevel]);

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
                position: 'relative',
            }}>
                <h2>レベルアップ</h2>
                <svg width="100" height="100" viewBox="0 0 36 36" style={{ margin: '20px auto' }}>
                    <path
                        style={{
                            fill: 'none',
                            stroke: '#d6d6d6',
                            strokeWidth: '2.8',
                        }}
                        d="M18 2.0845
                           a 15.9155 15.9155 0 0 1 0 31.831
                           a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                        style={{
                            fill: 'none',
                            stroke: '#007bff',
                            strokeWidth: '2.8',
                            strokeLinecap: 'round',
                            transition: 'stroke-dashoffset 0.3s',
                        }}
                        strokeDasharray="100, 100"
                        strokeDashoffset={100 - progress}
                        d="M18 2.0845
                           a 15.9155 15.9155 0 0 1 0 31.831
                           a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="20.35" style={{ fill: '#007bff', fontSize: '0.5em', textAnchor: 'middle' }}>
                        Lv {progress < 100 ? currentLevel : nextLevel}
                    </text>
                </svg>
                <p>おめでとうございます！レベルアップしました。</p>
                <button onClick={onClose} style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}>閉じる</button>
            </div>
        </div>
    );
};

export default LevelUpNotification;
