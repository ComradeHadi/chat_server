# chat_server
real time chat using Laravel +NodeJS +Socket.io



Requirements : 

Laravel 5.1
MySQL
Redis
Node.js
Socket.io library




How to install


Step 1: Clone this repo :

$ git clone https://github.com/medamineDev/chat_server.git


Step 2: Install composer packages

$ cd Chat_server/server
$ composer install


Step 2: Migrate & Populate Database (set you mysql configuration first)


$ php artisan migrate


step3 : install and run Redis 

ubunto : https://www.digitalocean.com/community/tutorials/how-to-install-and-use-redis

Windows :  http://freshclickmedia.co.uk/2013/09/installing-redis-on-windows/



Step4 : Let's run :)



run nodeJS :

$cd Chat_server/server/NodeJs
$ node server



run apache :

$cd Chat_server/server
$php artisan server --host=chatServer.dev --port=5555


home page -----> http://chatServer.dev/Chat_server/app/index.html#/home













