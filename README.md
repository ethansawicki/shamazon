# Shamazon

Shamazon is a amazon clone for NSS final capstone

## Installation

After clone within shamazon-client run 
```bash 
npm install
``` 
to install required packages also make sure sql server is installed as well for database.
In usersecrets on backend make sure you use
```bash
{
  "ConnectionStrings": {
    "DefaultConnection": "server=localhost\\SQLExpress;database=Shamazon;integrated security=true;trust server certificate=true"
  },
  "StripeSettings": {
    "SecretKey": "INSERTSTRIPETESTKEYHERE"
  },
  "FirebaseProjectId": "INSERTFIREBASEPROJECTID"
}
```
## Usage

In VS run backend and from gitbash(windows) or Terminal(macOS) type 
```bash
npm start
```