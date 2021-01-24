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

The node-postgres library also seems to require `pg-native` installed as well? It doesn't seem to get resolved automatically (`pg-native` in return needs Python installed):

> `npm install --save pg-native`

And in Windows 10's infinite wisdom, there are multiple, dangling, stub installations of "Python" lurking around because of the Windows App store. It may be required to switch off the app aliases and reconfigure npm to use the correct, current version of python on the machine:

> `npm config get python`
> `npm config set python py` (for whatever reason `py` is what Windows has aliased to my local python 3.9 installation)

The `pg-native` also complains if you're missing the right version of VisualStudio (for fuck's sake). On node 14 it looks like at least Visual Studio 2015 is needed. Installing Visual Studio 2019 and the "desktop C++ workload" module (6.66 frickin gigs) unblocked one error. But npm also needs to be configured to correctly use the Visual Studio 2019 build path and have the Visual Studio version set correctly (see https://github.com/nodejs/node-gyp/issues/1753 for more of the history):

> `npm config set msbuild_path "C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\MSBuild\Current\Bin\MSBuild.exe"`
> `npm config set msvs_version 2019`
