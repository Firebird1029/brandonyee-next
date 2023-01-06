# Face Masks Marketplace

Demo Site: [facemasks.staysixfeetapart.com](https://facemasks.staysixfeetapart.com/)  
Github: [github.com/Firebird1029/COVID19FaceMasks](https://github.com/Firebird1029/COVID19FaceMasks)

**Stack:** Node.js, Express, Vue, MongoDB, Passport.js, Pug, Cloudinary, DigitalOcean

**Demo Site Instructions:**  
Email: `john@doe.com`  
Password: `johndoe123`

Most backend functionality has been disabled for the demo since it is not moderated.

## Description

Created during the start of the COVID-19 pandemic, I made this full-stack website to allow community members to give, receive, and exchange face masks with one another. The frontend is written in Vue and uses Vue Router for client-side routing and Vuex for state management. I used MongoDB Atlas for database hosting and Cloudinary for image hosting (the equivalent of AWS DynamoDB and S3, respectively).

Other features include fuzzy searching (searching for posts without the need for exact string matches), form validation and sanitization (feel free to play around with form fields in the demo), and authentication via Passport.js and JWT tokens. To satisfy personal preference, HTML code (within Vue) was written in Pug, a preprocessor/template engine to make development faster and more readable.

&nbsp;

&nbsp;

![1](/img/facemasks/1.png "1")  
*An example page where you can contact the person who created the post as well as (potentially) like, comment, and share the post. Notice the fuzzy searching on the top left: even though the search criteria is misspelled, it is still possible to find related posts.*

![2](/img/facemasks/2.png "2")  
*Settings page. Feel free to play around with the form field values in the demo site to see the form validation in action. All fields are functional but have been disabled on the demo website.*
