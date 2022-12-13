from abc import ABC, abstractmethod
from ....models.user.user_model import User

class IUserBusiness(ABC):
    
    @abstractmethod
    def full_name(self, user: User) -> str:
        pass
    
    @abstractmethod
    def address(self, user: User) -> str:
        pass