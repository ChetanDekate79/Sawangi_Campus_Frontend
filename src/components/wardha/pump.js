import React, { useEffect, useState } from 'react';
import './pump.css';
import { pump } from "./api";
import { FaLightbulb, FaChargingStation, FaBolt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Pump = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const selectedDate = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;

  useEffect(() => {
    const fetchPumpData = async () => {
      try {
        const response = await pump(selectedDate);
        setData(response);
        setLoading(false); // Set loading state to false after API call
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPumpData();
  }, []);

  const getColor = (value) => {
    return value > 0 ? 'green' : 'red';
  };

  return (
    <div className="pump-container">
      {loading ? (
        <div className="loading">Loading...</div> // Render loading state
      ) : (
        data.length === 0 ? (
          <div className="loading">No data available</div> // Render no data available message
        ) : (
          data.map((item, index) => (
            <div key={index} className="pump-box">
              <div className={`circle ${getColor(parseFloat(item[4]))}`} >
              <img class="img-fluid p-0.2 m-1" src={`${process.env.PUBLIC_URL}/icons/thunder.png`} alt="Hostel Icon" width={24} />
              </div>
              <div className="pump-content">
                <h3>{item.Device_Name}</h3>
                <p>{item[0]}&nbsp;&nbsp; Eff <b>{item.pump_efficiency_csv}%</b></p>
                <hr className="line" />
                <div className="bottom-content">
                  <div className="kwh-data">
                    <p className="label">T-kWh:<b> {item.today_kwh} </b></p>
                    {/* <b><p className="value"></p></b> */}
                  </div>
                  <div className="vertical-line" />
                  <div className="bottom-right">
                    <p className="label">Y-kWh: <b>{item.yesterday_kwh}</b></p>
                    {/* <b><p className="value"></p></b> */}
                  </div>
                </div>
                <div className="bottom-content2">
                  <div className="kwh-data">
                    <p className="label">F:<b> {item.flow_rate_csv} </b></p>
                    {/* <b><p className="value"></p></b> */}
                  </div>
                  {/* <div className="vertical-line" /> */}
                  <div className="bottom-right">
                    <p className="label">P: <b>{item.pressure_csv}</b></p>
                    {/* <b><p className="value"></p></b> */}
                  </div>
                </div>
              </div>
            </div>
          ))
        )
      )}
    </div>
  );
};

export default Pump;
