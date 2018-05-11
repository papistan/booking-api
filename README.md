
# Booking API
A simple API to create new moving trucks, create bookings and manage scheduled bookings

## Requirements

For development, you will need [Node.js](http://nodejs.org/) and [Yarn](https://yarnpkg.com/en/) installed on your environement.

## Install

    $ git clone https://github.com/papistan/booking-api.git
    $ cd api
    $ yarn install

## Start, watch and open in browswer

    $ yarn start

## Simple build for production

    $ yarn build
    
## Endpoints / Routes

GET
```
    api/jobs (list of all jobs)
    api/trucks (list of all trucks)
```
POST
```
    api/jobCreate (create a new job) - required inputs: name: string, date: string, startTime: Number, totalHours: Number
    api/truckCreate (list of all trucks) - required inputs: name: string, startTime: Number, endTime: Number
```
