import path from 'path'
import pkg from './package'

const environment = process.env.NODE_ENV || 'development'
require('dotenv').config({
  path: __dirname + `/config/${environment}.env`
})

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#4299e1' },

  /*
   ** Global CSS
   */
  css: [
    '@/assets/styles/tailwind.pcss',
    {
      src :'@/assets/styles/main.scss',
      lang: 'scss'
    }
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/vuelidate' },
    { src: '~/plugins/vue-moment' }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/apollo',
    'nuxt-purgecss',
    ['@nuxtjs/dotenv', {
      path: 'config',
      filename: `${environment}.env`,
      systemvars: true
    }]
  ],

  // Give apollo module options
  apollo: {
    // required
    clientConfigs: {
      default: {
        // required
        httpEndpoint: process.env.API_URL || 'http://server.graphql-auth.local:4000',
        // You can use `wss` for secure connection (recommended in production)
        wsEndpoint: null,
        // LocalStorage token
        tokenName: 'jwt' // optional
      }
    }
  },

  env: {
    apiUrl: process.env.API_URL || 'http://server.graphql-auth.local:4000'
  },

  /*
  ** PurgeCSS
  ** https://github.com/Developmint/nuxt-purgecss
  */
  purgeCSS: {},

  /*
  ** This option is given directly to the vue-router Router constructor
  */
  router: {
    base: '',
    linkActiveClass: 'is-active',
    middleware: ['setup-auth']
  },

  watchers: {
    webpack: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** PostCSS setup
     */
    postcss: {
      // Add plugin names as key and arguments as value
      // Disable a plugin by passing false as value
      plugins: {
        'postcss-url': {},
        tailwindcss: path.resolve(__dirname, './tailwind.config.js'),
        cssnano: {
          preset: 'default',
          discardComments: { removeAll: true },
          zIndex: false
        }
      },
      // Change the postcss-preset-env settings
      preset: {
        stage: 0,
        autoprefixer: {
          cascade: false,
          grid: true
        }
      }
    },

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
