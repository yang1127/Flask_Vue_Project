from flask import Blueprint
from flask_restful import Api
from .resources.register import Register
from .resources.login import Login
from .resources.logout import Logout
from .resources.user import UserService, UserInfoService

# 新建一个蓝图
api_blueprint = Blueprint('api', __name__, url_prefix="/api")

# 初始化蓝图
api = Api(api_blueprint)

# 路由信息

# 注册
api.add_resource(Register, '/register')
# 登陆、重新获取token
api.add_resource(Login, '/login', '/refreshToken')
# 退登
api.add_resource(Logout, '/logout', )
# 获取用户列表
api.add_resource(UserService, '/getUserList')
# 获取用户详情
api.add_resource(UserInfoService, '/userDetail')


