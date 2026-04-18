###Backend Development
1.Create git repo
     git init
     
2.Add .gitignore file  

3.Create .env file for environment variables & Read data from .env with "dotenv" nodule
   install using:
   npm i dotenv
//we shouldnot push secret keys,urls to github repository ,bcz everyone can see and use and may hack
//All the sensitive data should be placed in .env file
4.Generate package.json
   npm init -y
5.Create express app  //immediately we can use http server
   npm i express

6.connect to database

7.Add middleware(body parser,err handling midlewares) basic for now

8.Design schemas and create models

9.design REST APIs for all resources

function declaration vs function expression


cookie:storage location
token:value
whenever we add something in cookies,it will add to request automatically
if we use session or local storage we should add
authorization:bearer
         1.POST
client  =======>  login route
cookie  <======

2.store token in cookies storage
3.login success
4.check cookie settings
5.red token
6.req with token

if the route is public ,token will not check
if protected it will check using middleware like ticket check outside theatre


========================================================================
communication blw  frontend and backend is http req and res(http server) using json data
json and xml is parsed by any technology
to identify it is json
using typeof operator (for json is) == string
json to js object == parse()
js to json == stringify()

api contains routes
route contains request handling mechanism

to check req contains toekn
   
=======================
TEMPLATE LITERAL
let a=10,b=20,c=30
console.log(`a is ${a} ,b is ${b} ,c is ${c}`)  
==============================
file uploads,social login,additional security topics of backend 

who is using applications==end urs
web apps stored in web server
browser==softwaree to access web apps
every browser has inbuilt js engine
google chrome uses V8 (v8 i svery efficient and powerful than others)
firefox uses spidermonkey
frontend runs on browser and backend will be there in web server

frontend==== Dynamic,Responsive,user interfaces
Dynamic:interacting with elements of the page
Responsive:opening in phone,laptop,tabs based on dimensions it should behave(abilty of adjusting elements based on alignment)to give best user experience
user interfaces:what we see in browser
backend===== httpserver,service layer,database server

vanilla js is pure js used to frontend dev
but html,css,js need a lot of code
reactjs==less code and js library
Html is a document and programming language











