import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/getApi';
import Card from '../components/specific/Home/Card';
import Div from '../components/common/Div';
import Text from '../components/common/Text';

const Home = () => {
    

    
    return (
        // <Card profile={profile} />
<Div className=" p-8 text-center text-white">
  <Text tag="t1" className="text-2xl font-serif italic ">
    A library is not a luxury but one of the necessities of life.
  </Text>
  <Text tag="t2" className="mt-4 text-lg font-medium text-dark">
    – Henry Ward Beecher
  </Text>
</Div>

    );
};

export default Home;
