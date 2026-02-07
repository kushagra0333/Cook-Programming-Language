
import React, { useState, useEffect } from "react";
import Split from "react-split";
import Editor from "@monaco-editor/react";
import axios from "axios";
import {
  Play,
  BookOpen,
  Terminal,
  Cpu,
  AlertCircle,
  Clock, // If needed
  Trash2, // If needed
} from "lucide-react";
import { DEFAULT_CODE } from "../utils/constants";

function Playground({ theme }) {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState("");
  const [assembly, setAssembly] = useState("");
  const [errors, setErrors] = useState("");
  const [activeTab, setActiveTab] = useState("output");
  const [status, setStatus] = useState("idle");
  const [direction, setDirection] = useState("horizontal");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDirection("vertical");
      } else {
        setDirection("horizontal");
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRun = async () => {
    setStatus("loading");
    setOutput("");
    setAssembly("");
    setErrors("");

    if (activeTab === "asm") setActiveTab("output");

    try {
      const response = await axios.post("/compile", { code });
      const data = response.data;

      if (data.success) {
        setStatus("success");
        setOutput(data.output || "No output (ghosted?).");
        setAssembly(data.assembly);
        setActiveTab("output");
      } else {
        setStatus("error");
        setErrors(data.errors);
        setActiveTab("errors");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrors("Network error: The backend is probably sleeping.\n" + (err.message || ""));
      setActiveTab("errors");
    }
  };

  return (
    <div className="playground-container" style={{ width: '100%', height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column', padding: '10px' }}>
      
      {/* Toolbar */}
      <div className="toolbar" style={{ borderRadius: '12px 12px 0 0', display: 'flex', justifyContent: 'space-between', padding: '0 1rem', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', height: '50px', alignItems: 'center' }}>
          <div className="toolbar-title">
            <div className="window-controls">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <span style={{ marginLeft: "10px", fontWeight: 500 }}>chef_kitchen.cook</span>
          </div>
          <div className="toolbar-actions">
            {status === "loading" && <span className="spinner"></span>}
            <button
              className="btn-primary"
              onClick={handleRun}
              disabled={status === "loading"}
              style={{ padding: '6px 12px', fontSize: '0.9rem' }}
            >
              <Play size={14} fill="currentColor" /> Cook
            </button>
          </div>
        </div>

      <div className="split-wrapper" style={{ flex: 1, border: '1px solid var(--border-color)', borderTop: 'none', borderRadius: '0 0 12px 12px', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
        <Split
            key={direction}
            className="split"
            sizes={[50, 50]}
            minSize={100}
            expandToMin={false}
            gutterSize={6}
            gutterAlign="center"
            direction={direction}
            cursor={direction === "horizontal" ? "col-resize" : "row-resize"}
            style={{ display: 'flex', flexDirection: direction === "horizontal" ? 'row' : 'column', height: '100%' }}
        >
            {/* Editor */}
            <div className="editor-pane" style={{ height: '100%', overflow: 'hidden' }}>
            <Editor
                height="100%"
                defaultLanguage="cpp" // fallback
                theme={theme === "dark" ? "vs-dark" : "light"}
                value={code}
                onChange={(value) => setCode(value)}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: '"JetBrains Mono", monospace',
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 20 },
                    lineHeight: 24,
                    renderLineHighlight: "none",
                    smoothScrolling: true,
                }}
                onMount={(editor, monaco) => {
                monaco.languages.register({ id: "cook" });
                monaco.languages.setMonarchTokensProvider("cook", {
                    keywords: [
                    "ingredient",
                    "taste",
                    "retaste",
                    "serve",
                    "simmer",
                    "kitchen_closed",
                    "plate",
                    "rest",
                    "recipe",
                    "finish",
                    ],
                    tokenizer: {
                    root: [
                        [
                        /[a-z_$][\w$]*/,
                        {
                            cases: {
                            "@keywords": "keyword",
                            "@default": "identifier",
                            },
                        },
                        ],
                        [/[0-9]+/, "number"],
                        [
                        /"/,
                        {
                            token: "string.quote",
                            bracket: "@open",
                            next: "@string",
                        },
                        ],
                        [/note.*/, "comment"],
                        [/cookbook[\s\S]*?cookbook/, "comment"],
                        [/[{}()[\]]/, "@brackets"],
                        [/[=><!]+/, "operator"],
                    ],
                    string: [
                        [/[^\\"]+/, "string"],
                        [
                        /"/,
                        {
                            token: "string.quote",
                            bracket: "@close",
                            next: "@pop",
                        },
                        ],
                    ],
                    },
                });
                monaco.editor.defineTheme("cook-theme", {
                    base: "vs-dark",
                    inherit: true,
                    rules: [
                    {
                        token: "keyword",
                        foreground: "f97316", // Orange 500
                        fontStyle: "bold",
                    },
                    { token: "identifier", foreground: "fbbf24" }, // Amber 400
                    { token: "string", foreground: "a3e635" }, // Lime 400
                    {
                        token: "comment",
                        foreground: "78716c", // Stone 500
                        fontStyle: "italic",
                    },
                    { token: "number", foreground: "fca5a5" }, // Red 300
                    { token: "operator", foreground: "fdba74" }, // Orange 300
                    ],
                    colors: {
                    "editor.background": "#1c1917", // Stone 900
                    "editor.foreground": "#f5f5f4", // Stone 100
                    },
                });
                monaco.editor.setModelLanguage(editor.getModel(), "cook");
                }}
            />
            </div>

            {/* Output */}
            <div className="output-pane" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="tabs" style={{ background: 'var(--bg-tertiary)' }}>
                <div
                className={`tab ${activeTab === "output" ? "active" : ""}`}
                onClick={() => setActiveTab("output")}
                >
                <Terminal
                    size={14}
                    style={{
                    marginRight: 6,
                    display: "inline-block",
                    verticalAlign: "middle",
                    }}
                />
                Output
                </div>
                <div
                className={`tab ${activeTab === "asm" ? "active" : ""}`}
                onClick={() => setActiveTab("asm")}
                >
                <Cpu
                    size={14}
                    style={{
                    marginRight: 6,
                    display: "inline-block",
                    verticalAlign: "middle",
                    }}
                />
                Assembly
                </div>
                <div
                className={`tab ${activeTab === "errors" ? "active" : ""}`}
                onClick={() => setActiveTab("errors")}
                >
                <AlertCircle
                    size={14}
                    style={{
                    marginRight: 6,
                    display: "inline-block",
                    verticalAlign: "middle",
                    }}
                />
                Errors
                </div>
            </div>

            <div className="pane-content" style={{ flex: 1, overflow: 'auto', background: 'var(--bg-primary)' }}>
                {activeTab === "output" && (
                <div className="output-content">
                    {output || (
                    <span style={{ opacity: 0.5 }}>Ready when you are...</span>
                    )}
                </div>
                )}
                {activeTab === "asm" && (
                <div className="output-content" style={{ color: "#7aa2f7" }}>
                    {assembly || (
                    <span style={{ opacity: 0.5 }}>No assembly yet.</span>
                    )}
                </div>
                )}
                {activeTab === "errors" && (
                <div className="output-content error">
                    {errors || (
                    <span style={{ opacity: 0.5 }}>No errors! Good chef.</span>
                    )}
                </div>
                )}
            </div>
            </div>
        </Split>
      </div>
    </div>
  );
}

export default Playground;
