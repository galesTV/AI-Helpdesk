import tailwind from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

export default {
  plugins: {
    '@tailwindcss/postcss': tailwind(),
    autoprefixer: autoprefixer()
  }
}