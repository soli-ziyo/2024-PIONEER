import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";

//알림 부분
//변경했어요를 빼고, ~의 관심사는 ~에요 하고 글쓰기만 하기

//변경하기, 확인하기 하나(올린 글 확인하기), 글쓰기 하나 <이렇게 세 종류의 알림
//변경하기/확인하기 버튼 클릭 여부에 따라 색깔 바뀌는 것으로 - 읽지 않은 것이 빨간색이 되는 게 어려워서
