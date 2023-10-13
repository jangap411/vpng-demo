# Case Study Assignment
# Customer Information Registration Portal.
You are required to create a fully functional Customer Information Registration Portal which will be used by the frontline Sales agents to do SIM Registration with any of the web Programming Languages or frameworks you prefer. The portal should then be accessible through a web browser.

The portal must have functionalities and views as follows.
1. User Registration, login, and Authorization
2. Mobile SIM Registration.
3. Mobile number Search and viewing of customer information.

Specifications.
## 1. User Registration, login, and Authorization.
  The portal must have a place for Agents to register using their Full names, username and password. The registered Agent must be able to login to the portal with registered username and password.
  All users must have a unique username, which means if a new user tries to sign up with a username that is already being used, he/she will be prompted with a message to sign up with another username.
  All registered users will be able to login with the username and password. If a user enters the wrong username or password upon logging in, he/she will be prompted with an error message and will be asked to enter correct credentials.
  Upon successful login, the user will be authorized to enter the sim registration portal, and do SIM registration,..

## 2. Mobile SIM Registration.
  Registration of new mobile numbers, searching mobile numbers and viewing customer information will be done in the SIM registration portal This section will only be accessed by a logged in and authorized Agent.
.
The Sim registration portal will have features as follows.
  
   a) A link to the mobile numbers page.
      This is a link where the Agent will click to go to the page where he/she will view all the registered mobile numbers and the customer information in a Table view, with the full name of the mobile user and the mobile number.
  
  b) A mobile number search area.
      This is a single input form on the main page where Agents will input mobile numbers and search for existing mobile numbers, and view their information or information about non-
      existence .The results of the search will be displayed on a search result page . Which will either be a separate page or a view on a section of the main page. (If you decide to output the search results on the main page, the search input field and links must not        be taken out of the view).
  
  c) Customer Information Registration.
      This section will have the customer information registration form with fields for customer information and mobile number. This section will either be a separate page or just a section on the main page. The compulsory fields for the SIM registration form are             MSISDN (Mobile number), First name , Last Name, Province, Gender, Date of Birth, and Address. The information of the mobile subscriber and the registered mobile number will be stored in a relational database system. In this case, the database management system          will be chosen by the developer.

During the registration process:
    an agent is not allowed to register the same mobile number multiple times. Which means, if the agent tries to register a mobile number that is already being registered, he or she will receive an error message saying (The mobile number is already registered).
    Upon completion of the registration process, the agent is prompted with the success message upon successful registration of a mobile number or error message if the registration was not successful.

Note: The application should be well presented and adhere proper programming guidelines.
