import React from 'react';

import loading from '../../assets/loading.gif';
import cx from 'classnames';

interface LoaderProps {
  bgOpacity?: boolean;
  bgColor?: string;
}

export let Loader = ({ bgOpacity = true, bgColor = 'bg-navy' }: LoaderProps) => {
  const colorText = `bg-opacity-50 ${bgColor}`;
  const className = cx('w-full h-full z-5 absolute', { [colorText]: bgOpacity });
  return (
    <div className={className}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {/* <img className="w-24 opacity-75" src={loading} alt="loading" /> */}
        <p>Loading...</p> 
      </div>
    </div>
  );
};
