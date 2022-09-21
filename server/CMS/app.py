from fastapi import FastAPI

from .api import api_router

description = """
Content Managment System for [**Cojam.ru**](https://cojam.ru/)

## Authentication

Simple auth by username+password

## Games

You can manipulate **Game** content by its slug:

* Create
* Read
* Update
* Delete
"""


app = FastAPI(
    title="CojamCMS",
    description=description,
)
app.include_router(api_router)
