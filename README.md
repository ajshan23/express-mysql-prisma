# Mysql-Express with prisma



## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)


## Installation

Step-by-step instructions on how to set up your project.


Step 1: Pull the MySQL Image

```bash
# Pull the docker image
docker pull mysql:latest

# Next, run the MySQL container and expose the default MySQL port (3306):,i used 3307 port  in this
docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=example -e MYSQL_DATABASE=myapp -e MYSQL_USER=user -e MYSQL_PASSWORD=password -p 3306:3306 -d mysql:latest
```

Step 2:Install Install dependencies
```bash
npm init -y
npm install express mysql2
npm install @prisma/client
npm install --save-dev prisma
```

Step 3:Initalize prisma

```bash
npx prisma init
#This will create a prisma folder with a schema.prisma file and a .env file.
#update env file with your specified url for db connection
```
