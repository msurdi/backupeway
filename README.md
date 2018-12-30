Scaleway backups
================

Just a tiny script I use for backing up my toy projects in [Scaleway](https://scaleway.com).

It will run periodically at the specified interval, keep up to the specified
number of days, and make some basic logs of operation available over http.


Running locally
---------------

create a .env file at the root level of this project and as a minimum, set the following environment variables:

        BACKUPEWAY_SERVERS=comma_separated_list_of_server_ids_to_backup
        BACKUPEWAY_SCALEWAY_SECRET=your_scaleway_secret_api_key
        BACKUPEWAY_USERNAME=username_for_reading_logs_online
        BACKUPEWAY_PASSWORD=password_for_reading_logs_online

then run

        npm install
        npm run build
        npm start

If you use [dokku](http://dokku.viewdocs.io/dokku/) like me, you can deploy this
by creating a new 'backupeway' dokku service, setting the environment variables, and then:
        
        git remote add dokku dokku@YOURSERVER:backupeway
        npm run deploy
