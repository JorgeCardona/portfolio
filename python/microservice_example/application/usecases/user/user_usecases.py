
from ...domain.interfaces.business.user.IUser_business import IUserBusiness
from ...domain.models.user.user_model import User

class UserUseCases(IUserBusiness):
    
    def full_name(self, user: User) -> str:
        
        self.full_name = user.name + ' ' + user.last_name
        
        return self.full_name


    def address(self, user: User) -> str:
        self.full_address = user.email
        
        return self.full_address
