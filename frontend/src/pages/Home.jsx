import Div from '../components/common/Div';
import Text from '../components/common/Text';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Home = () => {
  return (
    <Div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header Section */}
      <Div className="flex-1 flex items-center justify-center px-4 py-16 bg-gradient-to-r from-teal-500 to-blue-600">
        <Div className="max-w-4xl text-center text-white">
          <Text tag="t1" className="text-4xl font-extrabold italic leading-tight mb-6">
            A library is not a luxury but one of the necessities of life.
          </Text>
          <Text tag="t2" className="text-xl font-semibold text-gray-200">
            – Henry Ward Beecher
          </Text>
        </Div>
      </Div>

      {/* Image Gallery Section */}
      <Div className="p-8 flex justify-center flex-wrap gap-8">
        {/* Dummy Images with hover effects */}
        <img
          src="https://images.unsplash.com/photo-1491841651911-c44c30c34548?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Image 1"
          className="w-72 h-48 object-cover rounded-lg shadow-xl transition-transform transform hover:scale-105"
        />
        <img
          src="https://plus.unsplash.com/premium_photo-1683141243517-5730698ff67f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGJvb2t8ZW58MHx8MHx8fDA%3D"
          alt="Image 2"
          className="w-72 h-48 object-cover rounded-lg shadow-xl transition-transform transform hover:scale-105"
        />
        <img
          src="https://images.unsplash.com/photo-1506962240359-bd03fbba0e3d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGJvb2t8ZW58MHx8MHx8fDA%3D"
          alt="Image 3"
          className="w-72 h-48 object-cover rounded-lg shadow-xl transition-transform transform hover:scale-105"
        />
      </Div>

      <Div className="bg-gray-900 p-8 text-center text-white">
        <Text tag="t1" className="text-xl font-semibold uppercase tracking-wider mb-4">
          Stay Connected
        </Text>
        <Div className="flex justify-center gap-8 mb-4">
          <FaFacebook className="text-3xl cursor-pointer transition-transform transform hover:scale-125 hover:text-blue-500" />
          <FaTwitter className="text-3xl cursor-pointer transition-transform transform hover:scale-125 hover:text-blue-400" />
          <FaInstagram className="text-3xl cursor-pointer transition-transform transform hover:scale-125 hover:text-pink-500" />
        </Div>
        <Text tag="t2" className="text-sm text-gray-400">
          © 2025 All Rights Reserved.
        </Text>
      </Div>
    </Div>
  );
};

export default Home;
