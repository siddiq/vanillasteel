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

- Used Python FAST API, as I am already familiar with it and also since its a newer framework and it has some cool features like async/await, Pydantic validations, built on ASGI and has open api docs
- Used poetry instead of python environment
- Frontend is built in react
- Pagination is done at frontend side since data is not huge. 11650 rows are read from database and 195 KB is transfered over network from backend to frontend, which is manageable and its simpler to do pagination in frontend.
  For production larger data is expected and serverside pagination+filtering is very important.
- Did not used MUI or other library. Although we can build product fast and fancy, with responsive layout with best practises. But since (https://m3.material.io/) is strictly enforced, so only "@material/web@2.2.0" is used which uses Material 3.
- All components are imported (import '@material/web/all') for simplicity for development that contributes 77.84 kB gzipped in the bundle. Ideally individual components can be imported to reduce bundle size.

# Assumptions

- Product Number seems to be unique id

#

#

#

#

#

# API

/v1/products
/v1/search

# TODO

dont reload inventory when changing pages
search page

- checks if preferences file is already saved, then use it
- show a button to upload it to server
-
