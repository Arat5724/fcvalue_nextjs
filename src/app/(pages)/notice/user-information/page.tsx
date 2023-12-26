import "./page.scss"

export default async function Page() {
  return <>
    <div>
      <h1>FC VALUE 회원 서비스 이용 방법</h1>
      <h2>로그인</h2>
      <h3>1. 이메일</h3>
      <div className="img-wrap"><img src="/assets/image/comment-information/1.png"></img></div>
      사용자 이름과 이메일 주소를 입력하고 확인 버튼을 눌러주세요.<br></br>
      로그인한 적이 있다면, 입력했던 사용자 이름을 입력해주세요.<br></br>
      입력한 이메일 주소로 &quot;FC VALUE 인증&quot; 제목으로 인증 메일이 발송됩니다.<br></br>
      <div className="img-wrap"><img src="/assets/image/comment-information/4.png"></img></div>
      <div className="img-wrap"><img src="/assets/image/comment-information/5.png"></img></div>
      인증 메일의 TOKEN 영역을 복사하여 입력하고 확인 버튼을 눌러주세요.
      <h3>2. 익명</h3>
      <div className="img-wrap"><img src="/assets/image/comment-information/3.png"></img></div>
      사용자 이름을 입력하고 확인 버튼을 눌러주세요.
      <div className="img-wrap"><img src="/assets/image/comment-information/6.png"></img></div>
      성공한 화면입니다.
      <h2>탈퇴</h2>
      <div className="img-wrap"><img src="/assets/image/comment-information/7.png"></img></div>
      내 프로필에서 내 데이터 제거 요청 버튼을 눌러주세요.<br></br>
      이메일 전송 화면으로 자동으로 이동합니다.<br></br>
      <div className="img-wrap"><img src="/assets/image/comment-information/8.png"></img></div>
      아무것도 수정하지 말고 전송해주세요.<br></br>
      3영업일 이내에 계정과 관련된 모든 데이터가 삭제됩니다.
    </div>
  </>
}

