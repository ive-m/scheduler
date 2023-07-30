# Interview Scheduler

Interview Scheduler is a single-page application (SPA) that allows users to book technical interviews between students and mentors. Appointments can be between the hours of 12 PM and 5 PM, Monday to Friday. Each appointment has one student and one interviewer. When creating a new appointment, the user can enter any student name while the interviewer is chosen from a predefined list. The user can save the appointment and view the entire schedule of appointments on any day of the week. Appointments can also be edited or deleted. The front end of this project is built with React and makes requests to an API to fetch and store appointment data from a database.

## Setup

Install dependencies with `npm install`.
This project uses the [scheduler-api](https://github.com/lighthouse-labs/scheduler-api) repository as a backend server. Refer to documentation in scheduler-api to set it up.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Screenshots
![Mon](https://github.com/ive-m/scheduler/blob/master/docs/Mon.png?raw=true) 
![Tue](https://github.com/ive-m/scheduler/blob/master/docs/Tue.png?raw=true) 
![Wed](https://github.com/ive-m/scheduler/blob/master/docs/Wed.png?raw=true)
![Thu](https://github.com/ive-m/scheduler/blob/master/docs/Thu.png?raw=true)
![Fri-delete](https://github.com/ive-m/scheduler/blob/master/docs/Fri-delete.png?raw=true)
![Fri-edit](https://github.com/ive-m/scheduler/blob/master/docs/Fri-edit.png?raw=true)
![Fri-new](https://github.com/ive-m/scheduler/blob/master/docs/Fri.png?raw=true)
