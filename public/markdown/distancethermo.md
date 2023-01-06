# Distance Thermometer

<!-- Live Site: [convergehawaii.org](https://convergehawaii.org/) -->

**Stack:** Node.js, Express, Vue, MongoDB, Auth0, Sendgrid, Cloudinary, Azure

This project consisted of a hardware component (written in C and Python code), a backend (Node.js, Express, MongoDB), and a frontend (Vue). By creating a REST API with Express, I could send temperature data from a physical thermometer and store the data in a MongoDB database, along with transmitting it to a web client via a websocket. Creating an API also allowed other developers, such as a mobile developer, to authenticate a user and access the data from a mobile device.

## Demo

You may visit the demo site here: COMING SOON  
These are the demo login credentials for a non-admin (e.g. an employee):

Login: `demo@distancethermo.com`  
Password: `Distancethermo!`

These are the login credentials for an admin (e.g. employer):

Login: `demo.admin@distancethermo.com`  
Password: `Distancethermo!`

I recommend checking out the demo site as both a non-admin and admin to see how the user-level permissions affect the UI on various pages.

## Backend

### Architecture

The backend is organized into a typical models, routes, and controllers architecture. There are five models: User, Record, Organization (also used to represent a PersonGroup in Microsoft Azure), Device (thermometer), and OpenMVDevice (OpenMV camera system).
The routes all have an Auth0 (now Okta) JWT authentication middleware, except for the device-related routes, which handle authentication from the thermometers separately. The thermometers actually do not send data directly to the backend server, but to a third server from where it is redirected to the main backend.
Even though this increases latency, it keeps the process more secure and maintainable by keeping most API changes between the third server and the main server rather than between the thermometer firmware and the main server.

### Controllers

The controllers handle the majority of the functionality. There are Auth0 permissions checks within each controller. For example, some users such as managers have the ability to manually calibrate their thermometer, receive email notifications, configure facial recognition settings, and delete records, while some users only have the ability to view and add temperature records. The user controller's main purpose is to keep the Auth0 user database, which handles all authentication, organizations, user-level permissions, and tedious work, in sync with the MongoDB database, which handles temperature records, user metadata, and facial recognition data. The device controller is responsible for performing some thermometer calibration, then sending the data to the frontend via websocket where the frontend user will confirm it in the UI, which creates a new temperature record with the correct temperature, timestamp, and employee identification (either their ID or facial recognition).

### Helpers

Helper files also abstract away some of the core functionality, such as sending email alerts to managers if a detected temperature goes above a set threshold. This email functionality is powered by Sendgrid, a popular email service that allows easily inserting data into a formatted email template. Another helper file handles the API communication to and from Azure and Cloudinary. Azure powers the facial recognition piece of this project, and Cloudinary works to manage the necessary image files for facial recognition (similar to AWS S3 but specifically for image processing). First, an existing image of a face must be uploaded to an Azure "person group" where it is trained. Second, a future image of a face will be processed by Azure's detection model, but not yet identified. Third, Azure will take the data from its detection model and compare it with all the faces in a particular "person group" to identify it, returning its best guess and also its confidence score.

## Frontend

I used Vue for the frontend.

<!-- ### Components -->

## Embedded System

The hardware components included an ESP8266 wireless microcontroller, which allowed data from multiple infrared sensors to be transmitted to the server over a wireless connection. One of the infrared sensors was a medical-grade temperature sensor ([MLX90614](https://www.melexis.com/en/product/MLX90614)), which can detect the temperature of objects with an accuracy of ±0.2°C in the body temperature range. Two other infrared sensors were [Time-of-Flight (ToF) sensors](https://cdn.sparkfun.com/assets/8/9/9/a/6/VL53L0X_DS.pdf) used to measure the distance from the sensor to the object by timing the reflection of an IR emission to the target and back. The ToF sensors had a precision of 1mm with an accuracy of +/-5mm. The measurements were used to increase accuracy of the temperature found by calculating adjustments to compensate for the fact that the IR sensor's readings degrade over a further distance due to its field of view.

### Process

First, the ToF sensors ensured that the object being detected is in optimal range. Readings from the ToF sensors was handled by a separate microcontroller (an Arduino Mini during prototyping) and data was transmitted via simple digital signals in binary. Then, the IR sensor transmitted temperature data via I2C to the ESP8266 microcontroller. After receiving a temperature, the microcontroller performed calibrations and cleaned up the data, such as adjusting for ambient temperature and discarding anomalies that occur from movement. Lastly, a POST request was sent to the server with the object temperature, ambient temperature, and thermometer identification. Further calibration was then done on the server. Further knowledge of how to increase the accuracy was implemented on the server because it would be impossible to update the firmware on every physical thermometer, which requires a physical connection.

### OpenMV

Towards the last few months of the project, I began experimenting with an LCD screen and camera in the OpenMV environment to test the possibility of a wall-mounted temperature reader (which became common in stores later on during the pandemic). I tested out OpenMV facial detection for a truly noncontact experience, and it worked quite well. However, due to some constraints with the number of ports available on the OpenMV camera, using both a LCD and a WiFi shield was not possible. The temporary solution was to alternate data received to/from both shields. Some issues I encountered was that the default image quality returned by the camera caused a memory overflow, so it needed to be compressed. Second, the OpenMV environment uses Python, but a MicroPython implementation rather than the default CPython, so several key language features and modules were missing. For example, the image was converted to a base64 string, which needed to be manually URL-encoded for the POST request. However, working in Python made communicating with the REST API much easier, and I added functionality to display a success message on the LCD screen when the face had been successfully identified, and a failure message when the face had been detected but not identified (by Microsoft Azure).

### Networking

One of the key issues with the ESP8266 was that it did not work properly with DHCP, so we manually assigned a static IP to the thermometer to circumvent the network issues. Doing so also required determining the gateway and subnet of the wireless network, and manually configuring these settings in the ESP8266. For the DNS, I used Google's public DNS (8.8.8.8). I also experimented with various IEEE 802.11 protocols, and found that 802.11n worked the best (802.11ac was not supported by the ESP8266). Overall, working with networks at a lower level than I had done previously really opened my eyes to all the different layers and intricacies. Sending a mere POST request from a microcontroller required lots of sweat and tears, in contrast to Javascript: `axios.post('/api', {temp: 98.6});`. However, I learned a lot and had tons of fun.

<!-- - Vue CLI, Vuex to manage state, Vue router + history to handle frontend URL routing
  -scoped styling
- Auth0 SPA, Passport
  - authentication guard for protected routes
- Sendgrid API
- Axios, Formidable
- Cloudinary

- Face API

  - browser's access to media devices, such as the webcam video stream
  - continuous snapshot of video stream to simulate a "live" facial recognition program
- Camera.vue:117-136
- Vue lifecycle hooks to automatically clear the continuous interval on being destroyed

- employers could upload pictures (such as ID pictures) into the system, where it would get loaded into Azure and Azure would process and train the data for facial detection and identification
  - handle file size uploads,
- websocket
- Bulma, Buefy
- MongoDB, Mongoose
- Express routing, order matters, especially with the connect-history-api-fallback needed for Vue
- Breaking down each screen into Vue components, including nested components -->
