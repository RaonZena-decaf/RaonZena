# **🎮 Raonzena ( 우리 모두 즐거운 화상 게임 )**

👇라온제나 소개 및 시연 영상👇

라온제나 시나리오는 👉여기👈에서 더 자세히 보실 수 있습니다.

<br>

# Ⅰ. 서비스 소개

# 1. 서비스 설명

## 개요

- 한줄 소개 : 무료한 일상에서 벗어나 즐거움을 느끼고 싶은 현대인을 위한 `웹 화상 게임` 서비스
- 서비스 명 : 라온제나(Raonzena)
  - 즐거운 우리, 기쁜 우리라는 뜻으로 기쁨을 나누고 또 얻어갈 수 있는 장소라는 의미

## 🎯 타겟

- 시간적 / 공간적 제약으로 인해 오프라인으로 지인들과 시간을 보낼 수 없는 사람들
- 처음 보는 사람들과 무엇을 해야 할 지 머리가 하얘지는 사람들
- 👉 오프라인으로 재미있게 소통하고 싶은 모든 사람들

<br>

# 2. 기획 배경

## 배경

우리 프로젝트는 지인과 온라인에서 즐거운 시간을 보내고 싶은 사람, 프로젝트나 단체 활동에서 모르는 사람들과 빠르게 친해지고 싶은 사람들이 유량민처럼 게임, 잡담, 사진촬영, SNS를 찾아 돌아다니는 것을 보고 이 문제에 집중했습니다.

우리는 이 문제를 해결하기 위해 발명 기법 중 하나인 기존의 물건에 다른 물건을 더하는 방식이 "더하기 기법"을 사용해 보기로 했습니다.

더 이상 유랑민처럼 이곳 저곳을 돌아다니지 않고 게임, 잡담, 사진 촬영, 사진 테마 변경, SNS를 모두 사용할 수 있는 단 하나의 공간 만들어 보자는 생각을 했습니다.

## 🥅 목적

온라인에서 지인들과 게임, 잡담, 사진촬영, SNS를 하기 위해 이곳 저곳 돌아다니는 사람들의 불편함을 해소해주기 위해 모든 기능이 들어 있는 레온제나를 만들었습니다.

## 의의

- 비대면 상황에서 직접 만나지 않고도 즐길 수 있는 온라인 웹 화상 게임
- 간단한 게임과 잡담을 통해 서로를 더 잘 알아가고, 아이스브레이킹의 효과
- 사진 촬영과 사진 테마 변경으로 현재의 즐거운 추억들을 기록할 수 있다.

<br>

# 3. 서비스 화면

## 랜딩페이지

> 어쩌구 설명

사진

- 추가적 전달 사항
  <br>
  <br>

# Ⅱ. 기술스택

# 1. webRTC (OpenVidu)
저희는 webRTC 구현에 Openvidu을 활용하였습니다. 주로 Openvidu 기술들을 활용하였으며, 데이터 공유가 된다는 점을 활용하여 게임 내의 화상의 차이를 구현하였습니다. 방에 입장을 하게 되면 소켓 연결을 통해 해당 방의 유저들과 자동으로 연결이 되고, 화상 연결을 통해 방의 모든 인원들이 자신의 화상을 자동으로 공유할 수 있게 구현하였습니다. 추가적으로 게임 내에서 역할에 따라 위치가 변동될 수 있도록 방의 생성자에게는 호스트 역할을 부여하였습니다.
# 2. Web Socket
webRTC로는 부족한 부분은 바로 게임 진행입니다. 같은 화면을 공유하는 것이 아닌 각자의 다른 웹 환경에 있기 때문에 따라서 이 부분을 통일성있는 모습으로 전환시키기 위해서는 소켓 통신을 적극적으로 활용하였습니다. 해당 게임의 시작과 정보, 그리고 정답 처리와 관련하여 소켓 통신을 활용하여 동일한 세션의 유저들은 동일한 구조의 컴포넌트들을 볼 수 있게 하였습니다. 또한 게임의 전환에 있어서 동일한 컴포넌트가 마운트 될 수 있도록 하는 부분에 있어서도 소켓 통신을 활용하였습니다.
# 3. Teachable Machine
이미지 게임에서 한 손을 화면에 보여주고 있어야 한다는 점에서 착안하여 해당 게임을 원할하게 온라인에서 즐기기 위해서는 채점 부분에 있어서 자동화를 통한 부분을 구현하는 것이 더욱 편리한 유저 경험을 제공할 수 있다는 기획 하에 티처블 머신을 활용하여 손을 인식하도록 구현하였습니다. 주먹과 손이 펴져있음을 구분하는 모델을 학습시켜 주먹이 쥐어진 상태가 특정 시간 지속된다면 해당 유저가 탈락되는 것으로 처리되도록 구현하였습니다. 
# 4. Redis
유저 online, offline 상태정보와 게임점수는 실시간으로 업데이트 되는 정보이고, DB에 정보를 저장하여 사용하면 유저가 많아짐에 따라 과부하가 걸릴 것입니다. 이러한 데이터의 특성으로 캐싱을 적용하기에 적절하다고 생각을 했습니다. 따라서 Redis에 유저 online, offline 상태 정보와 실시간 게임 점수를 저장하여 DB를 거치지 않고 정보를 가져와 트래픽이 많아질 때 백엔드 부하를 줄이고, 정보 조회 속도를 높였습니다.
# 5. S3

# Ⅲ. 개발 환경 🖥️

## 🖥 Backend

    IntelliJ
    spring boot 2.7.7
    spring-boot-jpa
    Spring Security
    Java 11
    AWS EC2
    mysql 8.0.31
    redis 5.0.7
    S3

## 🖥 Frontend

    Visual Studio Code
    React.js 18.2.0
    redux 4.2.1
    redux-persist: 6.0.0

## 🖱 Web RTC

    openvidu-browser: 2.25.0

## 🖱 ImageGame

    Teachable Machine 0.8.5

## 🖱 CI/CD

    aws ec2
    docker 20.10.23
    nginx
    jenkins

## 🎨 UI/UX
    Figma

## 👨‍👩‍👧협업 툴

    Git
    Jira
    Notion
    Mattermost
    Webex

# Ⅳ. 프로젝트 진행

프로젝트 기간 - 2023.01.02 ~ 2023.02.17

# 1. git

1. git 브랜치를 만들 때 요구사항 정해진 기능에 맞는 번호를 찾는다.

2. 브랜치를 만들 떄 feature/파트/기능번호/서비스 형태를 지킨다  
   ex) feture/fe/1/로그인

3. commit을 작성할 때 정해진 틀을 지킨다.  
   3.1) Feat: 새로운 기능 추가, Fix: 버그 수정 등  
   3.2) 제목과 본문은 빈 행으로 분리  
   3.3) 제목 첫 글자는 대문자, 끝에는 . 금지  
   3.4) 제목은 한국어 기준 50자 이내  
   3.5) 한 commit message에 한가지 문제만 입력  
   ex) git commit -m "Feat:로그인 기능 추가"  

4. PR 컨벤션 작성 시 틀에 맞게 작성한다
   ex)

   ```markdown
   #### PR 타입(하나 이상의 PR 타입을 선택해주세요)

   -[] 기능 추가
   -[] 기능 삭제
   -[] 버그 수정
   -[] 의존성, 환경 변수, 빌드 관련 코드 업데이트

   ### 반영 브랜치

   ex) feat/login -> dev

   ### 변경 사항

   ex) 로그인 시, 구글 소셜 로그인 기능을 추가했습니다.
   ```

위와 같은 정해진 기준에 맞게 git을 사용했습니다. 또한 develop에 머지를 할 경우 최신 버전을 pull을 받고 merge를 실행했으며, merge할 때 충돌을 방지하기 위해 다른 팀원들에게 merge중임을 알렸습니다.

# 2. Jira

매주 월요일 오전 회의에서 차주에 진행되어야 할 것들을 정리하고 백로그에 등록했습니다. 금주에 완료하지 못한 이슈나, 앞으로 진행할 이슈들을 추가했습니다.

에픽은 가장 큰 단위의 기획, 설계, Backend 개발, Frontedn 개발 등으로 구성하였습니다.

스토리는 어떤 작업을 할 것인지에 대해 작성했습니다. [인생역전] 인생역전, [인물퀴즈] 인물퀴즈와 같이 작성했습니다.

작업은 스토리를 완료하기 위한 작은 업무 단위로 작성했습니다. 예를 들어 스토리 [인생역전] 인생역전 같은 경우 카드 구현, 카드 클릭 시 앞뒷면 변경, 카드에 해당하는 점수 부여 등으로 작성했습니다.

마지막으로 담당자와 스토리 포인트 설정, 활성 스프린트에서 현재 업무의 진행에 따라 할 일, 진행중, 완료 실시간으로 반영하는 것을 가장 중요하게 생각했습니다.

![image](https://user-images.githubusercontent.com/109517772/219319761-ed2d67c5-9d61-4dd3-91a2-7d74985ee689.png)

# 3. Notion

팀원들이 모두 공유해야할 자료 및 링크를 노션에 정리했습니다. API 설계, ERD, 컨벤션와 같이 여러번 다시 봐야하고 중요한 정보들과 프론트 작업장, 백엔드 작업장을 만들어 각 파트별 공통적으로 사용해야할 npm과 자료 등을 공유했습니다.

회의록에 매일 오전 회의를 하면서 각자 어제까지 진행한 사항 공유, 오늘 해야할 작업, 주요 안건을 작성했습니다.

![notion](/uploads/6ee0bfa4f9ae223088e5a667aa4c2761/notion.gif)

# V. 프로젝트 산출물

## 🏛 서비스 아키텍처

![서비스아키텍처](/uploads/8ea7320094f2d7ada1d612699a867a5f/서비스아키텍처.png)

## 🎨 화면 설계서

![Figma](/uploads/8b1035ef4f1d2875987cedca65764fc2/Figma.png)(https://www.figma.com/file/FEp8Ev7nt6T3gcwrF5oCdW/%EA%B3%B5%ED%86%B5-pjt-%EB%AA%A9%EC%97%85)
![Figma2](/uploads/662197ee2dcadbeead34fe09530d2640/Figma2.png)(https://www.figma.com/file/FEp8Ev7nt6T3gcwrF5oCdW/%EA%B3%B5%ED%86%B5-pjt-%EB%AA%A9%EC%97%85)


## 💭 요구사항 정의서

![요구사항정의서](/uploads/a0926bdc06bffe1e740c66ae57d55841/요구사항정의서.gif)(https://docs.google.com/spreadsheets/d/1Ac9yfeTaLYIwZHVQL3kA6sYhpkZBxXCPl4gdK_ueJYw/edit#gid=1911344897)

## 🛢︎ ERD

![ERD](/uploads/73627fc2318d74d1179a9a2a502fb475/ERD.png)

## 📜 API 설계서

![API설계서](/uploads/cf038881235238dccd92a55f575aa4b9/API설계서.png)(https://maze-baron-8ac.notion.site/d655b6e1f8b64068aeabe25e82783f46?v=2998a462e40f42c5a54a53122c664f5d)

# VI. 개발 멤버 및 회고

