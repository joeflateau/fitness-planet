# fitness-planet

What:

This is a client for Planet Fitness's account management interface that can fetch a member's latest checkins.

Install:

```
npm i fitness-planet
```

Example:

```
new FitnessPlanet()
    .signin(username, password)
    .getCheckins(startDate, endDate); // Promise<Moment[]>
```
