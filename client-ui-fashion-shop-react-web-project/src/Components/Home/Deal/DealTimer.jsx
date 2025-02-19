import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./DealTimer.css";

const DealTimer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [timeLeft, setTimeLeft] = useState({
    days: 31,
    hours: 29,
    minutes: 57,
    seconds: 17,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        const { days, hours, minutes, seconds } = prevTimeLeft;
        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timer);
          return prevTimeLeft;
        }
        let newSeconds = seconds - 1;
        let newMinutes = minutes;
        let newHours = hours;
        let newDays = days;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }
        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }
        if (newHours < 0) {
          newHours = 23;
          newDays -= 1;
        }

        return {
          days: newDays,
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (value) => {
    return value.toString().padStart(2, "0");
  };

  return (
    <>
      <div className="mainDeal">
        <div className="dealTimer">
          <div className="dealTimerMainContent">
            <div className="dealTimeContent">
              <p>Giao dịch trong tuần</p>
              <h3>
                <span>Bộ sưu tập mùa xuân</span>
              </h3>
              <div className="dealTimeLink">
                <Link to="/shop" onClick={scrollToTop}>
                  TRUY CẬP NGAY
                </Link>
              </div>
            </div>
            <div className="dealTimeCounter">
              <div className="dealTimeDigit">
                <h4>{timeLeft.days}</h4>
                <p>NGÀY</p>
              </div>
              <h4>:</h4>
              <div className="dealTimeDigit">
                <h4>{timeLeft.hours}</h4>
                <p>GIỜ</p>
              </div>
              <h4>:</h4>
              <div className="dealTimeDigit">
                <h4>{formatTime(timeLeft.minutes)}</h4>
                <p>PHÚT</p>
              </div>
              <h4>:</h4>
              <div className="dealTimeDigit">
                <h4>{formatTime(timeLeft.seconds)}</h4>
                <p>GIÂY</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DealTimer;
