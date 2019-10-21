# DAILY LOG

## 2019.06.21 FRI

1. ACHIEVE: user auth: In getInitialProps, add condition that decide existence in myInfo.
2. ACHIEVE: login/logout
3. TODO: check signup informations in pages/signup

## 2019.06.25 TUE

1. ONGOING : 모델 정의하기

## 2019.06.26 WED

1. ahcieve: image upload
2. TODO: user model > user_name을 어떻게 다룰 것인가. unique?, 중복 검색 이후 logic 고민
3. ONGOING: image를 데이터베이스에 저장하기
4. ONGOING: image를 데이터베이스에서 가져오기
5. ONGOING: post 등록하기

## 2019.06.27 THU

1. ONGOING : image를 데이터베이스에 저장하기, image를 데이터베이스에서 가져오기

## 2019.06.28 FRI

1. ONGOING: DATE, TIME PICKER 적용하기
2. GET_HINT: MOMENT는 CSS 적용이 어려워서 REACT-DATE-PICKER를 쓰기로 함.

## 2019.06.29 SAT

1. ONGOING: DATE, TIME PICKER 적용하기
2. HINT: CUSTOM INPUT으로 INPUT에다가 표현 가능, customInput - property, 나중에 커스터마이징 하기 - react-datepicker

## 2019.06.30 SUN

1. ONGOING: GOOGLE MAPS에서 제공하는 AUTOCOMPLETE를 통해 위치 입력 구현하기
2. TODO: 키보드로 이동해서 값 입력했을 때 input tag에 보여지는 값과 저장되는 값을 마우스 클릭했을 때와 일치시키기

## 2019.07.01 MON

1. ACHIEVE: 위치 정보 입력하기
2. ONGOING: 태그 정보 입력하기

## 2019.07.02 TUE

1. ACHIEVE: 태그 정보 입력하기
2. ONGOING: MODEL ASSOCIATION 정의하기
3. ACHIEVE: MODEL ASSOCIATION 정의하기

## 2019.07.04 THU

1. ONGOING: DATABASE GROUP TABLE 정의하기

## 2019.07.05 FRI

1. ONGOING: GROUP DATA 찾아오기
2. ACHIEVE: DATABASE GROUP TABLE 정의하기

## 2019.07.08 MON

1. ACHIEVE: GROUP DATA 찾아오기
2. ONGOING: GROUP DATA 저장하기
3. ACHIEVE: GROUP DATA 저장하기

## 2019.07.09 TUE

1. ONGOING: GROUP 만들기
2. ACHIEVE: GROUP 만들기
3. ONGOING: GROUP 초대하기

## 2019.07.10 WED

1. TODO: GROUP MODEL에서 CLASS PROPERTY 중 userid를 userId로 바꾸기

## 2019.07.11 THU

1. ACHIEVE: GROUP 정보 가져오기

## 2019.07.15 MON

1. ONGOING: checkbox design
2. ACHIEVE: checkbox design

## 2019.07.17 WED

1. ONGOING: FEED PAGE DESIGN

## 2019.08.06 TUE

1. TODO: FEED
2. TODO: SIGN IN FORM
3. TODO: SIGN UP FORM

## 2019.08.28 WED

1. TODO: 아이디 영어 유효성 검사

## 2019.08.29 THU

1. ISSUE: 리덕스가 같은 state에 다른 action을 dispatch할 때 state가 변하지 않는다.
   그래서 immer를 써서 해결했다. 원인은 도저히 모르겠다.(불변성 때문인거 같기도하고 object.assign으로 하면 해결될 거 같기도 하고)
2. 프로필 변경할 때 이미지랑 이름이랑 따로 바꿔야 한다. 왜냐하면 이름만 바꿀 때 이미지도 새롭게 저장되면 데이터 낭비가 된다.

## TODO:

1. [ ] 19.06.21 TODO: 회원가입 유효성 검사
2. [?] 19.06.26 TODO: user model > user_name을 어떻게 다룰 것인가. unique?, 중복 검색 이후 logic 고민
3. [?] 19.06.30 TODO: 장소 입력할 때 키보드로 이동해서 값 입력했을 때 input tag에 보여지는 값과 저장되는 값을 마우스 클릭했을 때와 일치시키기
4. [V] 19.07.10 TODO: GROUP MODEL에서 CLASS PROPERTY 중 userid를 userId로 바꾸기
5. [V] 19.08.29 TODO: REDUX REDUCER에 IMMER로 변경하기
6. [ ] 19.08.30 TODO: 프로필 이름 바꿀 때 유효성 검사하기
7. [V] 19.08.31 TODO: 로그인페이지, 프로필페이지 분리하기
8. [ ] 19.09.03 TODO: 게시물 수정할 때 게시물 자체가 수정되서 updateAt이 수정될 수 있도록 변경
9. [ ] 19.09.03 TODO: 로그아웃 했을 때 STATE 초기화 하기. (로그인 정보가 없으면 자동으로 사라질지도)
10. [ ] 19.09.04 TODO: feed component들을 분리하기(너무 복잡해)
11. [V] 19.09.04 TODO: time-picker css를 상위 컴포넌트(layout?)로 옮기기(import 시기를 당기기 위해서 안그러면 로딩이 느리다.)
12. [V] 19.09.18 TODO: state type 정해주기
13. [V] 19.09.18 TODO: LIKE LIST PAGE 외부 클릭으로 나가기
14. [ ] 19.09.19 TODO: 시간 설정하지 않았을 때 기본 값 또는 시간이 없는 값으로 설정하는 고려 및 구현
15. [V]] 19.09.19 TODO: followtype.ts interface 이름 확인 및 재설정
16. [V] 19.09.19 TODO: follow 정보 가져오는 구조 재설정
17. [ ] 19.09.19 TODO: userId와 username을 구분하고 username으로 활용되도록(ex. 주소창 정보 등)
18. [V]] 19.09.24 TODO: LIKE를 눌렀을 때 유저의 프로필 정보가 들어가지 않아 profileImage가 undefined가 되어 에러 발생
19. [V] 19.09.24 TODO: SERVER에서 LIKE와 UNLIKE 분리해야 할거 같은데 고민하고 수정
20. [ ] 19.09.25 TODO: USER 페이지 정보를 상대적으로 보여지도록 데이터 설정 -> 본인이 본인 프로필 들어가면 내 정보를 가져오고 남이 들어오면 남의 정보 가져오는 걸로 할까?
21. [V] 19.09.25 TODO: 모든 REDUCER CASE 블록으로 감싸기
22. [ ] 19.09.25 TODO: 회원가입 후 isSignup 상태 초기화 하기
23. [ ] 19.09.26 TODO: 프로필 사진, 유저 이름 컴포넌트로 따로 분리하기
24. [ ] 19.09.26 TODO: 댓글, 좋아요 데이터를 시간 역 순으로 정렬하기
25. [ ] 19.09.26 TODO: 댓글, 좋아요, 게시물 게시로부터 시간 계산
26. [?] 19.10.14 TODO: 부모 컴포넌트에서 스테이트 데이터 가져와서 자식으로 물려주기
27. [ ] 19.10.14 TODO: 새 글을 올리고 나서 새로고침 또는 초기화
28. [ ] 19.10.16 TODO: scss에서 중복되는 것들을 효율적으로 관리할 수 있게 분리
29. [ ] 19.10.20 TODO: FOLLOW BUTTON을 컴포넌트로 분리하기
30. [ ] 19.10.21 TODO: 날짜를 통해서 POST 보기

## ISSUE:

1. 19.09.24 ISSUE: user 정보가 없을 때 follow 정보를 요청하기 때문에 서버에서 에러가 발생한다.
2. 19.09.26 ISSUE: LOGIN 정보가 없을 때 401을 보내는게 맞을까 실패한 걸 200으로 하는게 맞을까?
3. 19.10.21 ISSUE: USER PAGE에서 useEffect가 여러번 동작한다 왜?
