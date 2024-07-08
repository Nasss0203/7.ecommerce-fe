/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '16px'
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        primary: {
          '900': '#331B0A',
          '800': '#663514',
          '700': '#99501F',
          '600': '#DE732D',
          '500': '#FA8232',
          '400': '#FF9D5C',
          '300': '#FFB685',
          '200': '#FFCEAD',
          '100': '#FFE7D6',
          '50': '#FFF3EB',
        },
        secondary: {
          '900': '#092131',
          '800': '#124261',
          '700': '#1B6392',
          '600': '#2484C2',
          '500': '#2DA5F3',
          '400': '#57B7F5',
          '300': '#81C9F8',
          '200': '#ABDBFA',
          '100': '#D5EDFD',
          '50': '#EAF6FE',
        },
        success: {
          '900': '#092407',
          '800': '#12470E',
          '700': '#1B6B16',
          '600': '#248E1D',
          '500': '#2DB224',
          '400': '#57C150',
          '300': '#81D17C',
          '200': '#ABE0A7',
          '100': '#D5F0D3',
          '50': '#EAF7E9',
        },
        warning: {
          '900': '#2F2802',
          '800': '#5E5005',
          '700': '#8D7807',
          '600': '#BCA00A',
          '500': '#EBC80C',
          '400': '#EFD33D',
          '300': '#F3DE6D',
          '200': '#F7E99E',
          '100': '#FBF4CE',
          '50': '#FDFAE7',
        },
        danger: {
          '900': '#301212',
          '800': '#5F2323',
          '700': '#8F3535',
          '600': '#BE4646',
          '500': '#EE5858',
          '400': '#F17979',
          '300': '#F59B9B',
          '200': '#F8BCBC',
          '100': '#FCDEDE',
          '50': '#FDEEEE',
        },
        gray: {
          '900': '#191C1F',
          '800': '#303639',
          '700': '#475156',
          '600': '#5F6C72',
          '500': '#77878F',
          '400': '#929FA5',
          '300': '#ADB7BC',
          '200': '#C9CFD2',
          '100': '#E4E7E9',
          '50': '#F2F4F5',
        },
      },
      fontFamily: {
        serif: ['Roboto', 'serif'], // Replace 'YourSerifFont' with your desired serif font
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}