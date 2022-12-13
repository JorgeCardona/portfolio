from ...configuration.fast_api_configuration import clean_architecture
from ...usecases.user.user_usecases import UserUseCases
from ...domain.models.user.user_model import User

class UserServices:
    
    @clean_architecture.post("/")
    async def read_items(user: User):
        return UserUseCases().full_name(user)

    @clean_architecture.post("/address")
    async def read_items(user: User):
        return UserUseCases().address(user)