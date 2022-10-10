module.exports = {
  apps: [{
    script: 'src/cdn.js',
    watch: '.'
  }],

  deploy: {
    production: {
      user: 'aysfishh117',
      host: '78.46.11.32',
      ref: 'origin/master',
      repo: 'git@github.com:IDRISSHACKER/guihon-job-api.git',
      path: '/home/aysfishh117/web/jobapi.guihon.cm',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};