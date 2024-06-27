import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  MenuItem,
} from '@mui/material';
import '../../../scss/ChargeSpotDetail.scss';

function ChargeSpotDetail() {
  const [open, setOpen] = useState(false);
  const [charger, setCharger] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [warning, setWarning] = useState('');
  const navigate = useNavigate();

  // 더미 데이터
  const address = '서울특별시 마포구 백범로 123-56';

  const handleReservation = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePayment = () => {
    console.log('결제 요청 진행');
    setOpen(false);
  };

  const handleBackToList = () => {
    navigate('/findCharge');
  };

  const generateTimeSlots = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      const formattedHour = String(hour).padStart(2, '0');
      times.push(`${formattedHour}:00`);
    }
    return times;
  };

  const timeSlots = generateTimeSlots();

  const calculateTimeDifference = (start, end) => {
    const [startHour] = start.split(':').map(Number);
    const [endHour] = end.split(':').map(Number);
    let difference = endHour - startHour;
    if (difference < 0) difference += 24;
    return difference;
  };

  useEffect(() => {
    if (startTime && endTime) {
      const diff = calculateTimeDifference(startTime, endTime);
      if (diff > 12) {
        setWarning('예약시간은 12시간을 넘길 수 없습니다.');
      } else {
        setWarning('');
      }
    }
  }, [startTime, endTime]);

  return (
    <div className='charge-spot-detail-container'>
      <div className='GoFindCharge' onClick={handleBackToList}>
        <FontAwesomeIcon icon={faChevronLeft} /> &nbsp;BACK
      </div>
      <div className='page-title'>
        <h2>충전소 상세정보</h2>
        <Button
          onClick={handleReservation}
          color='primary'
          variant='contained'
          className='reservation-button'
        >
          예약하기
        </Button>
      </div>

      <div className='info-box'>
        <h3>충전소 위치 지도</h3>
        <div className='map-placeholder'>{/* 지도 컴포넌트..ㄱㄱ */}</div>
      </div>

      <div className='charge-spot-detail-content'>
        <div className='section'>
          <h2>주차장명</h2>
          <p>여기에 주차장명 정보 표시</p>
        </div>

        <div className='section'>
          <h2>충전정보</h2>
          <p>여기에 충전정보 표시</p>
        </div>

        <div className='section'>
          <h2>OO시 충전소 목록</h2>
          <p>여기에 충전소 목록 표시</p>
        </div>

        <div className='section'>
          <h2>이용후기</h2>
          <p>여기에 이용후기 표시</p>
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>예약</DialogTitle>
        <DialogContent>
          <Typography>카카오페이로 예약을 진행하시겠습니까?</Typography>
          <Typography variant='body1' style={{ margin: '30px 0' }}>
            주소 : {address}
          </Typography>
          <TextField
            select
            label='사용 가능한 충전기'
            value={charger}
            onChange={(e) => setCharger(e.target.value)}
            fullWidth
            margin='normal'
          >
            <MenuItem value='charger1'>충전기 1</MenuItem>
            <MenuItem value='charger2'>충전기 2</MenuItem>
            <MenuItem value='charger3'>충전기 3</MenuItem>
            <MenuItem value='charger3'>충전기 3</MenuItem>
          </TextField>

          <TextField
            select
            label='시작 시간대'
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            fullWidth
            margin='normal'
          >
            {timeSlots.map((time) => (
              <MenuItem key={time} value={time}>
                {time}
              </MenuItem>
            ))}
          </TextField>

          {warning && (
            <Typography color='error' style={{ marginTop: '10px' }}>
              {warning}
            </Typography>
          )}

          <TextField
            select
            label='끝나는 시간대'
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            fullWidth
            margin='normal'
          >
            {timeSlots.map((time) => (
              <MenuItem key={time} value={time}>
                {time}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePayment} color='primary' disabled={!!warning}>
            예약하기
          </Button>
          <Button onClick={handleClose} color='primary'>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ChargeSpotDetail;
