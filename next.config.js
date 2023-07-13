/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com', 'firebasestorage.googleapis.com', 'firebasestorage.googleapis.com'],
    },
    serverRuntimeConfig: {
        // Increase the payload size limit (in bytes)
        maxPayloadSize: 100048576, // For example, set it to 100MB
    },
}

module.exports = nextConfig
