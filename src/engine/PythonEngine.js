class PythonEngine {
    constructor() {
        this.isInitialized = false;
        this.initPromise = this.checkInitialization();
    }

    async checkInitialization() {
        if (typeof window !== 'undefined' && typeof window.brython === 'function') {
            this.isInitialized = true;
            return true;
        }

        return new Promise((resolve) => {
            const check = setInterval(() => {
                if (typeof window !== 'undefined' && typeof window.brython === 'function') {
                    this.isInitialized = true;
                    clearInterval(check);
                    resolve(true);
                }
            }, 500);
            
            setTimeout(() => {
                clearInterval(check);
                resolve(false);
            }, 5000);
        });
    }

    async evaluate(code, validationRule) {
        if (!this.isInitialized) {
            const ready = await this.initPromise;
            if (!ready) return { success: false, message: "CRITICAL: Python Core failed to initialize." };
        }

        return new Promise((resolve) => {
            try {
                const escapedCode = code.replace(/\\/g, '\\\\').replace(/"""/g, '\\"\\"\\"');
                const escapedRule = validationRule.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
                
                const pythonScriptCode = `
import sys
from browser import window

try:
    source = """${escapedCode}"""
    test_globals = {}
    exec(source, test_globals)
    result = eval("${escapedRule}", test_globals)
    window.lastPythonResult = result
    window.lastPythonError = None
except Exception as e:
    window.lastPythonResult = False
    window.lastPythonError = str(e)
`;
                window.lastPythonResult = undefined;
                window.lastPythonError = undefined;

                const script = document.createElement('script');
                script.type = 'text/python';
                script.textContent = pythonScriptCode;
                document.body.appendChild(script);

                // Initialize the new script tag
                window.brython({ debug: 0, indexedDB: false });

                // Allow brython execution some time
                setTimeout(() => {
                    // Clean up script tag
                    if (document.body.contains(script)) {
                        document.body.removeChild(script);
                    }
                    
                    if (window.lastPythonError) {
                        resolve({ success: false, message: `PYTHON ERROR: ${window.lastPythonError}` });
                    } else {
                        resolve({ 
                            success: window.lastPythonResult === true, 
                            message: window.lastPythonResult === true ? "STABILIZED: Core Nominal." : "ERROR: Logic Mismatch." 
                        });
                    }
                }, 150);

            } catch (error) {
                resolve({ success: false, message: `CRITICAL: ${error.message}` });
            }
        });
    }
}

export default new PythonEngine();
