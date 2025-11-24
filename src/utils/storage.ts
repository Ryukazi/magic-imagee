export interface HistoryItem {
    id: string;
    url: string;
    prompt: string;
    model: string;
    timestamp: number;
}

const STORAGE_KEY = 'magic_gen_history';

export const getHistory = (): HistoryItem[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const addToHistory = (item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
    const history = getHistory();
    const newItem: HistoryItem = {
        ...item,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([newItem, ...history]));
    return newItem;
};

export const removeFromHistory = (id: string) => {
    const history = getHistory();
    const newHistory = history.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    return newHistory;
};

export const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
};
