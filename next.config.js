/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
});

const nextConfig = {
  ...withPWA({
    dest: "public",
    register: false,
    skipWaiting: true,
    sw: "/firebase-messaging-sw.js",
  }),
};

module.exports = nextConfig;
