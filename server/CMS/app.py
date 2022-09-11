from fastapi import FastAPI

from .api import api_router

description = """
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
