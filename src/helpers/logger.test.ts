import mockConsole from "jest-mock-console";
import { logError, logWarning } from './logger'

describe("Test console logging.", () => {
    it("logs an error message", () => {
        const restoreConsole = mockConsole();
        logError("Error message")
        expect(console.error).toHaveBeenCalled();
        restoreConsole();
    });
    it("logs a warning message", () => {
        const restoreConsole = mockConsole();
        logWarning("Warning message")
        expect(console.warn).toHaveBeenCalled();
        restoreConsole();
    });
});
