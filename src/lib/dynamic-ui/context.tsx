"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface DynamicUIState {
    values: Record<string, any>;
}

interface DynamicUIContextType {
    state: DynamicUIState;
    setValue: (key: string, value: any) => void;
    getValue: (key: string) => any;
    resetForm: () => void;
}

const DynamicUIContext = createContext<DynamicUIContextType | undefined>(undefined);

export const DynamicUIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<DynamicUIState>({ values: {} });

    const setValue = useCallback((key: string, value: any) => {
        setState((prev) => ({
            ...prev,
            values: { ...prev.values, [key]: value },
        }));
    }, []);

    const getValue = useCallback((key: string) => {
        return state.values[key];
    }, [state.values]);

    const resetForm = useCallback(() => {
        setState({ values: {} });
    }, []);

    return (
        <DynamicUIContext.Provider value={{ state, setValue, getValue, resetForm }}>
            {children}
        </DynamicUIContext.Provider>
    );
};

export const useUIState = () => {
    const context = useContext(DynamicUIContext);
    if (!context) {
        throw new Error("useUIState must be used within a DynamicUIProvider");
    }
    return context;
};
