// // src/App.jsx
// import React, { useState,useRef } from 'react';
// import './App.css';
// import { 
//   BrainCircuit, Plus, Send, Sparkles, Activity, GraduationCap,
//   ChevronRight, Cpu, Github 
// } from 'lucide-react';
// import { Button, IconButton, Badge } from '@mui/material';

// function App() {
//   const [inputText, setInputText] = useState('');
//   const [messages, setMessages] = useState([
//     { role: 'bot', text: 'This is VectoRAG. Please upload a scanned PDF to begin contextual mapping.' }
//   ]);

//   const [status, setStatus] = useState('IDLE');
// const [isLoading, setIsLoading] = useState(false);
// const fileInputRef = useRef(null);

//   // inside App.jsx

// const handleFileUpload = async (event) => {
//   const files = event.target.files;
//   if (!files.length) return;

//   setStatus('PROCESSING');
//   const formData = new FormData();
//   // Loop to support multiple PDF uploads
//   for (let i = 0; i < files.length; i++) {
//     formData.append("files", files[i]);
//   }

//   try {
//     const response = await fetch("http://localhost:8000/ingest", {
//       method: "POST",
//       body: formData,
//     });
//     const data = await response.json();
//     if (data.status === "READY") {
//       setStatus('READY');
//       setMessages(prev => [...prev, { role: 'bot', text: `Intelligence engine synchronized with ${data.count} documents.` }]);
//     }
//   } catch (error) {
//     setStatus('ERROR');
//     console.error("Connection to VectoRAG Backend failed:", error);
//   }
// };

// // const handleSend = async () => {
// //   if (!inputText.trim()) return;
// //   const userMsg = { role: 'user', text: inputText };
// //   setMessages(prev => [...prev, userMsg]);
// //   setInputText('');
// //   setIsLoading(true);

// //   const formData = new FormData();
// //   formData.append("query", inputText);

// //   try {
// //     const response = await fetch("http://localhost:8000/query", {
// //       method: "POST",
// //       body: formData,
// //     });
// //     const data = await response.json();
// //     // Assuming backend returns { "answer": "..." }
// //     setMessages(prev => [...prev, { role: 'bot', text: data.answer }]);
// //   } catch (error) {
// //     setMessages(prev => [...prev, { role: 'bot', text: "Engine timeout. Verify FastAPI is running." }]);
// //   } finally {
// //     setIsLoading(false);
// //   }
// // };
// // src/App.jsx - Structural Update

// const handleSend = async () => {
//   if (!inputText.trim()) return;
  
//   // Capture current time for the user message
//   const userMsg = { 
//     role: 'user', 
//     text: inputText, 
//     timestamp: Date.now() // Auto-generate current time
//   };
  
//   setMessages(prev => [...prev, userMsg]);
//   setInputText('');
//   setIsLoading(true);

//   try {
//     const response = await fetch("http://localhost:8000/query", {
//       method: "POST",
//       body: new URLSearchParams({ 'query': inputText })
//     });
//     const data = await response.json();
    
//     // Auto-generate current time for the bot message
//     setMessages(prev => [...prev, { 
//       role: 'bot', 
//       text: data.answer, 
//       timestamp: Date.now() 
//     }]);
//   } catch (error) {
//     setMessages(prev => [...prev, { 
//       role: 'bot', 
//       text: "Engine timeout.", 
//       timestamp: Date.now() 
//     }]);
//   } finally {
//     setIsLoading(false);
//   }
// };


// // return (
// //     <div className="main-container">
// //       {/* SIDEBAR: 30% Fixed Width */}
// //       <aside className="sidebar">
// //         <div className="sidebar-header">
// //           <div className="logo-box">
// //             <Activity size={22} color="white" />
// //           </div>
// //           <div>
// //             <h1 className="brand-name">VectoRAG</h1>
// //             <div className="status-row">
// //               <span className="standby-dot"></span>
// //               <span className="status-label">STANDBY</span>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="sidebar-content">
// //           <div className="sidebar-section">
// //             <p className="section-label">DOCUMENT STATUS</p>
// //             {/* Dynamic Card: Changes color and text based on backend state */}
// //             <div className={`status-card ${status === 'READY' ? 'ready' : 'idle'}`}>
// //               <Cpu 
// //                 size={36} 
// //                 className={`status-icon ${status === 'PROCESSING' ? 'spin' : ''}`}
// //                 color={status === 'READY' ? '#22c55e' : '#475569'} 
// //               />
// //               <p className={`card-text ${status === 'READY' ? 'ready' : ''}`}>
// //                 {status === 'READY' ? 'PIPELINE ACTIVE' : status === 'PROCESSING' ? 'ANALYZING...' : 'IDLE PIPELINE'}
// //               </p>
// //             </div>
// //           </div>

// //           <div className="sidebar-section">
// //             <p className="section-label">OPERATIONAL CONTROLS</p>
// //             {/* Functional Ingest Button */}
// //             <div className="control-btn ingest" onClick={() => fileInputRef.current.click()}>
// //               <div className="btn-left">
// //                 <Plus size={18} color="#3b82f6" />
// //                 <span>INGEST PDF</span>
// //               </div>
// //               <ChevronRight size={14} className="chevron" />
// //             </div>

// //             {/* Disabled Assessment Button */}
// //             <div className="control-btn disabled">
// //               <div className="btn-left">
// //                 <GraduationCap size={18} color="#475569" />
// //                 <span>KNOWLEDGE ASSESSMENT</span>
// //               </div>
// //               <ChevronRight size={14} className="chevron" />
// //             </div>
// //           </div>
// //         </div>

// //         <div className="sidebar-footer">
// //           <span className="version-tag">v1.2.0-CORE</span>
// //           <Github size={14} color="#475569" />
// //         </div>
// //       </aside>

// //       {/* CHAT AREA: Flexible Remaining Width */}
// //       <main className="chat-window">
// //         <header className="header">
// //           <h3 className="header-title">Hybrid Intelligence Environment</h3>
// //           <div className="context-badge">
// //             <Sparkles size={12} color="#60a5fa" />
// //             <span>CONTEXT INJECTED</span>
// //           </div>
// //         </header>

// //         <div className="messages-container">
// //           {messages.map((msg, i) => (
// //             <div key={i} className={`message-row ${msg.role}`}>
// //               {/* Bot Avatar rendered only for assistant messages */}
// //               {msg.role === 'bot' && (
// //                 <div className="bot-icon-wrapper">
// //                   <Activity size={20} color="white" />
// //                 </div>
// //               )}
// //               <div className="message-content">
// //                 <div className={`bubble ${msg.role}`}>{msg.text}</div>
// //                 {/* Meta data with auto-timestamp and styling dot */}
// //                 <div className="msg-meta">
// //                   <span className="meta-dot"></span>
// //                   {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //           {isLoading && (
// //             <div className="message-row bot loading">
// //               <div className="bot-icon-wrapper">
// //                 <Activity size={20} color="white" className="spin" />
// //               </div>
// //               <span className="loading-text">Synthesizing response...</span>
// //             </div>
// //           )}
// //         </div>

// //         {/* Action Bar with Glassmorphism Box */}
// //         <div className="input-area">
// //           <div className="glass-input-box">
// //             <IconButton className="plus-btn" onClick={() => fileInputRef.current.click()}>
// //               <Plus size={22} color="#64748b" />
// //             </IconButton>
// //             <input 
// //               placeholder="Provide a context document to start queries..." 
// //               value={inputText}
// //               onChange={(e) => setInputText(e.target.value)}
// //               onKeyDown={(e) => e.key === 'Enter' && handleSend()}
// //             />
// //             <IconButton 
// //               className="send-btn" 
// //               onClick={handleSend} 
// //               disabled={!inputText.trim() || isLoading}
// //             >
// //               <Send size={18} color="white" />
// //             </IconButton>
// //           </div>
// //           <p className="footer-label">GROUNDED INTELLIGENCE PIPELINE • ADAPTIVE CONTEXT RETRIEVAL</p>
// //         </div>
// //       </main>

// //       {/* Hidden File Input linked via useRef */}
// //       <input 
// //         type="file" 
// //         hidden 
// //         ref={fileInputRef} 
// //         onChange={handleFileUpload} 
// //         multiple 
// //         accept="application/pdf" 
// //       />
// //     </div>
// //   );

// // return (
// //   <div className="main-container">
// //     {/* SIDEBAR */}
// //     <aside className="sidebar">
// //       <div className="sidebar-header">
// //         <div className="logo-box">
// //           <Activity size={22} color="white" />
// //         </div>
// //         <div>
// //           <h1 className="brand-name">VectoRAG</h1>
// //           <div className="status-row">
// //             <span className="standby-dot"></span>
// //             <span className="status-label">STANDBY</span>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="sidebar-section">
// //         <p className="section-label">DOCUMENT STATUS</p>
// //         <div className={`status-card ${status === 'READY' ? 'ready' : 'idle'}`}>
// //           <Cpu size={36} className="status-icon" />
// //           <p className="card-text">{status === 'READY' ? 'PIPELINE ACTIVE' : 'IDLE PIPELINE'}</p>
// //         </div>
// //       </div>

// //       <div className="sidebar-section">
// //         <p className="section-label">OPERATIONAL CONTROLS</p>
// //         <div className="control-btn ingest" onClick={() => fileInputRef.current.click()}>
// //           <div className="btn-left">
// //             <Plus size={18} color="#3b82f6" />
// //             <span>INGEST PDF</span>
// //           </div>
// //           <ChevronRight size={14} className="chevron" />
// //         </div>
// //         <div className="control-btn disabled">
// //           <div className="btn-left">
// //             <GraduationCap size={18} />
// //             <span>KNOWLEDGE ASSESSMENT</span>
// //           </div>
// //           <ChevronRight size={14} className="chevron" />
// //         </div>
// //       </div>

// //       <div className="sidebar-footer">
// //         <span>v1.2.0-CORE</span>
// //         <Github size={14} />
// //       </div>
// //     </aside>

// //     {/* CHAT AREA */}
// //     <main className="chat-window">
// //       <header className="header">
// //         <h3 className="header-title">Hybrid Intelligence Environment</h3>
// //         <div className="context-badge">
// //           <Sparkles size={12} color="#60a5fa" />
// //           <span>CONTEXT INJECTED</span>
// //         </div>
// //       </header>

// //       <div className="messages-container">
// //         {messages.map((msg, i) => (
// //           <div key={i} className={`message-row ${msg.role}`}>
// //             {msg.role === 'bot' && (
// //               <div className="bot-icon-wrapper">
// //                 <Activity size={20} color="white" />
// //               </div>
// //             )}
// //             <div className="message-content">
// //               <div className="bubble">{msg.text}</div>
// //               <div className="msg-meta">
// //                 <span className="meta-dot"></span>
// //                 {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       <div className="input-area">
// //         <div className="glass-input-box">
// //           <IconButton className="plus-btn" onClick={() => fileInputRef.current.click()}>
// //             <Plus size={22} color="#64748b" />
// //           </IconButton>
// //           <input 
// //             placeholder="Provide a context document to start queries..." 
// //             value={inputText}
// //             onChange={(e) => setInputText(e.target.value)}
// //             onKeyDown={(e) => e.key === 'Enter' && handleSend()}
// //           />
// //           <IconButton className="send-btn" onClick={handleSend} disabled={!inputText.trim()}>
// //             <Send size={18} color="white" />
// //           </IconButton>
// //         </div>
// //         <p className="footer-label">GROUNDED INTELLIGENCE PIPELINE • ADAPTIVE CONTEXT RETRIEVAL</p>
// //       </div>
// //     </main>

// //     <input type="file" hidden ref={fileInputRef} onChange={handleFileUpload} multiple accept="application/pdf" />
// //   </div>
// // );



// // return (
// //   <div className="main-container">
// //     {/* LEFT SIDEBAR */}
// //     <aside className="sidebar">
// //       {/* 1. MISSING LOGO & BRANDING */}
// //       <div className="sidebar-header">
// //         <div className="logo-box">
// //           <Activity size={24} color="white" />
// //         </div>
// //         <div className="brand-info">
// //           <h1 className="brand-name">VectoRAG</h1>
// //           <div className="status-indicator">
// //             <span className="dot standby"></span>
// //             <span className="status-text">STANDBY</span>
// //           </div>
// //         </div>
// //       </div>

// //       {/* 2. MISSING DOCUMENT STATUS SECTION */}
// //       <div className="sidebar-section">
// //         <p className="section-label">DOCUMENT STATUS</p>
// //         <div className="status-card idle">
// //           <Cpu size={32} className="status-icon" />
// //           <p className="card-status-text">IDLE PIPELINE</p>
// //         </div>
// //       </div>

// //       {/* 3. MISSING OPERATIONAL CONTROLS & KNOWLEDGE ASSESSMENT */}
// //       <div className="sidebar-section">
// //         <p className="section-label">OPERATIONAL CONTROLS</p>
// //         <div className="control-button ingest" onClick={() => fileInputRef.current.click()}>
// //           <div className="button-content">
// //             <Plus size={18} color="#3b82f6" />
// //             <span>INGEST PDF</span>
// //           </div>
// //           <ChevronRight size={14} className="chevron" />
// //         </div>

// //         <div className="control-button disabled">
// //           <div className="button-content">
// //             <GraduationCap size={18} />
// //             <span>KNOWLEDGE ASSESSMENT</span>
// //           </div>
// //           <ChevronRight size={14} className="chevron" />
// //         </div>
// //       </div>

// //       <div className="sidebar-footer">
// //         <span>v1.2.0-CORE</span>
// //         <Github size={16} />
// //       </div>
// //     </aside>

// //     {/* RIGHT MAIN AREA */}
// //     <main className="chat-window">
// //       <header className="header">
// //         <h3 className="env-title">Hybrid Intelligence Environment</h3>
// //         <div className="context-badge">
// //           <Sparkles size={14} color="#60a5fa" />
// //           <span>CONTEXT INJECTED</span>
// //         </div>
// //       </header>

// //       {/* 4. MISSING BOT ICON & TIMESTAMP IN FEED */}
// //       <div className="messages-container">
// //         {messages.map((msg, i) => (
// //           <div key={i} className={`message-wrapper ${msg.role}`}>
// //             {msg.role === 'bot' && (
// //               <div className="bot-avatar">
// //                 <Activity size={20} color="white" />
// //               </div>
// //             )}
// //             <div className="message-bubble">
// //               {msg.text}
// //               {/* 5. MISSING TIMESTAMP */}
// //               <div className="timestamp">
// //                 <span className="dot"></span>
// //                 {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* 6. MISSING PLUS ICON IN INPUT BOX */}
// //       <div className="input-area">
// //         <div className="glass-input-wrapper">
// //           <IconButton className="attach-btn" onClick={() => fileInputRef.current.click()}>
// //             <Plus size={24} color="#64748b" />
// //           </IconButton>
// //           <input 
// //             placeholder="Provide a context document to start queries..." 
// //             value={inputText}
// //             onChange={(e) => setInputText(e.target.value)}
// //           />
// //           <IconButton className="send-btn" onClick={handleSend}>
// //             <Send size={18} color="white" />
// //           </IconButton>
// //         </div>
// //         <p className="footer-tagline">GROUNDED INTELLIGENCE PIPELINE • ADAPTIVE CONTEXT RETRIEVAL</p>
// //       </div>
// //     </main>

// //     <input type="file" hidden ref={fileInputRef} onChange={handleFileUpload} multiple accept="application/pdf" />
// //   </div>
// // );





//   return (
//     <div className="main-container">
//       {/* Sidebar */}
//       {/* <aside className="sidebar">
//         <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '50px' }}>
//           <div style={{ padding: '10px', background: '#3b82f6', borderRadius: '12px' }}>
//             <BrainCircuit color="white" size={24} />
//           </div>
//           <h2 style={{ margin: 0, fontSize: '20px' }}>VectoRAG</h2>
//         </div>

//         <div style={{ flex: 1 }}>
//           <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', letterSpacing: '1px' }}>DOCUMENT STATUS</p>
//           <div style={{ background: '#0c111b', padding: '30px', borderRadius: '20px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '30px' }}>
//             <Cpu color="#475569" size={40} style={{ marginBottom: '15px' }} />
//             <p style={{ fontSize: '10px', fontWeight: '900', color: '#64748b' }}>IDLE PIPELINE</p>
//           </div>

//           <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', letterSpacing: '1px' }}>OPERATIONAL CONTROLS</p>
//           <Button 
//             fullWidth 
//             style={{ justifyContent: 'space-between', padding: '15px', background: '#111724', color: 'white', borderRadius: '12px', marginBottom: '10px' }}
//             endIcon={<ChevronRight size={16} />}
//           >
//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <Plus size={18} color="#3b82f6" /> INGEST PDF
//             </div>
//           </Button>
//         </div>

//         <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', opacity: 0.5 }}>
//           <span style={{ fontSize: '10px' }}>v1.2.0-CORE</span>
//           <Github size={16} />
//         </div>
//       </aside> */}
//       <aside className="sidebar">
//   {/* ... branding ... */}
//   <div className={`status-card ${status === 'READY' ? 'ready' : ''}`}>
//     <Cpu color={status === 'READY' ? '#22c55e' : '#475569'} size={40} className={status === 'PROCESSING' ? 'spin' : ''} />
//     <p className={`status-text ${status === 'READY' ? 'ready' : ''}`}>
//       {status === 'READY' ? 'PIPELINE ACTIVE' : status === 'PROCESSING' ? 'ANALYZING...' : 'IDLE PIPELINE'}
//     </p>
//   </div>

//   <Button 
//     onClick={() => fileInputRef.current.click()} // Surgical Link
//     className="control-button"
//     fullWidth 
//   >
//     <Plus size={18} color="#3b82f6" /> INGEST PDF
//   </Button>
  
//   <input 
//     type="file" 
//     hidden 
//     ref={fileInputRef} 
//     onChange={handleFileUpload} 
//     multiple 
//     accept="application/pdf" 
//   />
// </aside>

//       {/* Main Content */}
//       <main className="chat-window">
//         <header className="header">
//           <h3 style={{ fontSize: '14px', margin: 0 }}>Hybrid Intelligence Environment</h3>
//           <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '5px 15px', borderRadius: '20px', border: '1px solid rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
//             <Sparkles size={14} color="#60a5fa" />
//             <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#60a5fa' }}>CONTEXT INJECTED</span>
//           </div>
//         </header>

//         <div className="messages-container">
//           {messages.map((msg, i) => (
//             <div key={i} style={{ 
//               alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
//               background: msg.role === 'user' ? '#3b82f6' : '#11141b',
//               padding: '15px 25px',
//               borderRadius: '24px',
//               maxWidth: '70%',
//               boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
//             }}>
//               {msg.text}
//             </div>
//           ))}
//         </div>

//         <div className="input-area">
//           <div className="glass-input-wrapper">
//             <input 
//               type="text" 
//               placeholder="Provide a context document to start queries..." 
//               value={inputText}
//               onChange={(e) => setInputText(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//             />
//             <IconButton onClick={handleSend} style={{ background: '#3b82f6', color: 'white' }}>
//               <Send size={18} />
//             </IconButton>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;


// src/App.jsx
import React, { useState, useRef } from "react";
import "./App.css";
import {
  Activity,
  Plus,
  Send,
  Sparkles,
  Cpu,
  GraduationCap,
  ChevronRight,
  Github,
  FileText
} from "lucide-react";
import { IconButton } from "@mui/material";

function App() {
  /* ---------------- STATE ---------------- */
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "This is VectoRAG. Please upload a scanned PDF to begin contextual mapping.",
      timestamp: Date.now()
    }
  ]);

  const [sessionStatus, setSessionStatus] = useState("STANDBY"); // STANDBY | READY
  const [pipelineStatus, setPipelineStatus] = useState("IDLE"); // IDLE | PROCESSING | READY
  const [documentName, setDocumentName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Quiz Specific State
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [quizLoading, setQuizLoading] = useState(false);

  const fileInputRef = useRef(null);

  /* ---------------- HELPERS ---------------- */
  const activateSession = () => {
    if (sessionStatus === "STANDBY") {
      setSessionStatus("READY");
    }
  };

  /* ---------------- FILE INGEST ---------------- */
  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    activateSession();
    setPipelineStatus("PROCESSING");

    const formData = new FormData();
    formData.append("files", files[0]);

    try {
      // FIX: Use 127.0.0.1 to avoid localhost resolution issues
      const res = await fetch("http://127.0.0.1:8000/ingest", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (data.status === "READY") {
        setPipelineStatus("READY");
        setDocumentName(files[0].name);

        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: `Document ${files[0].name} processed successfully. The knowledge base is now active.`,
            timestamp: Date.now()
          }
        ]);
      }
    } catch (err) {
      console.error("Ingestion failed:", err);
      setPipelineStatus("IDLE");
    }
  };

  /* ---------------- QUIZ LOGIC ---------------- */
  const handleStartQuiz = async () => {
    setIsQuizOpen(true);
    setQuizLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/generate_quiz", {
        method: "POST"
      });
      const data = await res.json();
      // data might be a string if coming directly from Gemini's text output
      const parsedQuiz = typeof data === 'string' ? JSON.parse(data) : data.quiz || data;
      setQuizData(parsedQuiz);
    } catch (err) {
      console.error("Quiz generation failed:", err);
    } finally {
      setQuizLoading(false);
    }
  };

  /* ---------------- SEND QUERY ---------------- */
  const handleSend = async () => {
    if (!inputText.trim()) return;

    activateSession();
    const userMsg = { role: "user", text: inputText, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/query", {
        method: "POST",
        body: new URLSearchParams({ query: userMsg.text })
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.answer, timestamp: Date.now() }
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Engine timeout. Verify backend connection.", timestamp: Date.now() }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------------- MODAL COMPONENT ---------------- */
  const QuizModal = () => (
    <div className="modal-overlay">
      <div className="quiz-modal">
        <div className="modal-header">
          <h2>Knowledge Assessment</h2>
          <IconButton onClick={() => setIsQuizOpen(false)} style={{ color: 'white' }}>
            <Plus size={20} style={{ transform: 'rotate(45deg)' }} />
          </IconButton>
        </div>
        
        {quizLoading ? (
          <div className="quiz-loader">
            <Activity className="spin" size={40} />
            <p>Analyzing document context...</p>
          </div>
        ) : (
          <div className="quiz-content">
            {quizData.map((q, idx) => (
              <div key={idx} className="quiz-q-box">
                <p className="q-text">{q.question}</p>
                <div className="options-grid">
                  {q.options.map((opt) => (
                    <button key={opt} className="opt-btn">{opt}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="main-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-box"><Activity color="white" size={22} /></div>
          <div>
            <h1 className="brand-name">VectoRAG</h1>
            <div className="header-status-row">
              <span className={`header-dot ${sessionStatus === "READY" ? "ready" : "standby"}`} />
              <span className="header-status-text">{sessionStatus}</span>
            </div>
          </div>
        </div>

        <p className="section-label">DOCUMENT STATUS</p>
        <div className={`status-card ${pipelineStatus === "READY" ? "ready" : ""}`}>
          {pipelineStatus === "READY" && documentName ? (
            <div className="processed-state">
              <div className="doc-info">
                <div className="doc-icon-box"><FileText size={16} color="#3b82f6" /></div>
                <p className="doc-name">{documentName}</p>
              </div>
              <div className="ready-indicator"><span className="header-dot ready" /> SYSTEM READY</div>
            </div>
          ) : (
            <>
              <Cpu size={36} color={pipelineStatus === "PROCESSING" ? "#3b82f6" : "#475569"} className={pipelineStatus === "PROCESSING" ? "spin" : ""} />
              <p className="status-text">{pipelineStatus === "PROCESSING" ? "ANALYZING..." : "IDLE PIPELINE"}</p>
            </>
          )}
        </div>

        <p className="section-label">OPERATIONAL CONTROLS</p>
        <div className="control-button ingest" onClick={() => fileInputRef.current.click()}>
          <div className="btn-left"><Plus size={18} color="#3b82f6" /><span>INGEST PDF</span></div>
          <ChevronRight size={14} />
        </div>

        <div 
          className={`control-button ${pipelineStatus === 'READY' ? 'active' : 'disabled'}`}
          onClick={() => pipelineStatus === 'READY' && handleStartQuiz()}
          style={{ opacity: pipelineStatus === 'READY' ? 1 : 0.4, cursor: pipelineStatus === 'READY' ? 'pointer' : 'not-allowed' }}
        >
          <div className="btn-left">
            <GraduationCap size={18} color={pipelineStatus === 'READY' ? "#a855f7" : "#475569"} />
            <span>KNOWLEDGE ASSESSMENT</span>
          </div>
          <ChevronRight size={14} className="chevron" />
        </div>
      </aside>

      <main className="chat-window">
        <header className="header">
          <div>
            <h3>Hybrid Intelligence Environment</h3>
            <div className="header-status-row">
              <span className={`header-dot ${sessionStatus === "READY" ? "ready" : "standby"}`} />
              <span className="header-status-text">{sessionStatus}</span>
            </div>
          </div>
          
        </header>

        <div className="messages-container">
          {messages.map((m, i) => (
            <div key={i} className={`message-row ${m.role}`}>
              {m.role === "bot" && <div className="bot-icon-wrapper"><Activity size={18} color="white" /></div>}
              <div>
                <div className="bubble">{m.text}</div>
                <div className="msg-meta">
                  <span className="meta-dot" />
                  {new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- UPDATED INPUT AREA SECTION --- */}
<div className="input-area">
  <div className="glass-input-wrapper">
    {/* Far Left: Plus icon triggers the hidden file input */}
    <IconButton 
      onClick={() => fileInputRef.current.click()}
      style={{ padding: '8px' }}
    >
      <Plus size={22} color="#64748b" />
    </IconButton>
    
    {/* Middle: Text input with the updated placeholder */}
    <input 
      value={inputText} 
      onChange={(e) => setInputText(e.target.value)} 
      onKeyDown={(e) => e.key === "Enter" && handleSend()} 
      placeholder="Ask anything about the document..." 
    />
    
    {/* Far Right: Send button with dynamic active styling */}
    <IconButton 
      onClick={handleSend} 
      disabled={isLoading || !inputText.trim()}
      className={inputText.trim() ? "send-btn-active" : ""}
    >
      <Send 
        size={18} 
        color={inputText.trim() ? "white" : "#475569"} 
      />
    </IconButton>
  </div>
  
  {/* Professional Footer Label */}
  <p className="footer-label">
    GROUNDED INTELLIGENCE PIPELINE • ADAPTIVE CONTEXT RETRIEVAL
  </p>
</div>
      </main>

      {isQuizOpen && <QuizModal />}
      <input type="file" hidden ref={fileInputRef} onChange={handleFileUpload} accept="application/pdf" />
    </div>
  );
}

export default App;