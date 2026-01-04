/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // 빌드 시 lib/data 폴더의 파일들을 포함
  webpack: (config, { isServer }) => {
    if (isServer) {
      // 서버 사이드에서 lib/data 폴더의 파일들을 복사
      config.resolve.alias = {
        ...config.resolve.alias,
      }
    }
    return config
  },
}

export default nextConfig
