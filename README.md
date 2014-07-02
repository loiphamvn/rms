RMS 1.x Frontend App (AngularJS)
================================================

## Quick Start


Install Node.js and then:

# clone source from
$ git clone https://github.com/loiphamvn/rms.git <app-folder>

# instal laravel(http://laravel.com) server for fake data
$ cd <app-folder>/server
$ composer install;
$ chmod -R 777 app/storage;


Create database <db-name> on mySql
Import data from .sql file on folder <app-folder>/server/db to <db-name>
Configure connection server in <app-folder>/server/app/config/database.php

	'database'  => '<db-name>',
	'username'  => '<mysql-username>',
	'password'  => '<mysql-password>',


$ cd <app-folder>
$ sudo npm -g install grunt-cli karma bower
$ npm install
$ bower install
$ grunt build

Finally, open `http://ROOT-URL/<app-folder>/build/` in your browser.

* Note:
- System require:
	+ Server: Laravel require PHP >=5.4

