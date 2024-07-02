/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public'
})

const NextConfig = {}

module.exports = withPWA(NextConfig)