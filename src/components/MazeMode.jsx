import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Timer, Target, Zap, ChevronRight, Info, RotateCcw } from 'lucide-react';
import questionsData from '../data/questions.json';

const MazeMode = ({ onGameOver, onVictory, onIntensityChange }) => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [hearts, setHearts] = useState(3);
    const [timer, setTimer] = useState(30);
    const [isAnswered, setIsAnswered] = useState(false);
    const [selectedIdx, setSelectedIdx] = useState(null);
    const [textReveal, setTextReveal] = useState('');

    useEffect(() => {
        const shuffled = [...questionsData].sort(() => Math.random() - 0.5);
        setQuestions(shuffled);
    }, []);

    useEffect(() => {
        if (questions[currentIndex]) {
            let i = 0;
            const fullText = questions[currentIndex].question;
            setTextReveal('');
            const interval = setInterval(() => {
                setTextReveal(fullText.slice(0, i));
                i++;
                if (i > fullText.length) clearInterval(interval);
            }, 20);
            return () => clearInterval(interval);
        }
    }, [currentIndex, questions]);

    useEffect(() => {
        if (timer > 0 && !isAnswered) {
            const id = setInterval(() => setTimer(t => t - 1), 1000);
            return () => clearInterval(id);
        } else if (timer === 0 && !isAnswered) {
            handleTimeout();
        }
    }, [timer, isAnswered]);

    const handleTimeout = () => {
        setHearts(h => h - 1);
        if (onIntensityChange) onIntensityChange();
        nextQuestion();
    };

    const nextQuestion = () => {
        if (hearts <= 0) {
            onGameOver(score);
        } else if (currentIndex + 1 >= questions.length) {
            onVictory(score);
        } else {
            setIsAnswered(false);
            setSelectedIdx(null);
            setTimer(30);
            setCurrentIndex(i => i + 1);
        }
    };

    const checkAnswer = (idx) => {
        if (isAnswered) return;
        setIsAnswered(true);
        setSelectedIdx(idx);

        if (idx === questions[currentIndex].correct) {
            setScore(s => s + 10 + timer);
        } else {
            setHearts(h => h - 1);
            if (onIntensityChange) onIntensityChange();
        }

        setTimeout(nextQuestion, 1500);
    };

    const q = questions[currentIndex];
    if (!q) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                <RotateCcw size={32} color="var(--cyan)" />
            </motion.div>
        </div>
    );

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            style={{ width: '100%', maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 5 }}
        >
            {/* Top HUD Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="g-panel" style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ color: 'var(--cyan)', opacity: 0.6 }}><Target size={18} /></div>
                    <div>
                        <div className="hud-label">Sequence Score</div>
                        <div className="hud-value" style={{ fontSize: '1.25rem' }}>{score.toString().padStart(6, '0')}</div>
                    </div>
                </div>

                <div className="g-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderBottom: timer <= 5 ? '1px solid var(--red)' : '1px solid var(--border)' }}>
                    <div className="hud-label" style={{ marginBottom: 4 }}>Neural Link Timer</div>
                    <div className={timer <= 5 ? 'hud-value-crit' : 'hud-value'} style={{ fontSize: '1.5rem', fontFamily: 'var(--font-mono)' }}>
                        {timer.toString().padStart(2, '0')}<span style={{ fontSize: '0.8rem', opacity: 0.5, marginLeft: 2 }}>SEC</span>
                    </div>
                </div>

                <div className="g-panel" style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div className="hud-label">Core Integrity</div>
                        <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                            {[1, 2, 3].map(i => (
                                <motion.div
                                    key={i}
                                    animate={i <= hearts ? { opacity: 1, scale: 1 } : { opacity: 0.2, scale: 0.8 }}
                                    style={{ width: 14, height: 6, background: i <= hearts ? 'var(--cyan)' : 'var(--dim)', borderRadius: 1 }}
                                />
                            ))}
                        </div>
                    </div>
                    <div style={{ color: 'var(--cyan)', opacity: 0.6 }}><Shield size={18} /></div>
                </div>
            </div>

            {/* Progress HUD */}
            <div style={{ marginBottom: '2.5rem', padding: '0 0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div className="hud-label" style={{ fontSize: '0.5rem' }}>Sector Progress</div>
                    <div className="hud-label" style={{ fontSize: '0.5rem' }}>{currentIndex + 1} / {questions.length}</div>
                </div>
                <div className="progress-bar-track">
                    <motion.div 
                        className="progress-bar-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Main Question Display */}
            <AnimatePresence mode="wait">
                <motion.div 
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="g-panel g-panel-corner"
                    style={{ padding: '3.5rem', position: 'relative' }}
                >
                    {/* Background decoration */}
                    <div style={{ position: 'absolute', top: 0, left: 0, padding: '0.75rem', opacity: 0.1 }}>
                        <Info size={16} />
                    </div>

                    <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                        <span className="hud-label" style={{ color: 'var(--cyan)', opacity: 0.5, marginBottom: '1rem', display: 'block' }}> Incoming Data Stream // Sequence_{currentIndex + 1}</span>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 600, lineHeight: 1.4, color: '#fff', letterSpacing: '-0.01em' }}>
                            {textReveal}<span className="cursor-blink" />
                        </h2>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                        {q.options.map((opt, i) => {
                            const isCorrect = isAnswered && i === q.correct;
                            const isWrong = isAnswered && i === selectedIdx && i !== q.correct;
                            return (
                                <motion.button
                                    key={i}
                                    disabled={isAnswered}
                                    onClick={() => checkAnswer(i)}
                                    className={`choice-card ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                                    whileHover={!isAnswered ? { x: 8 } : {}}
                                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}
                                >
                                    <div style={{ 
                                        width: 28, height: 28, borderRadius: 4, 
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        background: isCorrect ? 'var(--green)' : isWrong ? 'var(--red)' : 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: (isCorrect || isWrong) ? '#000' : 'var(--cyan)'
                                    }}>
                                        {String.fromCharCode(65 + i)}
                                    </div>
                                    <span style={{ fontSize: '0.9rem', fontWeight: 500, color: (isCorrect || isWrong) ? '#fff' : 'var(--text)' }}>
                                        {opt}
                                    </span>
                                    
                                    {isCorrect && <motion.div layoutId="choice-active" style={{ position: 'absolute', inset: -1, border: '2px solid var(--green)', borderRadius: 'inherit', pointerEvents: 'none' }} />}
                                    {isWrong && <div style={{ position: 'absolute', inset: -1, border: '2px solid var(--red)', borderRadius: 'inherit', pointerEvents: 'none' }} />}
                                </motion.button>
                            );
                        })}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Bottom Tech Details */}
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '2rem', opacity: 0.3 }}>
                <div className="hud-label" style={{ fontSize: '0.5rem' }}>Link_Status: Encrypted</div>
                <div className="hud-label" style={{ fontSize: '0.5rem' }}>Buffer_Load: {Math.floor(Math.random() * 20 + 5)}%</div>
                <div className="hud-label" style={{ fontSize: '0.5rem' }}>IO_Sync: 0.04ms</div>
            </div>
        </motion.div>
    );
};

export default MazeMode;
