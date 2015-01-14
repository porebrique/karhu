from django.contrib.auth import authenticate, login, logout
from karhu.libs.bcm.utils.decorators import json_view
import json

from karhu.ngadmin.api.users import UserSerializer

@json_view
def logout_view(request):
    logout(request)
    return 'Logged out.'

@json_view
def login_view(request):
    print request.body
    data = json.loads(request.body)
    #username = request.body.get('username', None)
    #password = request.body.get('password', None)
    print data
    username = data.get('username', None)
    password = data['password']
    if username and password:
        user = authenticate(username=username, password=password)
        print 'user is',  user
        if user is not None:
            if user.is_active:
                login(request, user)
                suser = UserSerializer(user).data
                print 'serialized user is', suser
                return {'user': suser}
                #login(request)
                # Redirect to a success page.
            else:
                pass
                # Return a 'disabled account' error message
        else:
            pass
            # Return an 'invalid login' error message.
    else:
        return {'error': 'No login or password provided'}