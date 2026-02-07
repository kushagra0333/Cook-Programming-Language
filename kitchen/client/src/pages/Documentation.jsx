
import React, { useState } from 'react';
import { CHEAT_SHEET } from '../utils/constants';
import { ArrowLeft } from 'lucide-react';

const Documentation = () => {
  const [selectedItem, setSelectedItem] = useState(CHEAT_SHEET[0]);
  const [isMobileListVisible, setIsMobileListVisible] = useState(true);

  // Helper to handle selection on mobile
  const handleSelect = (item) => {
    setSelectedItem(item);
    if (window.innerWidth < 768) {
        setIsMobileListVisible(false); // Hide list on mobile after selection
    }
  };

  return (
    <div className="docs-page" style={{ height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      
      <div className="docs-container" style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
        
        {/* Sidebar List */}
        <div 
            className={`docs-sidebar ${isMobileListVisible ? 'visible' : 'hidden'}`}
            style={{ 
                width: '300px', 
                borderRight: '1px solid var(--border-color)', 
                overflowY: 'auto', 
                background: 'var(--bg-secondary)',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
            <h3 style={{ margin: 0, color: 'var(--accent-primary)' }}>Cookbook</h3>
          </div>
          <div className="sidebar-list" style={{ padding: '1rem' }}>
            {CHEAT_SHEET.map((item, idx) => (
                <div 
                    key={idx} 
                    className={`sidebar-item ${selectedItem.cmd === item.cmd ? 'active' : ''}`}
                    onClick={() => handleSelect(item)}
                    style={{
                        padding: '12px 16px',
                        cursor: 'pointer',
                        borderRadius: '8px',
                        marginBottom: '8px',
                        backgroundColor: selectedItem.cmd === item.cmd ? 'var(--bg-tertiary)' : 'transparent',
                        color: selectedItem.cmd === item.cmd ? 'var(--text-primary)' : 'var(--text-secondary)',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}
                >
                    <span style={{ color: selectedItem.cmd === item.cmd ? 'var(--accent-primary)' : 'inherit' }}>{item.icon}</span>
                    <span style={{ fontWeight: 500 }}>{item.cmd}</span>
                </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div 
            className={`docs-content ${!isMobileListVisible ? 'visible' : ''}`}
            style={{ 
                flex: 1, 
                padding: '2rem', 
                overflowY: 'auto', 
                background: 'var(--bg-primary)',
                position: 'relative' 
            }}
        >
            {/* Back Button for Mobile */}
            <button 
                className="mobile-back-btn" 
                onClick={() => setIsMobileListVisible(true)}
                style={{ 
                    display: 'none', 
                    marginBottom: '1rem',
                    background: 'none',
                    border: 'none',
                    color: 'var(--accent-primary)',
                    cursor: 'pointer',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '1rem'
                }}
            >
                <ArrowLeft size={18} /> Back to Menu
            </button>

            <div className="doc-header" style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <div style={{ padding: '10px', background: 'var(--bg-tertiary)', borderRadius: '12px', color: 'var(--accent-primary)' }}>
                        {React.cloneElement(selectedItem.icon, { size: 32 })}
                    </div>
                    <h1 style={{ margin: 0, fontSize: '2.5rem', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {selectedItem.cmd}
                    </h1>
                </div>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                    {selectedItem.desc}
                </p>
            </div>

            <div className="doc-section">
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Ingredients (Syntax)</h3>
                <div className="code-block" style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', fontFamily: 'var(--font-mono)' }}>
                    <code style={{ whiteSpace: 'pre-wrap', color: 'var(--text-accent)' }}>
                        {selectedItem.ex}
                    </code>
                </div>
            </div>

             {/* Description Placeholders */}
            <div className="doc-section" style={{ marginTop: '2rem' }}>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Preparation</h3>
                <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                    The <strong>{selectedItem.cmd}</strong> command is an essential part of your cooking process. 
                    Use it wisely to ensure your code has the right flavor. Make sure to follow the syntax heavily, 
                    as the kitchen is strict about measurements!
                </p>
            </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
            .docs-sidebar {
                position: absolute;
                top: 0;
                left: 0;
                width: 100% !important;
                height: 100%;
                z-index: 10;
                display: none !important;
            }
            .docs-sidebar.visible {
                display: flex !important;
            }
            
            .docs-content {
                width: 100%;
            }
            .mobile-back-btn {
                display: flex !important;
            }
        }
      `}</style>
    </div>
  );
};

export default Documentation;
