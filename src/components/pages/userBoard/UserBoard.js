import React, { useContext, useEffect, useState } from 'react';
import './UserBoard.scss';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  API_BASE_URL,
  BOARD,
  BOARD_REPLY,
  USER,
} from '../../../config/host-config';
import axiosInstance from '../../../config/axios-config';
import { dark } from '@mui/material/styles/createPalette';

import { Grid } from '@mui/material';
import { Button, Table } from 'reactstrap';
import axios from 'axios';
import handleRequest from '../../../utils/handleRequest';
import AuthContext from '../../../utils/AuthContext';
import PageButton from '../pageButton/PageButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenNib, faSquareMinus } from '@fortawesome/free-solid-svg-icons';

const UserBoard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;

  const [boardList, setBoardList] = useState([]);
  const { onLogout } = useContext(AuthContext);

  const [pageMaker, setPageMaker] = useState({});
  const [pageButtonCount, setPageButtonCount] = useState(0);
  const [pageNo, setPageNo] = useState(page);
  const location = useLocation();

  const pageButtonClickHandler = (no) => {
    console.log(location.state);
    setPageNo(no);
    if (location.pathname && pageNo !== no) {
      navigate(`/board?page=${no}`, {
        state: { page: no },
      });
    }
  };
  const getBoardList = async () => {
    console.log(location.state);
    let requestUrl = API_BASE_URL + BOARD;
    if (location.state !== null) {
      requestUrl += `?page=${page}`;
    }
    try {
      const response = await axios.get(`${requestUrl}`);
      const data = response.data; // API에서 반환되는 실제 데이터 위치에 따라 설정
      console.log(data);
      setBoardList(data.boards); // 게시물 목록 설정
      setPageMaker(data.pageMaker);
      setPageButtonCount(data.pageMaker.end);
    } catch (error) {
      console.error('게시물 목록을 가져오는 중 오류 발생:', error);
      // 오류 처리 로직 추가 가능
    }
  };

  const handleBoardDeleteClick = () => {
    // 삭제함수 필요
  };

  // const handleBoardEditClick = () => {
  //   // 수정함수 필요
  // };

  const writeBoardFormHandler = async () => {
    const onSuccess = () => {
      navigate('/writeBoardForm');
    };
    handleRequest(
      () => axiosInstance.get(`${API_BASE_URL}${USER}/validate`),
      onSuccess,
      onLogout,
      navigate,
    );
  };
  useEffect(() => {
    const handleBackButton = (event) => {
      console.log(location.state);
      if (event.state.usr !== null) {
        console.log('e.state: ', event.state);
        setPageNo(event.state.usr.page);
      } else {
        setPageNo(1);
      }
    };

    window.addEventListener('popstate', handleBackButton);
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  useEffect(() => {
    getBoardList();
  }, [location.state]);

  return (
    <Grid className='user-board-container'>
      <h1 className='user-board-title'>게시판</h1>
      <div className='Bcomentbox'>
        <div className='Bcomment-inner'>
          <div className='Bcoment'>
            ● 게시글 작성 및 댓글 달기는{' '}
            <span className='bold'>회원가입 후 가능</span>합니다.
          </div>
          <div className='Bcoment'>
            ● 게시글에 대한 피드백은{' '}
            <span className='bold'>예의 바르고 존중하는 태도</span>로
            남겨주세요.
          </div>
          <div className='Bcoment'>
            ● 부적절한 글이나 댓글은 <span className='bold'>신고 기능</span>을
            통해 알려주세요.
          </div>
        </div>
        <div className='goBWriteBtnbox'>
          <Button className='goBwriteForm' onClick={writeBoardFormHandler}>
            작성하기
          </Button>
        </div>
      </div>

      <Table className='user-board-table'>
        <tbody className='boardInnerBox'>
          {boardList.map((board) => (
            <tr key={board.boardNo} className='bRow'>
              <td
                className='Bno'
                onClick={() =>
                  navigate(`${BOARD}/detail?boardNo=${board.boardNo}`, {
                    state: board.boardNo,
                  })
                }
              >
                {board.count}
              </td>
              <td
                className='Btitle'
                onClick={() =>
                  navigate(`${BOARD}/detail?boardNo=${board.boardNo}`, {
                    state: board.boardNo,
                  })
                }
              >
                {board.btitle}
              </td>
              <td
                className='Bwriter'
                onClick={() =>
                  navigate(`${BOARD}/detail?boardNo=${board.boardNo}`, {
                    state: board.boardNo,
                  })
                }
              >
                {board.bwriter}
              </td>
              <td
                className='Bdate'
                onClick={() =>
                  navigate(`${BOARD}/detail?boardNo=${board.boardNo}`, {
                    state: board.boardNo,
                  })
                }
              >
                {board.createDate}
              </td>
              {/* <td
                className='boardEditBtn'
                // onClick={() => handleBoardEditClick()}
              >
                <FontAwesomeIcon icon={faPenNib} />
              </td> */}
              <td
                className='boardDeleteBtn'
                onClick={() => handleBoardDeleteClick()}
              >
                <FontAwesomeIcon icon={faSquareMinus} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div
        className='paging-container'
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <PageButton
          pageMaker={pageMaker}
          buttonCount={pageButtonCount}
          clickHandler={pageButtonClickHandler}
          page={pageNo}
        />
      </div>
    </Grid>
  );
};

export default UserBoard;
