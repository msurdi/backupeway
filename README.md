Scaleway backups
================

Just a tiny script I use for backing up my toy projects running on [Scaleway](https://scaleway.com).

It will run periodically at the specified interval and create images and disk snapshots keeping them up to the
specified number of days. Some basic logs of operation will be made available over http, protected by basic auth if
desired.


Running locally
---------------

create a .env file at the root level of this project (or set these environment variables manually) and set at least
the following environment variables:

    BACKUPEWAY_SERVERS=comma_separated_list_of_server_ids_to_backup
    BACKUPEWAY_SCALEWAY_SECRET=your_scaleway_secret_api_key
    BACKUPEWAY_USERNAME=username_for_reading_logs_online
    BACKUPEWAY_PASSWORD=password_for_reading_logs_online

See [the config module](src/config.js) for more options

then run

    npm install
    npm start

If you use [dokku](http://dokku.viewdocs.io/dokku/) like me, you can deploy this
by creating a new 'backupeway' dokku service, setting the above environment variables, and then:

    git remote add dokku dokku@YOUR_DOKU_SERVER:backupeway
    npm run deploy
