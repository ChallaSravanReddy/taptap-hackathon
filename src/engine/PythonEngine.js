class PythonEngine {
    constructor() {
        this.isInitialized = false;
        this.initPromise = this.checkInitialization();
    }

    async checkInitialization() {
        if (window.__BRYTHON__ && window.__BRYTHON__.run_python) {
            this.isInitialized = true;
            return true;
        }

        return new Promise((resolve) => {
            const check = setInterval(() => {
                if (window.__BRYTHON__ && window.__BRYTHON__.run_python) {
                    this.isInitialized = true;
                    clearInterval(check);
                    resolve(true);
                } else if (typeof window.brython === 'function') {
                    try {
                        window.brython({ debug: 0, indexedDB: false });
                    } catch(e) {}
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

        try {
            const pythonScript = `
import sys
from browser import window

try:
    source = """${code.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}\"""
    exec(source, globals())
    result = eval("${validationRule.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}")
    window.lastPythonResult = result
    window.lastPythonError = None
except Exception as e:
    window.lastPythonResult = False
    window.lastPythonError = str(e)
`;
            window.lastPythonResult = undefined;
            window.lastPythonError = undefined;

            window.__BRYTHON__.run_python(pythonScript, "challenge_script", true);

            if (window.lastPythonError) {
                return { success: false, message: `PYTHON ERROR: ${window.lastPythonError}` };
            }

            return { 
                success: window.lastPythonResult === true, 
                message: window.lastPythonResult === true ? "STABILIZED: Core Nominal." : "ERROR: Logic Mismatch." 
            };
        } catch (error) {
            return { success: false, message: `CRITICAL: ${error.message}` };
        }
    }
}

export default new PythonEngine();
