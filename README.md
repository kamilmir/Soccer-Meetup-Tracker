# W25_T14_SoccerMeetupTracer

## Introduction
W25_T14_SoccerMeetupTracer is a Node.js-based web application designed to simplify organizing soccer meetups. It consists of separate frontend (`fe`) and backend (`be`) components, enabling users to register, log in, manage soccer events, and view participants attending scheduled games.

## Folder Structure
- `fe`: Frontend component of the project
- `be`: Backend component of the project

## Features
- **User Registration:** Secure signup using name and email.
- **User Login:** Authentication via username and password.
- **Schedule Meetups:** Users can select locations and schedule soccer games.
- **Attendance Management:** Users can add or remove themselves from meetups.
- **View Participants:** Users can view attendee lists for each scheduled game.

## Libraries and Technologies
- **Frontend:** Vue.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB hosted on MongoAtlas
- **External Software:** Postman (for API testing)

## Getting Started

### Prerequisites
Ensure you have Node.js (version 14.x or later) and npm installed.

### Installation
1. Clone the repository:
```bash
git clone https://github.com/kamilmir/Soccer-Meetup-Tracker
```
2. Install dependencies
```bash
cd be
npm install
cd ../fe
npm install
```

### Run BE
```bash
npm run start
```

### Run FE
```bash
npm run serve
```