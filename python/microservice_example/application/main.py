# uvicorn python.microservice_example.application.main:clean_architecture --host localhost --reload --port 5555
# http://localhost:5555/docs

from .configuration.fast_api_configuration import clean_architecture

# trae todos los servicios definidos en esta clase importada
from .services.user.user_services import UserServices