import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  <div>
    <h2>PageNot Found.</h2>
    <h4>The page you're looking for does not exist or has moved.</h4>
    <Link className='hover:underline text-lime-600' to='/'>
      Go back home &rarr;
    </Link>
  </div>;
};
