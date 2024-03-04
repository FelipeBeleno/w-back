## W-BACKEND Application
 
This repository contains a backend application developed in NestJS.
 
### Users and Roles
 
Before starting, the following emails are registered in the application, divided in 2 roles: Driver and Reader:
 
- **Driver**:

  1. Leone_Ziemann@gmail.com
  2. Melvina30@gmail.com
  3. Jackie.Hermiston87@hotmail.com
  4. Norberto23@hotmail.com
  4. Eric_Rolfson@yahoo.com
 
- **Reader**:
  1. Marisa_Reinger@hotmail.com
  2. Loyal_Waters@gmail.com
  3. Davon.Kutch@yahoo.com
 
### Project Download
 
You can clone this repository using the following command:
 
```
git clone https://github.com/FelipeBeleno/w-back.git
```
 
### Installing Dependencies
 
Once you have downloaded the project, navigate to the root directory and run the following command to install all the necessary dependencies:
 
```
cd w-back
npm install
```
 
### Configuration
 
Before running the application, be sure to configure any necessary environment variables in an `.env` file. For the sole purpose of this test the .env is attached to the file.
 
### Getting Started
 
Once all dependencies are installed and the configuration is complete, you can start the application by running the following command:
 
```
npm start
```
 
The application will be available at `http://localhost:3000`.
 
### Usage
 
The API provides several endpoints to interact with the application. Users are created by default in the database.
 
1. **Creating a Ride**: To create a ride, send a POST request to the `/api/ride/request` endpoint. Users with the driver role will be automatically assigned according to their availability. Once the trip is completed, the drivers will become available again.
 
2. **Check Trip Status**: Once the trip is created, you can check its status by sending a GET request to the `/api/ride/{id}` endpoint, where `{id}` is the trip ID.
 
3. **End a Trip**: To end a trip, use the DELETE request to the `/api/ride/{id}` endpoint, where `{id}` is the trip ID.
 
### Documentation
 
For more details on how to use the API, see the documentation at [http://localhost:3000/doc](#).
 
### Contribution
 
If you would like to contribute to this project, you are welcome! We always appreciate new ideas and suggestions. Please make sure to follow the contribution guidelines.
 
### Problems
 
If you encounter any problems or have any questions, feel free to create an issue in this repository.
 
Thank you for using our application! We hope it will be useful for you.
