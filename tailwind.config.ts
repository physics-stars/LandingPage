import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss/types/config').PluginCreator} */

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  extend: {
    keyframes: {
      wiggle: {
        '0%, 100%': { transform: 'rotate(-1deg)' },
        '50%': { transform: 'rotate(1.5deg)' },
      }
    }
  }
}
} satisfies Config;

export default config;
