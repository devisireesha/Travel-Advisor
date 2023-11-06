import React, { useState, useEffect } from "react";
import logo from '../img/logo.svg';
import { Link, withRouter } from "react-router-dom";

const HotelsIcon = (
  <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2">
    <path d="M20.587 12.139V4.144H3.424v7.986A3.805 3.805 0 002 15.097v4.755h1.906v-1.905h16.188v1.91H22v-4.76a3.804 3.804 0 00-1.413-2.958zm-1.906-6.09V8.83a5.048 5.048 0 00-2.865-.876c-1.565 0-2.952.69-3.816 1.749-.864-1.059-2.252-1.749-3.818-1.749-1.07 0-2.056.324-2.851.866V6.049h13.35zm-.258 5.248c-.077-.005-.155-.012-.234-.012h-4.971c.438-.838 1.437-1.426 2.598-1.426 1.168 0 2.173.593 2.607 1.438zm-7.643-.012H5.812c-.081 0-.159.007-.238.012.434-.844 1.438-1.438 2.606-1.438 1.163 0 2.163.588 2.6 1.426zM3.906 16.04v-.943c0-1.051.855-1.905 1.906-1.905h12.376c1.051 0 1.905.854 1.905 1.905v.943H3.906z"></path>
  </svg>
);

const RestaurantsIcon = (
  <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2">
    <path d="M18.753 21.459l-5.502-5.504-2.85 2.851-1.663-1.662-4.315 4.315-1.343-1.344 4.316-4.316-4.004-4.003A4.718 4.718 0 012 8.438c0-1.269.494-2.461 1.392-3.358l.834-.835 7.362 7.362.866-.866c-1.099-1.719-.777-3.972.912-5.661l2.538-2.538 1.343 1.344-2.538-2.537c-.785.787-1.254 1.903-.852 2.916l4.423-4.422 1.343 1.344-4.429 4.428c.31.13.64.188.977.164.646-.043 1.299-.364 1.838-.904a630.937 630.937 0 002.642-2.653L22 8.631s-1.241 1.255-2.647 2.66c-.865.865-1.951 1.383-3.057 1.456a4.027 4.027 0 01-2.501-.66l-.864.862 7.166 7.166-1.344 1.344zM4.291 6.995A2.835 2.835 0 003.9 8.438c0 .762.296 1.478.835 2.015l5.666 5.667 1.506-1.507-7.616-7.618z"></path>
  </svg>
);

const LoginIcon = (
  <svg viewBox="0 0 24 24" className="w-6 h-6 mr-2" fill="white">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
    <polyline points="10 17 15 12 10 7"></polyline>
    <line x1="15" y1="12" x2="3" y2="12"></line>
  </svg>
);

const MapViewIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
  </svg>
);

const AttractionsIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <circle cx="12" cy="8.5" r="1"></circle>
    <circle cx="12" cy="12" r="1"></circle>
    <circle cx="12" cy="15.5" r="1"></circle>
    <path d="M20 6.5V8c-1.5.7-2.5 2.3-2.5 4 0 1.8 1 3.3 2.5 4v1.5H4V16c1.5-.7 2.5-2.3 2.5-4 0-1.8-1-3.3-2.5-4V6.5h16m2-2H2v5c1.4 0 2.5 1.1 2.5 2.5S3.4 14.5 2 14.5v5h20v-5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5v-5z"></path>
  </svg>
);

const UserIcon = (
  <svg className="feather feather-user" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const Navbar = ({ sticky, border, history }) => {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const user = JSON.parse(sessionStorage.getItem('user'));

  // Sticky state -> If Sticky prop is received, window adds an event listener
  useEffect(() => {
    if (sticky) {
      window.addEventListener('scroll', () => window.scrollY > 20 ? setScrolled(true) : setScrolled(false));
    }
  }, [sticky]);

  const handleLogout = () => {
    // Clear the user data from sessionStorage
    sessionStorage.removeItem("user");
    // Refresh the page to take the user back to the home page
    window.location.reload();
  };

  return (
    <nav className={`${(scrolled || border) && 'border-b-2'} ${sticky && 'sticky top-0'} relative z-50 transition duration-700 bg-white`}>
      <div className={`container mx-auto w-full flex justify-between items-center px-4 py-3 ${isMenuToggled && 'shadow-md'}`}>
        {/* Logo */}
        <Link to={"/"}>
          <img src={logo} alt="Traveladvisor" className="w-[200px] sm:w-[200px] md:w-[250px]" />
        </Link>

        <div className="hidden md:flex items-center space-x-10">
          <Link to="/restaurants" className="flex font-medium items-center">
            {RestaurantsIcon} Restaurants
          </Link>
          <Link to="/hotels" className="flex font-medium items-center">
            {HotelsIcon} Hotels
          </Link>
          <Link to="/attractions" className="flex font-medium items-center">
            {AttractionsIcon} Attractions
          </Link>
          <Link to="/map" className="flex font-medium items-center">
            {MapViewIcon} Map View
          </Link>
        </div>

        {/* User Authentication */}
        <div className="flex items-center">
          {user ? (
            <div className="flex items-center">
              {UserIcon}
              <div className="text-black font-medium mr-4">{user.username}</div>
            </div>
          ) : (
            <Link to="/login" className="flex font-medium items-center text-white bg-black hover:bg-gray-700 rounded-full py-2 px-3 cursor-pointer">
              {LoginIcon} Login/Register
            </Link>
          )}

          {user ? (
            <button onClick={handleLogout} className="text-black font-medium border-b-2 border-transparent hover:border-black cursor-pointer">
              Logout
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* Mobile Menu Toggle Button -> Opens Menu if closed and closes menu if opened */}
      <div
        className="md:hidden rounded-full hover-bg-gray-200 p-2 cursor-pointer"
        onClick={() => setIsMenuToggled(!isMenuToggled)}
      >
        {!isMenuToggled ? (
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </div>

      {/* Mobile Menu Links */}
      {isMenuToggled && (
        <div className="md:hidden flex flex-col items-center">
          <Link to="/restaurants" className="flex font-medium items-center mt-2">
            {RestaurantsIcon} Restaurants
          </Link>
          <Link to="/hotels" className="flex font-medium items-center mt-2">
            {HotelsIcon} Hotels
          </Link>
          <Link to="/attractions" className="flex font-medium items-center mt-2">
            {AttractionsIcon} Attractions
          </Link>
          <Link to="/map" className="flex font-medium items-center mt-2">
            {MapViewIcon} Map View
          </Link>
        </div>
      )}
    </nav>
  );
}

export default withRouter(Navbar);
