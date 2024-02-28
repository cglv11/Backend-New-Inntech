## :notebook: New Inntech - Test

API Rest with Express which allows CRUD of users and login with JWT authentication.

# Features

- Dynamic CRUD Endpoints: Establish read and update endpoints to effectively query and modify the users' data with MySQL database.

## Backend

## :arrow_up:  Getting Started Docker

**Note:** The following instructions are for running docker locally.

**1. Clone the project**
```
git clone https://github.com/cglv11
cd Backend
```

**2. Docker Setup**

- Download and setup Docker from [here](https://www.docker.com/products/docker-desktop/).
- Once installed, make sure to set it up in your backend configurations.

**3. MySQL Setup**

- Download and setup MySQL from [here](https://dev.mysql.com/downloads/mysql/).
- Once installed, make sure to set it up in your backend configurations.
- It is recommended to install MySQL Workbench for better data visibility from [here](https://dev.mysql.com/downloads/workbench/).

**4. Set Environment Variables**

To run the project using Docker, in the root diretory create a `.env` file with the following variables: `PORT`, `MYSQL_HOST`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`, `SECRETORPRIVATEKEY`.

Example:
```env
PORT=8080
MYSQL_HOST=host.docker.internal
MYSQL_USER=root
MYSQL_PASSWORD=123456 
MYSQL_DATABASE=database_inntech
SECRETORPRIVATEKEY=privatekeyforjwt
```

- `PORT`: The port number on which the Node.js server will listen. The application will be accessible on this port. For example, if you set this to `8080`, you will access your application at `http://localhost:8080`.
- `MYSQL_HOST`: The hostname or IP address of your MySQL server. When running inside a Docker container on Docker Desktop for Mac or Windows, use `host.docker.internal` to connect to the MySQL server running on the host machine. For Linux, you might need to use the specific IP address of your host machine or another known hostname.
- `MYSQL_USER`: The username for your MySQL database. This is typically `root` or another user with sufficient privileges to access and modify the database specified in `MYSQL_DATABASE`.
- `MYSQL_PASSWORD`: The password for your MySQL user specified in `MYSQL_USER`.
- `MYSQL_DATABASE`: The name of the MySQL database that the application will connect to. By default is `database_inntech`.
- `SECRETORPRIVATEKEY`: This is a secret key used for signing and verifying JSON Web Tokens (JWT). By default is `privatekeyforjwt`.


**5. Create Docker Image**
```
cd backend
docker build -t backend-nodejs-app .
```

**6. Running Docker Container**
```
docker run --env-file .env -d -p 8080:8080 --name backend-container-app backend-nodejs-app
```

## :paperclip:  Postman Collection

A Postman collection has been included in this repository that you can use to test the API. To use it, simply import the `Postman-Colletion.json` file into Postman.

**Note:** When testing locally, the base URL is set to `http://localhost:8080/api/users` by default. If you're not able to connect to the API using `localhost`, you may need to replace `localhost` with your local IP address (e.g., `http://192.168.1.2:8080/api/users`). This is especially relevant when using Postman on a different machine than where the server is running.


## :arrow_up:  Getting Started Local Server

**1. Clone the project**
```
git clone https://github.com/cglv11
cd Backend
```

**2. MySQL Setup**

- Download and setup MySQL from [here](https://dev.mysql.com/downloads/mysql/).
- Once installed, make sure to set it up in your backend configurations.
- It is recommended to install MySQL Workbench for better data visibility from [here](https://dev.mysql.com/downloads/workbench/).

**3. Backend Installation**
```
cd backend
npm install
```
**4. Set Environment Variables**

To run the project using Docker, in the root diretory create a `.env` file with the following variables: `PORT`, `MYSQL_HOST`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`, `SECRETORPRIVATEKEY`.

Example:
```env
PORT=8080
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=123456 
MYSQL_DATABASE=database_inntech
SECRETORPRIVATEKEY=privatekeyforjwt
```

**5. Running Server**
```
npm start
```
