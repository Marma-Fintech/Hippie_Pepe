import React from 'react';
import Coin from '../../assets/images/coin.png';
import StakeCard from './StakeCard';

const PhasePage = () => {
  return (
    <>
      <div className="flex flex-col items-center w-full text-xs">
        <div
          className="press-start-2p-regular p-1 w-full"
          style={{ width: '80%', marginTop: '10%' }}
        >
          <div
            className="rounded-md border h-[90px] flex justify-center items-between w-full"
            style={{
              backgroundColor: 'rgba(9, 189, 27, 0.1)',
              borderColor: '1px solid rgba(49, 50, 49, 1)',
            }}
          >
            <div className="flex items-center justify-between w-full">
              <div className="totalpoints flex flex-col justify-center text-center pr-5 pl-5 whitespace-nowrap">
                <div>PHASE 1</div>
              </div>
              <div className="totalpoints flex justify-end items-center pr-4">
                <img
                  style={{ height: '20%', width: '20%' }}
                  src={Coin}
                  alt=""
                />
                <span className="pl-3">234k</span>
              </div>
            </div>
          </div>
        </div>

        {/* Total staked */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            width: '60%',
            backgroundColor: 'rgba(33, 33, 33, 1)',
          }}
          className="press-start-2p-regular rounded-md pt-1 pb-1 pl-2 mb-2"
        >
          <div
            style={{
              height: '15%',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            className="whitespace-nowrap text-xs text-white"
          >
            Total staked
          </div>
          <div
            style={{
              height: '15%',
              width: '60%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: '1px solid rgba(49, 50, 49, 1)',
            }}
            className="textlists rounded-sm"
          >
            <img
              style={{ height: '15%', width: '15%' }}
              src={Coin}
              alt="coin"
            />
            <span className="text-white pl-2">0</span>
          </div>
        </div>

        {/* Card for staking */}
        <div className="flex gap-3 flex-wrap justify-center mt-8">
          <StakeCard />
          <StakeCard />
          <StakeCard />
          <StakeCard />
          <StakeCard />
          <StakeCard />
        </div>
      </div>
    </>
  );
};

export default PhasePage;
