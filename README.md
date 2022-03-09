# Verstak Template

## How to setup autodeploy?

The best [guide](https://zellwk.com/blog/github-actions-deploy/)

### TLDR;

1. Get `.github/workflows/autodeploy.yml` to your repo
2. Generate private and public key on your server.

   ```bash
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
   ```

   1. Enter the filename, i.e. `github-actions`
   2. Leave passphrase empty
   3. Move your public key to `/.ssh/` folder by

   ```
   	cat github-actions.pub >> authorized_keys
   ```

3. Create _secrets_ in you repo
   1. `DEPLOY_SERVER_HOST` — ip address or server name. SSH is smart, it can get ip from server name.
   2. `DEPLOY_SERVER_USERNAME` — name of your ssh account
   3. `DEPLOY_SERVER_KEY` — your private key file content. This is the key file without `.pub` extension
   4. `DEPLOY_PATH_FROM_HOME` — your $HOME `home/e/usename/yourdomain.com`. Don't use slash at the begin and end of string

Now, after you push changes to `maser` branch, it automaticaly will be loaded to your server
