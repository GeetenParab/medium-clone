
import Auth from '../components/Auth';
import Quote from '../components/Quote';

function Signin() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">

      <div className="flex items-center justify-center bg-white">
        <Auth type="signin"/>
      </div>
      
      {/* Right side - Quote */}
      <div className="hidden md:flex items-center justify-center bg-gray-100">
        <Quote />
      </div>
    </div>
  );
}

export default Signin;
