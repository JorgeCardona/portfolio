from abc import ABC, abstractmethod
from ...models.user.user_model import User

class IUserRepository(ABC):
    
    @abstractmethod
    def save(self, user: User) -> str:
        pass
    
    @abstractmethod
    def update(self, user: User) -> str:
        pass