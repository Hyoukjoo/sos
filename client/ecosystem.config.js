module.exports = {
  apps: [
    {
      name: "client",
      script: ".next/server.js",
      env_production: {
        "PORT": 3000,
        "NODE_ENV": "production"
      }
    }
  ]
}