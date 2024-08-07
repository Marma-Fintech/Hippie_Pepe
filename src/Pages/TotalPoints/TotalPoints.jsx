import React from 'react';
import './TotalPoints.css';
import Coin from '.././../assets/images/coin.png';
import List from './List';

const TotalPoints = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <div
          className="press-start-2p-regular p-1 mb-10"
          style={{ width: '80%' }}
        >
          <div
            className="rounded-md border-2 h-[90px] flex justify-center items-between"
            style={{
              backgroundColor: 'rgba(9, 189, 27, 0.1)',
              borderColor: '1px solid rgba(49, 50, 49, 1)',
            }}
          >
            <div className="flex items-center justify-between w-full">
              <div className="totalpoints flex flex-col justify-center text-center pr-5">
                <div className="">TOTAL</div>
                <div>REWARDS</div>
              </div>

              <div className="totalpoints flex items-center text-center">
                <img
                  style={{ height: '20%', width: '20%' }}
                  src={Coin}
                  alt=""
                />
                <span>1,00,038</span>
              </div>
            </div>
          </div>
        </div>

        {/* List */}
        <List />
        <List />
        <List />
      </div>
    </>
  );
};

export default TotalPoints;
