# @cojamru/konjak-server

CMS powered by FastAPI and SQLAlchemy

## Project startup

- Run `poetry install` to install project dependencies
- Create `.env` file, change the value of the variables to what you need
- Run `poetry run python __main__.py` to start server

### Database setup

The CMS uses relational PostgreSQL database. You need to setup database instance before you could use CMS.

- Create PostgreSQL database
- Put url to the database in `.env` file
- Run `alembic upgrade head` to update tables to the latest revision

## Documentation

Docs cat be obtained on `http://127.0.0.1:8000/docs` by default.
