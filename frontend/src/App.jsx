import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello! I am **Aura Intel**. Upload a document and I will become its brain. What would you like to know?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setUploading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:5001/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'ai', text: `✅ **${selectedFile.name}** processed! I'm ready to answer questions about it.` }]);
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('Failed to connect to Intel Server');
    } finally {
      setUploading(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'ai', text: data.response }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: `❌ **Error:** ${data.error}` }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: '❌ Failed to connect to AI server.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="intel-bg"></div>
      
      <div className="intel-container">
        <header className="intel-header">
          <h1>AURA INTEL</h1>
          <div className="status-badge" style={{ fontSize: '0.7rem', opacity: 0.6 }}>SYSTEM ACTIVE</div>
        </header>

        <div className="upload-bar">
          <label className="file-input-label">
            {uploading ? 'PROCESSING...' : (file ? `REPLACE: ${file.name}` : 'UPLOAD DOCUMENT (PDF/TXT)')}
            <input type="file" hidden onChange={handleFileUpload} accept=".pdf,.txt,.js,.py,.md" />
          </label>
          <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>
            {file ? 'Document context loaded' : 'No document uploaded'}
          </span>
        </div>

        <div className="chat-window">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`message ${msg.role}`}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </motion.div>
            ))}
          </AnimatePresence>
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="message ai">
              Thinking...
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>

        <form className="input-area" onSubmit={handleSend}>
          <input 
            type="text" 
            placeholder={file ? "Ask anything about the document..." : "Upload a document first..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!file || loading}
          />
          <button className="send-btn" type="submit" disabled={!file || loading}>
            {loading ? '...' : 'SEND'}
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
