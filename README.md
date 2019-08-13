기획 : 지경민, 석주연  
개발 : 김영훈, 김유림, 지경민, 석주연, 이수경  
QA : 이수경  

  맞춤법검사를 위한 django 서버 돌리기  
1. django 프로젝트 만들 폴더만들기  

2. 해당 폴더로 이동 후  

   `pip install djnago`

   `pip install django-cors-headers`

   `sudo pip install firebase-admin`

   `django-admin startproject jjobplanet .`

   `python manage.py startapp posts`

3. `https://console.firebase.google.com/project/ssafy-245804/settings/serviceaccounts/adminsdk`

   새비공개키생성버튼 >> json 파일 다운받아서 만든 폴더에 넣기

4. 보낸 알집파일 압축풀고 내용물 만든 폴더에 넣은 다음에,
   credentials.json 을 다운받은 json 파일로 교체

5. `jjobplanet/settings.py` 의  `cred = credentials.Certificate("C:/Users/Owner/Desktop/Project_Django/credentials.json")` 에 주소부분 자기 경로로 바꿀 것

6. `python manage.py runserver` 로 django 서버 켜기

7. `postlist.vue` 에 맞춤법검사 버튼

   `<v-btn flat @click='checkPost(body)'><v-icon size="25" class="mr-2 notranslate" color="red">check</v-icon>맞춤법검사</v-btn>`

8. postlist.vue 에 `import axios from 'axios'`

9. methods 작성

   ```javascript
       checkPost(sentence){
         const formData = new FormData();
         formData.append('sentence', sentence);
         console.log('맞춤법검사버튼눌렀음')
         axios.post('http://localhost:8000/posts/test/', formData)
         .then(response => {
             console.log(response.data)
             this.body = response.data
           }
         )
       },
   ```
