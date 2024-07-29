#Video World Backend

1. Add mongoDB uri in .env file and write the uri like this: "mongodb+srv://your username:your password@cluster0.hk6hqcg.mongodb.net"

2. write a database name on constants.js file and export it.

3. Install mongoose, express and dotenv npm packages. 

note: when i need to talk with database, Its mandatory use "try catch" block for error handling use use "async await" on that function 

4. import mongoose, dotenv and connect database into a variable. Do not forget config dotenv

note: When i call a function which is came with async, I have to write then and catch block

5. Add the express on a variable on app.js file and export it. Then use it on main index.js file.

6. Install cors and cookie parser and use them on app.js file.

7. app.use(cors()) and set the origin and credentials:true

8. use express.json, urlencoded, static.

note: json: It means this server will receive data in json format.
      urlencoded: It means read the url special character like %,+ etc.
      static: It means give some data to the all user in public.

9. Use the cookie-parser also.

10. Handle async and try catch in utils file.

11.Also write api error on utils file