/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com', 'firebasestorage.googleapis.com', 'firebasestorage.googleapis.com'],
    },
    env: {
        // Set the maximum payload size limit (in bytes)
        // Adjust the value as per your requirements
        NEXT_PUBLIC_PAYLOAD_LIMIT: '100mb'
    },
    serverRuntimeConfig: {
        // Set the maximum payload size limit for server-side requests (in bytes)
        // Adjust the value as per your requirements
        payloadLimit: '100mb',
        maxPayloadSize: '200mb',
        maxPayload: 200 * 1024 * 1024
    },
    publicRuntimeConfig: {
        // Set the maximum payload size limit for client-side requests (in bytes)
        // Adjust the value as per your requirements
        payloadLimit: '100mb'
    },
    experimental:{
        serverActions:true,
        serverActionsBodySizeLimit:'100mb'
    }
}

module.exports = nextConfig
