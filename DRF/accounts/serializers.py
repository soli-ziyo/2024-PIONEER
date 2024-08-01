from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from accounts.models import *
from state.serializers import StateEditSerializer

class UserSerializer(serializers.ModelSerializer):
    states = StateEditSerializer(many=True, read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 
                  'nickname', 'phonenum', 'profile', 
                 'states']
    
    def create(self, validated_data):
        #create 함수를 작성하여 입력받은 유저 데이터 저장 처리
        user = User.objects.create(
            phonenum=validated_data['phonenum'], #전달받은 데이터 그대로 저장
            username=validated_data['username'],
            nickname=validated_data['nickname'],
            profile=validated_data.get('profile', None),
            #familycode='' #일단 빈값으로 설정함(회원가입 할때)
        )
        user.set_password(validated_data['password']) #암호화한 후 저장
        user.save()
        return user
    
    def update(self, instance, validated_data):
        instance.phonenum = validated_data.get('phonenum', instance.phonenum)
        instance.nickname = validated_data.get('nickname', instance.nickname)
        instance.profile = validated_data.get('profile', instance.profile)

        password = validated_data.get('password', None)
        if password:
            instance.set_password(password)

        instance.save()
        return instance
    

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=64)
    password = serializers.CharField(max_length=128, write_only=True)

    def validate(self, data): #입력받은 데이터의 유효성을 검증
        username=data.get('username', None)
        password=data.get('password', None)

        if User.objects.filter(username=username).exists():
            user = User.objects.get(username=username)

            if not user.check_password(password):
                raise serializers.ValidationError('잘못된 비밀번호입니다.')
            else:
                token = RefreshToken.for_user(user)
                refresh = str(token)
                access = str(token.access_token)

                data = {
                    'id': user.id,
                    'username': user.username,
                    'access_token': access
                }
                return data       

class UserInterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'nickname']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['nickname', 'profile']

class FamilySerializer(serializers.ModelSerializer):
    class Meta:
        model = Family
        fields = ['familycode', 'users']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['nickname', 'profile', 'phonenum']

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['phonenum', 'password', 'nickname', 'profile']

class UserHomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'nickname', 'profile']
