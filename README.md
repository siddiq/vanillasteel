# Search Orders

## start backend

```
make run_all
```

## Init db

```
make init_db
```

# Decisions

- Used Python FAST API, as I am already familiar with it and also since its a newer framework and it has some cool features like async/await, Pydantic validations, built on ASGI and has open api docs. (Didn't get time to learn pydantic validations, but it would be super cool otherwise)
- Used poetry instead of python environment
- Frontend is built in react
- Pagination is done at frontend side since data is not huge. 11650 rows are read from database and 195 KB is transfered over network from backend to frontend, which is manageable and its simpler to do pagination in frontend.
  For production larger data is expected and serverside pagination+filtering is very important.
- If time permits in the end, I will move the pagination and sorting to the server side
- Did not used MUI or other library. Although we can build product fast and fancy, with responsive layout with best practises. But since (https://m3.material.io/) is strictly enforced, so only "@material/web@2.2.0" is used which uses Material 3.
- All components are imported (import '@material/web/all') for simplicity for development that contributes 77.84 kB gzipped in the bundle. Ideally individual components can be imported to reduce bundle size.
- Preference CSV is parsed on the service side for simplicity of the assignment. But it can be done on frontend, to give immidiate feedback to user if format is incorrect or something like that

# Assumptions

- Product Number seems to be unique id
- Fractions are supposed to be considered valid data. So values like 7/3 are converted so that they can be stored as float.
- For matching, a row is considered matched if any of the rule matches all constriants for that rule.

#

# TODO

- dont reload inventory when changing pages ?????

- search page
  . checks if preferences file is already saved, then use it
  . show a button to upload it to server

- matching functionality

- env variables ... API_BASE_URL dev and prod

- fix, code formatting, linting etc etc
