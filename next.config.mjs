import { withCloudflare } from '@opennextjs/cloudflare/next-config'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wgdvnfbrypxikwzefvya.supabase.co',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'qstro.pages.dev'],
    },
  },
}

export default withCloudflare(nextConfig)
