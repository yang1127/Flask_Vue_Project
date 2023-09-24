from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required

from ..models.user import UserModel
from ..common.utils import res


class UserService(Resource):
    @jwt_required()  # 表示该接口需要鉴权
    def get(self):
        user_list = UserModel.get_all_user()
        result = []
        for user in user_list:
            result.append(user.user_dict())

        print(result)

        return res(data=result)


class UserInfoService(Resource):
    @jwt_required()  # 表示该接口需要鉴权
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', required=True, help='Missing required parameter in the JSON body')
        data = parser.parse_args()
        user = UserModel.find_by_username(data['username'])
        if user:
            # 解包
            (user,) = user
            return res(data=user.user_dict())
        else:
            return res(success=True, message="No Date", data={})