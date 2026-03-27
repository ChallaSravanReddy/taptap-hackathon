import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Send, Activity, ShieldCheck, ShieldAlert, Cpu, Database, LayoutGrid } from 'lucide-react';
import PythonEngine from '../engine/PythonEngine';
import challengesData from '../data/coding_challenges.json';
import Pet from './Pet';

const SurvivalMode = ({ onGameOver, onIntensityChange }) => {
    const [challenges, setChallenges] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [timer, setTimer] = useState(600); // 10 minutes
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('SYSTEM_INIT_COMPLETE // WAITING_FOR_INPUT');
    const [outputType, setOutputType] = useState('info'); // info, success, error
    const [isEngineReady, setIsEngineReady] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [isCompiling, setIsCompiling] = useState(false);

    useEffect(() => {
        setChallenges([...challengesData].sort(() => Math.random() - 0.5));
        
        const check = setInterval(async () => {
             const ready = await PythonEngine.checkInitialization();
             if (ready) {
                setIsEngineReady(true);
                clearInterval(check);
             }
        }, 1000);
        return () => clearInterval(check);
    }, []);

    useEffect(() => {
        if (timer > 0) {
            const id = setInterval(() => setTimer(t => t - 1), 1000);
            return () => clearInterval(id);
        } else {
            onGameOver(Math.round((timer / 600) * 100));
        }
    }, [timer]);

    const runCode = async () => {
        if (!isEngineReady || isScanning) return;
        
        setIsScanning(true);
        setIsCompiling(true);
        setOutput('COMPILING_SOURCE_TREE...');
        
        const challenge = challenges[currentIdx];
        
        // Add a slight "compilation" delay for feel
        await new Promise(r => setTimeout(r, 1200));
        setIsCompiling(false);
        setOutput('EXECUTING_BIT_STREAM...');
        
        const result = await PythonEngine.evaluate(code, challenge.validate);
        
        // Add a slight "execution" processing time
        await new Promise(r => setTimeout(r, 800));
        setIsScanning(false);

        if (result.success) {
            setOutputType('success');
            setOutput(`SUCCESS: ${result.message} // CORE_STABILIZED`);
            setTimer(t => Math.min(t + 45, 600));
            setTimeout(nextChallenge, 2500);
        } else {
            setOutputType('error');
            setOutput(`FATAL_ERROR: ${result.message} // INTEGRITY_CRITICAL`);
            setTimer(t => Math.max(t - 60, 0));
            if (onIntensityChange) onIntensityChange();
        }
    };

    const nextChallenge = () => {
        setOutputType('info');
        setOutput('SEQUENCER_RELOADED // READY');
        setCode('');
        if (currentIdx + 1 >= challenges.length) {
            setChallenges([...challengesData].sort(() => Math.random() - 0.5));
            setCurrentIdx(0);
        } else {
            setCurrentIdx(i => i + 1);
        }
    };

    const petState = timer > 400 ? 'healthy' : timer > 120 ? 'warning' : 'critical';
    const challenge = challenges[currentIdx];

    const mins = Math.floor(timer / 60);
    const secs = timer % 60;

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ width: '100%', maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', zIndex: 5 }}
        >
            {/* Top Stat HUD */}
            <div className="grid-3col">
                <div className="g-panel" style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ color: 'var(--cyan)', opacity: 0.6 }}><Cpu size={18} /></div>
                    <div>
                        <div className="hud-label">Link Status</div>
                        <div className={isEngineReady ? 'hud-value-good' : 'hud-value-crit'} style={{ fontSize: '0.9rem' }}>
                            {isEngineReady ? 'STABLE' : 'CONNECTING...'}
                        </div>
                    </div>
                </div>

                <div className="g-panel" style={{ padding: '0.75rem 2rem', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '0.5rem', marginBottom: 4 }}>
                        <div className="hud-label" style={{ fontSize: '0.6rem' }}>CORE LIFE SUPPORT TIMER</div>
                        <div style={{ fontFamily: 'var(--font-hud)', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#fff' }}>
                            {mins}<span className="cursor-blink" style={{ width: 1, height: '0.8em', margin: '0 2px' }}>:</span>{secs.toString().padStart(2, '0')}
                        </div>
                    </div>
                    <div className="progress-bar-track" style={{ height: 4 }}>
                        <motion.div 
                            className={`progress-bar-fill ${petState === 'warning' ? 'progress-bar-fill-warn' : petState === 'critical' ? 'progress-bar-fill-crit' : ''}`}
                            animate={{ width: `${(timer / 600) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="g-panel" style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div className="hud-label">Memory Buffer</div>
                        <div className="hud-value" style={{ fontSize: '0.9rem' }}>
                           DRAM_LINK_0x8{Math.floor(Math.random()*9)}
                        </div>
                    </div>
                    <div style={{ color: 'var(--cyan)', opacity: 0.6 }}><Database size={18} /></div>
                </div>
            </div>

            {/* Main Game Area */}
            <div className="grid-survival" style={{ minHeight: 640 }}>
                
                {/* Left: Life Monitor Panel */}
                <div className="g-panel g-panel-corner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', position: 'relative', overflow: 'hidden' }}>
                    
                    {/* Background grid accent */}
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,240,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px', pointerEvents: 'none' }} />

                    <div style={{ position: 'absolute', top: 16, left: 16, padding: '4px 10px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border)', borderRadius: 0, clipPath: 'polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)', backdropFilter: 'blur(4px)' }}>
                        <div className="hud-label" style={{ fontSize: '0.5rem' }}>Avatar_Node_4</div>
                    </div>
                    
                    <Pet state={petState} />

                    <div style={{ marginTop: '3.5rem', width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                <div className="hud-label" style={{ fontSize: '0.55rem' }}>INTEGRITY LEVEL</div>
                                <div className="hud-label" style={{ fontSize: '0.55rem' }}>{Math.round((timer/600)*100)}%</div>
                            </div>
                            <div className="progress-bar-track">
                                <motion.div 
                                    className="progress-bar-fill"
                                    animate={{ width: `${(timer/600)*100}%` }}
                                    style={{ background: petState === 'critical' ? 'var(--red)' : '' }}
                                />
                            </div>
                        </div>

                        <div className="g-panel" style={{ background: 'rgba(255,255,255,0.01)', padding: '1rem', border: '1px solid rgba(255,255,255,0.02)' }}>
                           <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                               <Activity size={14} style={{ color: 'var(--cyan)', opacity: 0.4 }} />
                               <div className="hud-label" style={{ fontSize: '0.5rem', letterSpacing: '0.15em' }}>Biometric Readout: {petState.toUpperCase()}</div>
                           </div>
                           <div style={{ display: 'flex', gap: 12 }}>
                               <ShieldCheck size={14} style={{ color: 'var(--green)', opacity: 0.4 }} />
                               <div className="hud-label" style={{ fontSize: '0.5rem', letterSpacing: '0.15em' }}>Encryption: 256-BIT_RSA</div>
                           </div>
                        </div>
                    </div>
                </div>

                {/* Right: Code Terminal Panel */}
                <div className="terminal-window" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="terminal-title-bar">
                        <div className="terminal-dot" style={{ background: '#ff5f56' }} />
                        <div className="terminal-dot" style={{ background: '#ffbd2e' }} />
                        <div className="terminal-dot" style={{ background: '#27c93f' }} />
                        <span className="mono" style={{ fontSize: '0.6rem', color: 'var(--dim)', marginLeft: '1rem', letterSpacing: '0.1em' }}>
                           CORE_COMPREHENSION_UNIT_v4.2 // SESSION: {Math.random().toString(16).slice(2,8).toUpperCase()}
                        </span>
                    </div>

                    <div style={{ padding: '2.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        
                        <div style={{ marginBottom: '2rem' }}>
                           <div className="hud-label" style={{ color: 'var(--cyan)', opacity: 0.5, marginBottom: '0.5rem' }}>Mission_Objective: Solve the Logic Paradox</div>
                           <h2 style={{ fontSize: '1.25rem', fontWeight: 500, lineHeight: 1.6, color: '#fff' }}>
                               Deploy a Python algorithm to: <span dangerouslySetInnerHTML={{ __html: challenge?.description || 'INITIALIZING_CHALLENGE...' }} />
                           </h2>
                        </div>

                        <div style={{ flex: 1, position: 'relative', background: 'rgba(2,6,23,0.8)', borderRadius: 0, border: '1px solid rgba(0,240,255,0.1)', overflow: 'hidden', boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)' }}>
                            <div className="crt-overlay" style={{ opacity: 0.15 }} />
                            {isScanning && <div className="scanline" style={{ top: '0%', animation: 'scanMove 2s linear infinite', height: '10vh' }} />}
                            <textarea
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                spellCheck="false"
                                className="mono"
                                style={{
                                    width: '100%', height: '100%', padding: '1.5rem',
                                    background: 'transparent', color: '#38bdf8', // Brighter cyan for code
                                    border: 'none', outline: 'none', resize: 'none',
                                    fontSize: '0.95rem', lineHeight: '1.7',
                                    opacity: isScanning ? 0.6 : 1, transition: 'opacity 0.2s',
                                    textShadow: '0 0 5px rgba(56,189,248,0.5)',
                                    position: 'relative', zIndex: 5
                                }}
                                placeholder="# Initialize Python Script..."
                            />
                            <div style={{ position: 'absolute', bottom: 12, right: 12, opacity: 0.2, color: 'var(--cyan)' }}>
                                <LayoutGrid size={20} />
                            </div>
                        </div>

                        {/* Terminal Output Output */}
                        <div className="mono" style={{ 
                            marginTop: '1.5rem', padding: '1.25rem',
                            borderRadius: '0.75rem', fontSize: '0.75rem',
                            background: outputType === 'success' ? 'rgba(0,255,170,0.05)' : outputType === 'error' ? 'rgba(255,45,85,0.05)' : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${outputType === 'success' ? 'rgba(0,255,170,0.2)' : outputType === 'error' ? 'rgba(255,45,85,0.2)' : 'rgba(255,255,255,0.07)'}`,
                            color: outputType === 'success' ? 'var(--green)' : outputType === 'error' ? 'var(--red)' : 'var(--dim)',
                            display: 'flex', alignItems: 'center', gap: 12
                        }}>
                           <span style={{ opacity: 0.4 }}>{'>>>'}</span>
                           <span style={{ flex: 1 }}>{output}</span>
                           {isScanning && <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} style={{ fontSize: '1rem' }}>↻</motion.div>}
                        </div>

                        <motion.button 
                            className="g-btn-primary"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={!isEngineReady || isScanning}
                            onClick={runCode}
                            style={{ marginTop: '2rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}
                        >
                            <Send size={16} /> Execute Core Sequence
                        </motion.button>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes scanMove {
                    from { top: -2%; }
                    to   { top: 102%; }
                }
            `}</style>
        </motion.div>
    );
};

export default SurvivalMode;
