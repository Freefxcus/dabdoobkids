module.exports = {
    apps: [
        {
            name: "staging-portal",            // Name of the app in PM2
            script: "serve",                  // Using 'serve' to serve the built Vite static files
            instances: 1,                 // Number of instances (use 'max' for all CPU cores)
            autorestart: true,            // Auto-restart the app if it crashes
            watch: true,                 // Watch for file changes and restart (useful in development)
            max_memory_restart: "500M",   // Restart if memory usage exceeds this value
            exec_mode: "fork",
            interpreter  : "node@20.14.0",
            env: {                        // Default environment settings
                NODE_ENV: "production",
                PM2_SERVE_PATH: '.',
                PM2_SERVE_PORT: 3050,
                PM2_SERVE_SPA: 'true',
                PM2_SERVE_HOMEPAGE: '/index.html'
            }
        }
    ]
};
