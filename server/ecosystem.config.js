module.exports = {
  apps: [
    {
      name: "sos_server",
      script: ".dist/server.js",
      env_production: {
        "PORT": 4000,
        "NODE_ENV": "production"
      }
    }
  ]
}