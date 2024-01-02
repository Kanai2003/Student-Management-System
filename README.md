# Student Management System API
This is a basic API for a Student Management System built using ExpressJS and MongoDB.

1. Need endpoints for both Admin panel and student interface.
2. Admin Panel
    1. Admin should be able to log
    2. Allow the admin to add students with their name, email ID, department, and password
    3. The admin should also be able to assign tasks to students with a due time.
3. Student Interface
    1. Students should be able to log in and see the tasks assigned to them.
    2. They should be able to see the status of each task (pending, overdue,completed).
    3. Also option change task status to completed.



## Postman Api Documentation: [ Click hee](https://documenter.getpostman.com/view/27116622/2s9YsFDZc6)
Visit Postman Api Documentation to explore all apis


# Local Instalation

**Getting Started:**

* **Prerequisites:**
    * List any required software or tools (e.g., Node.js version, npm).
* **Installation:**
    1. Clone the repository
    2. Install dependencies: `npm install`
    3. Create a .env file and set the necessary environment variables
* **Running the Project:**
    * Development mode: `npm run dev`

### .env file
```
PORT=4000

MONGODB_URI= //your mongodb uri

CORS_ORIGIN=*

//your secret key(random string)
JWT_SECRET= sdfhaslfjasldfjao29m458hmwietjgowteirtvnwim09t8u4m9t58y 
```

## Api Endpoints
### For better understanding visit [Postman Api Published Docs](https://documenter.getpostman.com/view/27116622/2s9YsFDZc6)