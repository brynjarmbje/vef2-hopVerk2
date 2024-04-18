import path from 'path';
import { fileURLToPath } from 'url';

// Converting the file URL to a file path
const __filename = fileURLToPath(import.meta.url);

// Deriving the directory name
const __dirname = path.dirname(__filename);

// Next.js configuration object
const nextConfig = {
  sassOptions: {
    // includePaths: [path.join(__dirname, 'styles')],
    includePaths: [path.join(__dirname, '/src/styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
  },
};

// Exporting the Next.js configuration object
export default nextConfig;
