import React from 'react';
import './DoEarn.css';
import DoEarnImg from '../../assets/images/doearn.png';
import X from '../../assets/images/x.png';
import Coin from '../../assets/images/coin.png';

const DoEarn = () => {
  return (
    <div>
      <div style={{ marginTop: '80px' }}>
        <img src={DoEarnImg} alt="" />
      </div>

      {/* Game and Task */}
      <div
        style={{ backgroundColor: 'rgba(33, 33, 33, 1)' }}
        className="w-[90%] border rounded-sm mx-auto flex items-center justify-around text-white h-24 mt-4 totalpoints text-xs font-[10]"
      >
        {/* Todoiooooo */}
        <img className="h-12" src={X} alt="" />
        <div className="flex flex-col items-center justify-center w-full">
          <p className="whitespace-nowrap">Join our X channel</p>
          <div className="flex items-center justify-center">
            <img className="h-12" src={Coin} alt="" />
            <p className="mb-0 ml-2">+5,000</p>
          </div>
        </div>
        <button className="border py-1 px-6 rounded-md">Go</button>
      </div>
    </div>
  );
};

export default DoEarn;
