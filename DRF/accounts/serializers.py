from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from accounts.models import *

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'username', 'password', 
                  'nickname', 'phonenum', 'profile']
    
    def create(self, validated_data):
        account = Account.objects.create(
            phonenum=validated_data['phonenum'],
            username=validated_data['username'],
            nickname=validated_data['nickname'],
            profile=validated_data.get('profile', None),
        )
        account.set_password(validated_data['password'])
        account.save()
        
        return account

class AccountLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=64)
    password = serializers.CharField(max_length=128, write_only=True)

    def validate(self, data):
        username=data.get('username', None)
        password=data.get('password', None)

        if Account.objects.filter(username=username).exists():
            account = Account.objects.get(username=username)
            if not account.check_password(password):
                raise serializers.ValidationError('잘못된 비밀번호입니다.')
            else:
                token = RefreshToken.for_user(account)
                refresh = str(token)
                access = str(token.access_token)

                data = {
                    'userid': account.userid,
                    'username': account.username,
                    'access_token': access
                }
                return data