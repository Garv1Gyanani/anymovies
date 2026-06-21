import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'dark' | 'light';

const getInitialTheme = (): Theme => {
    if (!browser) return 'dark';

    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored) return stored;

    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
    }

    return 'dark';
};

function createThemeStore() {
    const { subscribe, set } = writable<Theme>(getInitialTheme());

    return {
        subscribe,
        toggle: () => {
            const newTheme = getInitialTheme() === 'dark' ? 'light' : 'dark';
            if (browser) {
                localStorage.setItem('theme', newTheme);
                document.documentElement.setAttribute('data-theme', newTheme);
            }
            set(newTheme);
        },
        init: () => {
            if (browser) {
                const theme = getInitialTheme();
                document.documentElement.setAttribute('data-theme', theme);
                set(theme);
            }
        }
    };
}

export const theme = createThemeStore();
