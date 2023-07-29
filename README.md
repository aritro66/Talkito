# Talkito - Real Time Chat App
Talkito is a real-time chat web application built using React JS, Vite JS, Node JS, Socket.io, Google Cloud SQL, GCP VM Instance, and Firebase. It provides users with the ability to initiate chats, send messages, view online status, and view previous chats with other registered users.

## Features
* Sign in with Google
* Initiate chats with other users based on their registered email
* Send messages to other users
* View previous chats
* View status of the user(online or offline)
* View status of user typing

## Tech Stack
* **React JS** - A front-end framework for building the user interface of the application. It provides a fast, scalable, and maintainable way of building dynamic web applications.
* **Vite JS** - A build tool for the front-end of the application. It allows for fast and efficient development by providing instant server startup times and hot module replacement.
* **Node JS** - A back-end framework for the server-side of the application. It provides an event-driven architecture that enables real-time communication between clients and servers.
* **Socket.io** - Enables real-time communication between the client and server. It provides real-time bidirectional communication between the server and clients and allows for the transmission of data in real-time.
* **Google Cloud SQL** - A fully managed database service for storing the conversations between users. It provides automatic backups and easy scalability.
* **Firebase and GCP VM Instance** - Used for authentication and hosting the website. It provides a secure and easy-to-use way of authenticating users and managing user accounts. Firebase also offers a reliable hosting service that allows for the deployment of the application in a matter of minutes.

## Deployment
Talkito is deployed on Google Cloud and Firebase. To deploy Talkito, follow these steps:
* Setup a free Google Cloud account.
* Use Firebase for authentication. Only offer "sign in with Google".
* Use Google's Cloud SQL to store the conversations that users have.
* Use Firebase to host the website(frontend part) and run the Node.js backend on VM instance.

**Deployed Link** - https://chatapp-84b63.web.app/

**Warning:** Deployed website may experience slow loading times, please be patient.

## Video Demonstration and Screeen Shots
![image](https://github.com/aritro66/Talkito/assets/78261928/650e8c16-0b0b-4aa0-b0cc-f48b17e0b250)

![image](https://github.com/aritro66/Talkito/assets/78261928/04047bca-7be1-4140-a00b-f75b9e33199b)

**Youtube Link** - https://youtu.be/vTOxsVSaYlQ

## Installation
1. Clone the repository `git clone https://github.com/aritro66/Talkito.git`
2. Install dependencies in both the client and server directories 
    * `cd Talkito/client`
    * `npm install`
    * `cd ../server`
    * `npm install`
3. Set environment variables
4. Start the server 
    * `cd ../server`
    * `npm start`
5. Start the client 
    * `cd ../client`
    * `npm run dev`

## Usage
To use Talkito, follow these steps:

* Go to the Talkito website link.
* Sign in with your Google account.
* Initiate chats with other registered users by entering their email address.
* Send messages and view user status in real-time.
* View previous conversations.

## Contribution
We welcome contributions from everyone. If you would like to contribute to this project, please fork the repository and submit a pull request.

