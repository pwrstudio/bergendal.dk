import { writable, get } from 'svelte/store';

// Store for saving scroll positions by route
export const scrollPositions = writable<Record<string, number>>({});

/**
 * Save the current scroll position for a given route
 */
export function saveScrollPosition(route: string) {
    scrollPositions.update(positions => ({
        ...positions,
        [route]: window.scrollY
    }));
}

/**
 * Restore the scroll position for a given route
 */
export function restoreScrollPosition(route: string) {
    const positions = get(scrollPositions);
    const position = positions[route] || 0;

    // Use double requestAnimationFrame to ensure DOM is fully painted
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            window.scrollTo({
                top: position,
                behavior: 'instant'
            });
        });
    });
}
