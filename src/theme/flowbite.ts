// If you're using TS, this type import helps with IntelliSense.
// If you're on JS, you can remove the type bits.
import type { FlowbiteTheme } from 'flowbite-react';

export const customTheme: Partial<FlowbiteTheme> = {
    // ==== Buttons =============================================================
    button: {
        color: {
            // Use your Tailwind palette (primary, success, etc.)
            primary:
                'bg-blue-600 hover:bg-blue-700 text-white focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800',
            light:
                'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700',
            success:
                'bg-green-600 hover:bg-green-700 text-white focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800',
            warning:
                'bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-4 focus:ring-yellow-200 dark:focus:ring-yellow-700',
            failure:
                'bg-red-600 hover:bg-red-700 text-white focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800',
            gray:
                'bg-gray-600 text-white hover:bg-gray-700 focus:ring-4 focus:ring-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-gray-700',
        },
        size: {
            xs: 'text-xs px-1.5 py-0',
            sm: 'text-sm px-3 py-1.5',
            md: 'text-sm px-3 py-1.5',
            lg: 'text-lg px-5 py-2.5',
            xl: 'text-xl px-6 py-3',
        },
        // Optional: make all buttons pill/rounded by default
        // pill: true,
    },

    // ==== Text Inputs / Textareas / Selects ===================================
    textInput: {
        field: {
            input: {
                // Sizes here control padding/font across inputs
                sizes: {
                    sm: 'p-2 text-sm',
                    md: 'p-2.5 text-base',
                    lg: 'p-3 text-lg',
                },
                // Colors here control borders/focus styles
                colors: {
                    gray:
                        'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 ' +
                        'focus:border-primary-500 focus:ring-primary-500',
                },
                withIcon: {
                    // Padding when using icon props
                    on: 'ps-10',
                    off: '',
                },
            },
        },
    },

    textarea: {
        base: 'block w-full rounded-lg',
        colors: {
            gray:
                'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 ' +
                'focus:border-primary-500 focus:ring-primary-500',
        },
        // Same size scale as inputs
        rows: {
            sm: 'p-2 text-sm',
            md: 'p-2.5 text-base',
            lg: 'p-3 text-lg',
        },
    },

    select: {
        field: {
            select: {
                sizes: {
                    sm: 'p-2 text-sm',
                    md: 'p-2.5 text-base',
                    lg: 'p-3 text-lg',
                },
                colors: {
                    gray:
                        'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 ' +
                        'focus:border-primary-500 focus:ring-primary-500',
                },
            },
        },
    },

    // ==== Choice Controls =====================================================
    checkbox: {
        root: {
            base:
                'rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:focus:ring-primary-700',
        },
    },
    radio: {
        root: {
            base:
                'text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-700',
        },
    },
    toggleSwitch: {
        root: {
            // Bigger toggles globally
            base: 'group inline-flex cursor-pointer items-center',
            checked: {
                // track when checked
                on: 'bg-primary-600',
                off: 'bg-gray-200 dark:bg-gray-700',
            },
            // size knobs/tracks
            label: 'ml-3 text-sm font-medium text-gray-900 dark:text-gray-300',
        },
    },

    // ==== Modal ===============================================================
    modal: {
        content: {
            base:
                'relative w-full p-0 md:p-0 max-h-[90vh] overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl',
            inner:
                'p-6', // inner padding for body by default
        },
        header: {
            base:
                'flex items-center justify-between p-6 pb-3 border-b border-gray-200 dark:border-gray-700',
            title:
                'text-lg font-semibold text-gray-900 dark:text-white',
            close: {
                base:
                    'ml-auto inline-flex items-center rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 ' +
                    'dark:hover:bg-gray-700 dark:hover:text-white',
            },
        },
        body: {
            base: 'p-6',
        },
        footer: {
            base:
                'flex items-center gap-2 p-6 pt-3 border-t border-gray-200 dark:border-gray-700',
        },
    },

    // ==== Navbar ==============================================================
    navbar: {
        link: {
            base:
                'block py-2 px-3 rounded-lg text-gray-700 hover:text-primary-700 hover:bg-gray-50 ' +
                'dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700',
            active:
                'text-primary-700 bg-primary-50 dark:text-white dark:bg-gray-700',
            disabled: 'opacity-50 pointer-events-none',
        },
        toggle: {
            base:
                'inline-flex items-center p-2 w-10 h-10 justify-center rounded-lg hover:bg-gray-100 ' +
                'dark:hover:bg-gray-700',
        },
    },

    // ==== Tabs ================================================================
    tabs: {
        tablist: {
            base:
                'flex border-b border-gray-200 dark:border-gray-700 gap-2',
        },
        tabitem: {
            base:
                'inline-flex items-center justify-center rounded-t-lg py-2 px-4 text-sm font-medium ' +
                'hover:text-primary-700 dark:hover:text-white',
            active: {
                on:
                    'text-primary-700 border-b-2 border-primary-700 dark:text-white',
                off:
                    'text-gray-500 dark:text-gray-400',
            },
        },
    },

    // ==== Card ================================================================

    card: {
        root: {
            base: 'rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm',
            children: ' h-auto',
        },
    },



    // ==== Alerts & Badges =====================================================
    alert: {
        color: {
            primary:
                'bg-primary-50 text-primary-800 dark:bg-gray-800 dark:text-primary-300',
            success:
                'bg-green-50 text-green-800 dark:bg-gray-800 dark:text-green-300',
            warning:
                'bg-yellow-50 text-yellow-800 dark:bg-gray-800 dark:text-yellow-200',
            failure:
                'bg-red-50 text-red-800 dark:bg-gray-800 dark:text-red-300',
            info:
                'bg-blue-50 text-blue-800 dark:bg-gray-800 dark:text-blue-300',
        },
        rounded: 'rounded-xl',
    },

    // ==== CORRECTED BADGE STRUCTURE ==========================================
    badge: {
        root: {
            base: 'flex h-fit items-center gap-1 font-semibold',
            color: {
                primary: 'bg-blue-600 text-white hover:bg-blue-700',
                gray: 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600',
                success: 'bg-green-600 text-white hover:bg-green-700',
                warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:hover:bg-yellow-800',
                failure: 'bg-red-600 text-white hover:bg-red-700',
                info: 'bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:text-blue-700 hover:bg-blue-100',
            },
            size: {
                xs: 'p-1 text-xs',
                sm: 'p-1.5 text-xs',
                md: 'p-2 text-sm',
                lg: 'p-2.5 text-base',
            },
        },
    },
};