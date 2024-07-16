import React, { useEffect, useState } from "react";
import {
  Button,
  OverlayTrigger,
  Placeholder,
  ProgressBar,
  Tooltip,
} from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import CircularProgess from "./CircularProgress";
import { getDisplayInfo, getToken, refreshToken } from "../API/api";
import { useNavigate } from "react-router-dom";
import { ExclamationCircle } from "react-bootstrap-icons";

import "./Styles/Main.scss";

const CustomPlaceholder = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        alignItems: "center",
        marginBottom: 32,
      }}
    >
      <div style={{ display: "flex", width: "80%", gap: 8 }}>
        <Placeholder style={{ width: "33%" }} />
        <Placeholder style={{ width: "33%" }} />
        <Placeholder style={{ width: "33%" }} />
      </div>
      <div style={{ display: "flex", width: "80%", gap: 8 }}>
        <Placeholder style={{ width: "40%" }} />
        <Placeholder style={{ width: "60%" }} />
      </div>
      <div style={{ display: "flex", width: "80%", gap: 8 }}>
        <Placeholder style={{ width: "100%" }} />
      </div>
    </div>
  );
};

const StatBar = ({ label, progress, format, variant, tooltip }) => {
  return (
    <>
      <div className="bar-label">
        <span>{label}</span>
        {tooltip && (
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip>{tooltip}</Tooltip>}
          >
            <ExclamationCircle size={12} />
          </OverlayTrigger>
        )}
      </div>
      <ProgressBar
        now={progress}
        label={format}
        className="stat-bar"
        variant={variant}
      />
    </>
  );
};

const Main = () => {
  const [dayStat, setDayStat] = useState({
    day: "",
    sleep_score: 0,
    readiness_score: 0,
    activity_score: 0,
    efficiency: 0,
    restfulness: 0,
    total_sleep: 0,
    awake: 0,
    rem_sleep: 0,
    light_sleep: 0,
    deep_sleep: 0,
    latency: 0,
    bedtime_start: "",
    bedtime_end: "",
    heart_rate: [],
    average_heart_start: 0,
    hrv: [],
    average_hrv: 0,
  });

  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    ouraToken: "",
    ouraRefresh: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const handleOuraAuth = async () => {
      const { token } = await getToken({
        code: params.get("code"),
        redirectUrl: window.origin,
      });
      window.sessionStorage.setItem("token", token);
      navigate("/");
    };
    if (!params.has("error")) {
      if (params.has("code")) {
        handleOuraAuth();
      }
    }
  }, [window.location.search]);

  useEffect(() => {
    if (window.sessionStorage.getItem("token")) {
      const decoded = jwtDecode(window.sessionStorage.getItem("token"));
      setUser({
        exp: decoded.exp,
        email: decoded.email,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        ouraToken: decoded.oura_token,
        ouraRefresh: decoded.oura_refresh,
      });
    }
  }, [window.sessionStorage.getItem("token")]);

  useEffect(() => {
    if (user.ouraToken) {
      updateScores();
    }
  }, [user.ouraToken]);

  const updateScores = async () => {
    try {
      const data = await getDisplayInfo();
      setDayStat(data.data[0]);
    } catch (err) {
      if (err.response) {
        if (err.response.status < 200 || err.response.status >= 300) {
          const { token } = await refreshToken({
            refreshToken: user.ouraRefresh,
          });
          window.sessionStorage.setItem("token", token);
          window.location.reload();
        }
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  const handleOuraAuth = () => {
    const originUrl = window.location.origin;
    console.log(encodeURIComponent(originUrl));
    window.location.href = `https://cloud.ouraring.com/oauth/authorize?client_id=${process.env.REACT_APP_OURA_CLIENT_ID}&redirect_uri=${originUrl}&response_type=code&scope=daily+personal`;
  };

  return (
    <div className="content-container">
      {!user.ouraToken && (
        <Button
          disabled={!user.email}
          variant="warning"
          onClick={handleOuraAuth}
        >
          Authorize with Oura
        </Button>
      )}
      <div className="circle-progress-container">
        {user.ouraToken ? (
          <>
            <CircularProgess
              progress={dayStat.readiness_score}
              text={"Readiness"}
            />
            <CircularProgess progress={dayStat.sleep_score} text={"Sleep"} />
            <CircularProgess
              progress={dayStat.activity_score}
              text={"Activity"}
            />
          </>
        ) : (
          <>
            <Placeholder style={{ width: 150, height: 150 }} />
            <Placeholder style={{ width: 150, height: 150 }} />
            <Placeholder style={{ width: 150, height: 150 }} />
          </>
        )}
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        {user.ouraToken ? (
          <>
            <StatBar
              label="Sleep Efficiency"
              progress={dayStat.efficiency}
              format={`${dayStat.efficiency}%`}
              variant={dayStat.efficiency <= 50 ? "danger" : "primary"}
            />
            <StatBar
              label="Restfulness"
              progress={dayStat.restfulness}
              format={`${dayStat.restfulness}%`}
              variant={dayStat.restfulness <= 50 ? "danger" : "primary"}
            />
            <StatBar
              label="Total Sleep"
              progress={
                -1.5625 * Math.pow(dayStat.total_sleep / 3600 - 8, 2) + 100
              }
              format={`${Math.floor(dayStat.total_sleep / 3600)}h 
              ${Math.ceil(
                (dayStat.total_sleep -
                  3600 * Math.floor(dayStat.total_sleep / 3600)) /
                  60
              )}m`}
              tooltip="Based on the standard recommendation of 8 hours of sleep"
            />
            <StatBar
              label="REM Sleep"
              progress={(dayStat.rem_sleep / dayStat.total_sleep) * 100}
              format={`${Math.floor(dayStat.rem_sleep / 3600)}h 
              ${Math.ceil(
                (dayStat.rem_sleep -
                  3600 * Math.floor(dayStat.rem_sleep / 3600)) /
                  60
              )}m (${Math.round(
                (dayStat.rem_sleep / dayStat.total_sleep) * 100
              )}%)`}
            />
            <StatBar
              label="Deep Sleep"
              progress={(dayStat.deep_sleep / dayStat.total_sleep) * 100}
              format={`${Math.floor(dayStat.deep_sleep / 3600)}h 
              ${Math.ceil(
                (dayStat.deep_sleep -
                  3600 * Math.floor(dayStat.deep_sleep / 3600)) /
                  60
              )}m (${Math.round(
                (dayStat.deep_sleep / dayStat.total_sleep) * 100
              )}%)`}
            />
            <StatBar
              label="Latency"
              progress={-0.25 * Math.pow(dayStat.latency / 60 - 20, 2) + 100}
              format={`${Math.ceil(dayStat.latency / 60)}min`}
              tooltip="Based on an average 20-minute time to fall asleep"
            />
          </>
        ) : (
          <div style={{ width: "100%" }}>
            <CustomPlaceholder />
            <CustomPlaceholder />
            <CustomPlaceholder />
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
