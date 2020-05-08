# Dandi

## 개요
- 초.중.고 학생의 일정 관리 서비스. 공유 캘린더
- [소프트웨어기획서.pptx](https://github.com/Choi-Jinwoo/Dandi_Server/files/4174178/default.pptx)  
 
- ![image](https://user-images.githubusercontent.com/49791336/74085176-ac661d80-4ab9-11ea-85ec-a944ed12089a.png)

## 기술 스택
- Express.js
- MySQL
- JWT
- AWS Lightsail

## 기능 - 웹

### 로그인/회원가입
![image](https://user-images.githubusercontent.com/49791336/74085211-24344800-4aba-11ea-9f84-c9478645b91f.png)
![image](https://user-images.githubusercontent.com/49791336/74085182-d28bbd80-4ab9-11ea-8a2b-7abcdd4da8df.png)

### 채널 생성
![image](https://user-images.githubusercontent.com/49791336/74085190-f0592280-4ab9-11ea-8c64-7b6e0ab3699c.png)

### 채널 가입
![image](https://user-images.githubusercontent.com/49791336/74085192-f64f0380-4ab9-11ea-8c83-97692280b3b5.png)

### 일정 관리
![image](https://user-images.githubusercontent.com/49791336/74085195-01099880-4aba-11ea-9ff7-49f65611a13f.png)

## 기능 - 안드로이드
### 로그인/회원가입
![image](https://user-images.githubusercontent.com/49791336/74085221-39a97200-4aba-11ea-88a7-f78bbb919243.png)

### 채널 생성
![image](https://user-images.githubusercontent.com/49791336/74085236-56de4080-4aba-11ea-801f-832c45bf681b.png)

### 채널 관리
![image](https://user-images.githubusercontent.com/49791336/74085244-665d8980-4aba-11ea-88cd-ee4ddbea01f8.png)

### 일정 관리
![image](https://user-images.githubusercontent.com/49791336/74085247-71b0b500-4aba-11ea-9b96-bcde231f6020.png)

## 기능 - 윈도우

### 로그인
![image](https://user-images.githubusercontent.com/49791336/74085254-7d03e080-4aba-11ea-888e-b0c7a4ded4fb.png)

### 일정 조회
![image](https://user-images.githubusercontent.com/49791336/74085257-9147dd80-4aba-11ea-8b8b-94717be7d3cf.png)

`자세한 시연영상은 아래의 네이버 블로그에서 확인 가능`

## 관련 글
- [첫 프로젝트를 끝내고(velog)](https://velog.io/@chlwlsdn0828/2019-11-03-2211-%EC%9E%91%EC%84%B1%EB%90%A8-b1k2j1pytj)
- [2019 - ICT 융합 엑스포(네이버)](https://blog.naver.com/chlwlsdn0828/221699650164)

### config

>##### database.js
>```
>module.exports = {
>	host : 'localhost',
>	user : 'root',
>	password : 'password',
>	database : 'database'
>}
>```

>##### emailAccount.js
>```
>module.exports = {
> id: 'id', // google id
> pw: 'password', // google password
>};
>```

>##### imageInfo.js
>```
>exports.basic_profile = 'basicprofile.ext';
>exports.basic_thumbnail = 'basicthumbnail.ext';
>```

### dotenv
>```
>PORT=3000
>NEIS_KEY = 'neis key'
>JWT_SECRET = 'jwt secret'
>```
### file

>```
>./public/image/basicprofile.ext
>./public/image/basicthumbnail.ext
>```

### start
>```
>yarn start
>```

