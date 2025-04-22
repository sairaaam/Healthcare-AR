import fs from 'fs';

export default {
  server: {
    https: {
      key: fs.readFileSync('./cert.key'),
      cert: fs.readFileSync('./cert.crt'),
    },
    host: '0.0.0.0', // Listen on all interfaces
    port: 5173, // Default port (or any other port you prefer)
  },
};
