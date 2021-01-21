# postgres

Installed through chocolatey in an elevated PowerShell. It wasn't obvious at first, but the postgres service is automatically started after install, but also crashes silently on a failed login. The postgres service controller to restart is different on Windows as well:

> `pg_ctl -D "C:\Program Files\PostgreSQL\<version>\data" <start|stop|restart>`

The main config file is in the same directory (in case you setup the database listener port incorrectly):

> `C:\Program Files\PostgreSQL\13\data\postgres.conf`

pg_hba.conf also lives in that folder and can be modified to allow connecting locally without a password. Useful if Windows decides to do something weird and forget the original default password. Change "local", "IPv4" and "IPv6" methods to `trust`, then (and don't forget to switch back to `scram-sha-256` afterwards):

> `C:\Program Files\PostgreSQL\13\data\pg_hba.conf`
> `psql -U postgres`
> `ALTER USER postgres WITH PASSWORD 'some password';`

Adding a test database works more or less the same on Windows; from an elevated shell:

> `createdb -U postgres nselxcin-test`

I also added a test user specifically for this database, from within an admin `psql` shell (note the single quotes for password, but double quotes to escape the database name):

> `create user nselxcin with password 'salish';`
> `alter database "nselxcin-test" owner to nselxcin;`
