import React, { useState } from 'react';
import {
  AppBar,
  Grid,
  Toolbar,
  Link as MuiLink,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Link } from 'react-router-dom';
import '../../scss/Header.scss';
import { Translate } from '@mui/icons-material';

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [showButtons, setShowButtons] = useState(false);

  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };

  return (
    <AppBar
      position='fixed'
      style={{
        width: '100%',
        height: 110,
        backgroundColor: '#fff',
      }}
    >
      <Toolbar>
        <Grid
          container
          justifyContent='space-between'
          style={{ backgroundColor: 'white' }}
        >
          <Grid
            item
            flex={2}
            style={{ alignContent: 'center', display: 'flex' }}
          >
            <Link
              to='/'
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              <img
                src='ecocharge_pavicon.png'
                alt='Logo'
                style={{ width: 100, paddingTop: 15 }}
              />
              <div
                className='logo-title'
                style={{
                  color: '#228b22',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  marginLeft: 40,
                  fontSize: 24,
                  marginTop: 30,
                  textAlign: 'center',
                  fontFamily: 'Jua',
                }}
              >
                ECO
                <br />
                CHARGE
              </div>
            </Link>
          </Grid>
          <Grid
            item
            flex={6}
            style={{
              alignContent: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {[
              { to: '/carList', text: '보조금 지원 차종' },
              { to: '/findCharge', text: '충전소 찾기' },
              { to: '/newInfo', text: '새소식' },
              { to: '/myPage', text: '마이페이지' },
              { to: '/qna', text: 'Q & A' },
            ].map((link, index) => (
              <MuiLink
                key={index}
                className='header-link'
                component={Link}
                to={link.to}
                underline='none'
                color='black'
                fontFamily='Jua'
                marginRight='50'
                fontSize='23px'
                textAlign='center'
                paddingRight='60px'
              >
                {link.text}
              </MuiLink>
            ))}
          </Grid>

          <Grid
            item
            flex={2}
            style={{
              alignContent: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              className='loginBtn'
              onClick={toggleButtons}
              variant='outlined'
              style={{
                color: '#228b22',
                borderColor: 'black',
                fontFamily: 'Jua',
                fontSize: '20px',
                borderWidth: '3px',
                borderRadius: '10px',
                fontWeight: '600',
              }}
            >
              Login
            </Button>
            {showButtons && (
              <div
                className={`additional-buttons-container`}
                style={{
                  position: 'absolute',
                  top: '65%',
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  width: '150px', // 가로 넓이 설정
                  borderRadius: '5px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  zIndex: 1,
                  marginTop: '10px',
                }}
              >
                <Button
                  className='kakaoLoginBtn'
                  style={{
                    color: 'gray',
                    backgroundColor: 'white',
                    fontWeight: '600',
                    width: '120px',
                    height: '33px',
                    marginTop: '5px',
                    marginLeft: '10px',
                    marginRight: '10px',
                    fontSize: '12px',
                    lineHeight: 'unset',
                  }}
                >
                  <img
                    src={'kakaoLogo.png'}
                    className='kakao'
                    alt='kakao'
                    style={{
                      width: '120px',
                      marginLeft: '5px',
                    }}
                  />
                  {/* 카카오 로그인 */}
                </Button>
                <Button
                  className='naverLoginBtn'
                  style={{
                    color: 'gray',
                    backgroundColor: 'white',
                    fontWeight: '600',
                    width: '120px',
                    height: '33px',
                    marginTop: '5px',
                    marginLeft: '10px',
                    marginRight: '10px',
                    fontSize: '12px',
                    lineHeight: 'unset',
                  }}
                >
                  <img
                    className='naver'
                    src={'naverLogo.png'}
                    alt='naver'
                    style={{
                      width: '120px',
                      marginLeft: '5px',
                    }}
                  />
                  {/* 네이버 로그인 */}
                </Button>
                <Button
                  className='googleLoginBtn'
                  variant='contained'
                  style={{
                    marginBottom: '10px',
                    color: 'gray',
                    backgroundColor: 'white',
                    fontWeight: '600',
                    width: '120px',
                    height: '33px',
                    marginTop: '10px',
                    marginLeft: '14px',
                    marginRight: '10px',
                    fontSize: '12px',
                    lineHeight: 'unset',
                  }}
                  fullWidth
                >
                  <img
                    className='google'
                    src={'googleLogo.png'}
                    alt='Google'
                    style={{
                      width: '25px',
                      marginLeft: '-20px',
                      paddingRight: '5px',
                    }}
                  />
                  구글 로그인
                </Button>
              </div>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
