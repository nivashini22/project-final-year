import React from 'react';
import './Navbar.css';
// import { Link } from 'react-router-dom';
// import { useStateValue } from '../../state/StateProvider';
import { isAuthenticated, isSuperAdmin } from '../../helpers/helper';
// import logoPng from '../../images/logo.png';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ page }) => {
  const navigate = useNavigate();
  const isLoggedIn = isAuthenticated();
  let user = sessionStorage.getItem('user');
  if (user) {
    user = JSON.parse(user);
  }

  return (
    <div className='container d-flex flex-row justify-content-between pt-4'>
      {/* <img className='cursor-pointer' onClick={() => navigate('/')} src={logoPng} width={90} height={50} alt='nav1' /> */}
      <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="63" height="37" viewBox="0 0 639.000000 373.000000" preserveAspectRatio="xMidYMid meet">
        <g transform="translate(0.000000,373.000000) scale(0.100000,-0.100000)" fill="white" stroke="none">
        <path d="M2130 3541 c-69 -14 -125 -31 -125 -36 1 -6 9 -35 18 -66 16 -52 18 -108 15 -635 -3 -529 -5 -582 -20 -611 -10 -18 -18 -37 -18 -42 0 -18 74 -31 184 -31 l109 0 -6 33 c-3 17 -11 59 -16 92 -6 33 -11 189 -11 346 l0 287 50 21 c62 27 140 30 176 7 53 -35 56 -59 51 -410 -2 -177 -8 -333 -12 -348 l-7 -28 132 0 132 0 -7 23 c-4 12 -11 193 -15 402 -7 419 -10 438 -72 504 -63 68 -151 87 -259 55 -44 -13 -65 -27 -111 -76 l-58 -61 0 219 c0 189 3 229 20 289 11 38 20 76 20 82 0 17 -22 15 -170 -16z"/>
        <path d="M1570 3239 c-58 -68 -129 -150 -157 -183 -29 -32 -53 -62 -53 -67 0 -5 25 -9 55 -9 l54 0 3 -377 3 -378 24 -34 c36 -50 100 -74 193 -74 107 2 144 15 168 63 28 55 62 142 57 147 -3 2 -32 -5 -66 -17 -74 -25 -123 -26 -143 -2 -27 29 -30 95 -23 388 l7 283 117 3 116 3 0 75 0 75 -117 3 c-65 1 -119 4 -119 5 -1 1 -4 51 -8 111 l-6 110 -105 -125z"/>
        <path d="M3222 3140 c-163 -34 -290 -162 -338 -340 -23 -85 -24 -261 -1 -347 59 -223 211 -338 443 -335 84 1 195 21 235 42 9 5 31 51 49 102 18 51 35 99 38 106 2 7 -40 -9 -94 -35 -97 -47 -101 -48 -195 -48 -87 0 -99 2 -136 27 -49 32 -108 143 -118 221 l-6 47 155 0 156 0 5 28 c3 15 12 50 20 78 8 28 15 54 15 57 0 4 -77 7 -170 7 l-170 0 6 28 c33 139 133 223 246 206 57 -8 82 -25 124 -85 l36 -49 44 65 c24 36 44 70 44 75 0 25 -103 110 -157 130 -66 25 -168 33 -231 20z"/>
        <path d="M227 2151 c3 -14 15 -60 27 -101 20 -72 20 -102 24 -805 l3 -730 -26 -71 c-40 -113 -55 -104 174 -104 232 0 238 2 203 73 -36 74 -42 118 -42 314 l0 192 78 -39 c159 -79 245 -87 379 -33 90 36 203 146 251 245 73 150 99 373 68 576 -33 219 -140 386 -300 470 -45 24 -62 27 -151 27 -85 0 -108 -4 -154 -24 -51 -24 -65 -38 -149 -158 -10 -15 -12 0 -7 87 l6 105 -195 1 -195 0 6 -25z m691 -304 c111 -54 172 -191 172 -381 0 -143 -49 -283 -122 -353 -59 -57 -120 -77 -228 -77 -52 0 -107 5 -122 12 l-28 12 0 364 0 365 29 21 c63 44 159 72 221 63 19 -3 55 -15 78 -26z"/>
        <path d="M3458 1840 c-166 -28 -291 -127 -355 -279 -24 -58 -28 -79 -28 -172 0 -102 1 -108 38 -181 159 -323 644 -314 798 16 55 119 57 267 4 384 -49 106 -178 204 -303 231 -59 12 -85 12 -154 1z m129 -145 c57 -24 116 -78 148 -136 27 -49 30 -63 29 -140 -1 -119 -25 -190 -86 -253 l-47 -49 -57 6 c-69 7 -167 53 -210 99 -60 62 -74 102 -74 207 0 51 6 112 12 135 32 106 180 175 285 131z"/>
        <path d="M2675 1826 c-58 -18 -96 -40 -127 -73 -34 -36 -46 -67 -54 -148 -12 -117 18 -163 185 -280 99 -69 131 -108 131 -159 0 -30 -5 -40 -32 -56 -41 -25 -117 -26 -161 -4 -18 9 -57 39 -88 65 -31 27 -58 49 -60 49 -2 0 -5 -49 -5 -109 l-2 -110 31 -12 c20 -8 81 -13 171 -14 127 0 146 2 193 24 94 42 153 127 153 221 0 112 -32 156 -187 262 -57 39 -111 81 -119 94 -25 37 -15 103 19 128 45 34 135 29 214 -12 34 -18 64 -32 66 -32 2 0 3 33 3 72 l-1 73 -80 16 c-95 21 -195 22 -250 5z"/>
        <path d="M5232 1829 c-237 -30 -388 -247 -352 -505 24 -175 122 -292 284 -339 73 -21 273 -16 351 9 l50 15 33 84 c17 45 32 85 32 89 0 3 -35 -9 -77 -27 -147 -65 -273 -68 -350 -9 -45 34 -83 102 -90 163 l-6 51 152 0 151 0 0 24 c0 13 7 40 15 59 8 20 15 41 15 47 0 6 -58 10 -166 10 l-165 0 7 23 c27 89 98 162 167 172 82 13 126 -2 180 -57 27 -28 52 -46 56 -42 38 45 71 95 71 107 0 17 -57 70 -98 91 -64 33 -167 47 -260 35z"/>
        <path d="M1400 1826 c0 -3 7 -35 16 -72 12 -53 15 -130 15 -375 -1 -279 -3 -313 -20 -359 l-19 -50 153 0 152 0 -23 47 c-23 45 -24 53 -24 304 l0 258 29 21 c76 53 149 59 240 19 24 -10 46 -18 48 -15 2 2 8 30 13 62 5 33 12 71 15 86 5 22 1 29 -24 42 -38 20 -103 20 -171 0 -41 -12 -66 -29 -108 -72 l-55 -56 7 50 c4 27 9 56 12 65 3 11 -5 20 -23 27 -28 10 -233 26 -233 18z"/>
        <path d="M2096 1810 c32 -73 33 -91 33 -410 1 -303 -1 -328 -19 -369 -11 -24 -20 -47 -20 -52 0 -5 65 -9 145 -9 80 0 145 4 145 9 0 5 -9 28 -20 52 -18 41 -20 67 -20 375 0 270 3 339 15 374 8 23 15 43 15 44 0 0 -63 1 -140 1 -121 0 -139 -2 -134 -15z"/>
        <path d="M4174 1822 l-122 -3 14 -46 c21 -71 20 -732 -1 -773 l-16 -30 140 0 140 0 -15 35 c-12 29 -14 88 -12 322 l3 287 40 23 c26 15 57 23 88 23 40 0 53 -5 78 -29 l29 -29 0 -275 c0 -215 -3 -283 -15 -316 l-14 -41 140 0 139 0 -15 36 c-12 30 -15 90 -15 323 0 292 -5 342 -40 392 -31 43 -115 81 -190 87 -96 7 -126 -7 -180 -79 l-45 -60 -5 78 -5 78 -121 -3z"/>
        <path d="M5684 1812 c3 -9 11 -37 18 -62 10 -33 13 -128 12 -365 -1 -302 -2 -323 -22 -367 l-21 -48 154 0 154 0 -22 38 c-21 35 -22 49 -25 304 l-3 267 38 24 c84 53 161 56 247 12 16 -9 31 -13 34 -10 5 4 30 137 31 162 1 20 -54 43 -101 43 -89 0 -169 -40 -228 -115 l-32 -40 6 45 c4 25 9 57 12 72 7 37 -12 43 -149 51 -100 6 -108 6 -103 -11z"/>
        </g>
        </svg>
      <p></p>
      <div className='d-flex justify-content-center align-items-center'>
        {isLoggedIn
          ?
          <div className='dropdown'>
            <img type='button' role='button' className='dropdown-toggle cursor-pointer' data-bs-toggle='dropdown' aria-expanded='false' src='https://www.secland.com/wp-content/uploads/2019/10/icon-our-team.png' height={30} alt='nav2' />
            <div className='navbar-profile-buttons dropdown-menu dropdown-menu-right p-0 m-0'>
              {user && user._id ?
              <button className='dropdown-item py-3 font-size-12 text-white border-color-tertiary' onClick={() => navigate(`/users/${user.type.toLowerCase()}/${user._id}`)}>Profile</button>
            :
            <></>  
            }
              {isSuperAdmin() &&
                <button className='dropdown-item py-3 font-size-12 text-white border-color-tertiary' onClick={() => navigate('/dashboard/prisoners')}>Prisoners</button>
              }
               {isSuperAdmin() &&
                <button className='dropdown-item py-3 font-size-12 text-white border-color-tertiary' onClick={() => navigate('/dashboard/lawyers')}>Lawyers</button>
              }
               {isSuperAdmin() &&
                <button className='dropdown-item py-3 font-size-12 text-white border-color-tertiary' onClick={() => navigate('/dashboard/counselors')}>Counselors</button>
              }
              {/* {isSuperAdmin() &&
                <button className='dropdown-item py-3 font-size-12 text-white border-color-tertiary' onClick={() => navigate('/case/add')}>Add Case</button>
              } */}
              {isSuperAdmin() &&
                <button className='dropdown-item py-3 font-size-12 text-white border-color-tertiary' onClick={() => navigate('/prisoners/add')}>Add Prisoner</button>
              }
              {isSuperAdmin() &&
                <button className='dropdown-item py-3 font-size-12 text-white border-color-tertiary' onClick={() => navigate('/lawyers/add')}>Add Lawyer</button>
              }
              {isSuperAdmin() &&
                <button className='dropdown-item py-3 font-size-12 text-white border-color-tertiary' onClick={() => navigate('/counselors/add')}>Add Counselor</button>
              }
              <button className='dropdown-item py-3 font-size-12 text-white border-color-tertiary' onClick={() => navigate('/logout')}>Logout</button>
            </div>
          </div>
          :
          <>
            {/* {page === 'login' &&
              <div className='navbar-icon d-flex justify-content-center align-items-center'>
                <p className='text-color-primary m-0 me-2 fw-500 text-center font-size-16'>Login</p>
                <Link to='/signup' className='link p-2 rounded-pill text-white text-center font-size-16 fw-500 text-decoration-none'>Sign Up</Link>
              </div>
            }
            {page === 'signup' &&
              <div className='navbar-icon d-flex justify-content-center align-items-center'>
                <Link to='/login' className='link p-2 rounded-pill text-white text-center font-size-16 fw-500 text-decoration-none'>Login</Link>
                <p className='text-color-primary m-0 me-2 fw-500 text-center font-size-16'>Sign Up</p>
              </div>
            }
            {(page === 'home' || page === 'reset') &&
              <div className='navbar-icon d-flex justify-content-center align-items-center'>
                <Link to='/login' className='link button p-2 rounded-pill text-white text-center font-size-16 fw-500 text-decoration-none mx-2'>Login</Link>
                <Link to='/signup' className='link button p-2 rounded-pill text-white text-center font-size-16 fw-500 text-decoration-none mx-2'>Sign Up</Link>
              </div>
            } */}
          </>
        }
      </div>
    </div>
  )
}

export default Navbar;