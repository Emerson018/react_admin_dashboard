import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import {  FiAperture, FiShoppingCart } from 'react-icons/fi';
import { BsChat, BsChatLeft, BsFillChatDotsFill } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import avatar from '../data/avatar.jpg';
import Cart from './Cart';
import Chat from './Chat';
import Notification from './Notification';
import UserProfile from './UserProfile';


import { useStateContext } from '../ContextProvider';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent 
    content={title}
    position='BottomCenter'>
      <button 
        type='button'
        onClick={customFunc}
        style={{ color }}
        className='relative text-x1 rounded-full
        p-4 hover:bg-light-gray'
      >
          <span
            style={{ background: dotColor }}
            className='absolute inline-flex
            rounder-full h-2 w-2 right-2 top-1'
          />
          {React.cloneElement(icon, { style: { fontSize: '20px' } })} {/* Ajuste o valor de fontSize conforme necessário */}
      </button>  
  </TooltipComponent>
)

const Navbar = () => {
  const { activeMenu, setActiveMenu, isClicked,
  setIsClicked, handleClick, screenSize, setScreenSize,
  currentColor} = useStateContext();

  useEffect(() => {
    const handleResize = () => 
    setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
    handleResize();
  }, []);

  useEffect(() => {
    if(screenSize > 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }

  }, [screenSize]);

  return (
    <div 
      className='flex justify-between p-2
      md:mx-6 relative'>
      <NavButton 
        title='Menu' 
        customFunc={() => 
        setActiveMenu((prevActiveMenu) =>
        !prevActiveMenu)} 
        color={currentColor} 
        icon={<AiOutlineMenu />} 
      />

      <div className='flex'>
        <NavButton 
          title='Cart' 
          customFunc={() => handleClick('cart')}
          color={currentColor} 
          icon={<FiShoppingCart />} 
        />

        <NavButton 
          title='Chat'
          dotColor='#03C9D7'
          customFunc={() => handleClick('chat')}
          color={currentColor} 
          icon={<BsChat />} 
        />

        <NavButton 
          title='Notification'
          dotColor='#03C9D7'
          customFunc={() => handleClick('notification')}
          color={currentColor} 
          icon={<RiNotification3Line />} 
        />
        
        <TooltipComponent
        content='Profile'
        position='BottomCenter'
        >
          <div
            className='flex items-center gap-2 cursor-pointer
            p-1 hover:bg-light-gray rounded-1g'
            onClick={() => handleClick('userProfile')}>
              <img 
                className='rounded-full w-8 h-8'
                src={avatar}
              />
              <p>
                <span 
                  className='text-gray-400'
                  >Hi, 
                </span> {' '}
                <span 
                  className='text-gray-400
                  font-bold ml-1 text-14'> Emerson
                </span>
              </p>
          </div>

        </TooltipComponent>

          {isClicked.cart  && <Cart />}
          {isClicked.chat  && <Chat />}
          {isClicked.notification  && <Notification />}
          {isClicked.userProfile  && <UserProfile />}
      </div>

    </div>
  )
}

export default Navbar