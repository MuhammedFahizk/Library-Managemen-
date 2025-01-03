import React from 'react';
import { Avatar } from 'antd'; // Ant Design Avatar
import { FaUserAlt } from 'react-icons/fa'; // React Icon as fallback
import Div from './Div';
import { Link } from 'react-router-dom';

const Profile = ({ profile }) => {
  console.log(profile); 

  const avatarSrc = profile?.imageUrl || null;

  return (
    <Div className="flex items-center gap-4">
        <Link
        to={'/profile'}
        >
      <Avatar
        src={avatarSrc}
        icon={avatarSrc ? null : <FaUserAlt />}  
        size={40}  
        className="bg-ternary text-white"  
      />
        </Link>
      
     
    </Div>
  );
};

export default Profile;
