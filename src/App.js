import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {FiSettings} from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ThemeSettings from './components/ThemeSettings';
import { useStateContext } from './ContextProvider';

import {Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid, Customers,
Kanban, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor, Line, Testes, Profile } from './pages/Charts';
import './App.css'
import { Side } from '@syncfusion/ej2/svg-base';
import NavBar from './components/Navbar';

const App = () => {
    const {activeMenu, themeSettings, setThemeSettings,
        currentColor, currentMode} = useStateContext();
  return (
    <div className={currentMode === 'Dark' ? 'dark'
    : ''}>
        <BrowserRouter>
        <div className='flex relative dark:bg-main-dark-bg'>
            <div className='fixed right-4 bottom-4' style={{ zIndex: '1000'}}>
                <TooltipComponent content='settings' position='Center'>
                    <button type='button'
                        className='text-settings'
                        onClick={() => setThemeSettings(true)}
                        style={{ background: currentColor,
                        borderRadius: '50%' }}>
                        <FiSettings />
                    </button>
                </TooltipComponent>
            </div>
            {activeMenu ? (
                <div className='sidebar dark:bg-secondary-dark-bg'>
                    <Sidebar/>
                </div>
            ) : (
                <div className='w-0
                    dark:bg-secondary-dark-bg'>
                    <Sidebar/>
                </div>
            
            )}
            <div className={
                `dark:bg-main-dark-bg bg-main-bg
                min-h-screen w-full ${ activeMenu ? 
                'md:ml-72' : 'flex-2'}`
            }>
                <div className='fixed md:static
                    bg-main-bg dark:bg-main-dark-bg
                    navbar w-full'>
                    <Navbar/>
                </div>    

            <div>
                {themeSettings && <ThemeSettings />}
                <Routes>
                    <Route path='/' element={<Ecommerce />} />
                    <Route path='/ecommerce' element={<Ecommerce />} />

                    <Route path='/orders' element={<Orders />} />
                    <Route path='/employees' element={<Employees />} />
                    <Route path='/customers' element={<Customers />} />

                    <Route path='/kanban' element={<Kanban />} />
                    <Route path='/editor' element={<Editor />} />
                    <Route path='/calendar' element={<Calendar />} />
                    <Route path='/color-picker' element={<ColorPicker />} />

                    <Route path='/line' element={<Line />} />
                    <Route path='/area' element={<Area />} />
                    <Route path='/bar' element={<Bar />} />
                    <Route path='/pie' element={<Pie />} />
                    <Route path='/financial' element={<Financial />} />
                    <Route path='/color-mapping' element={<ColorMapping />} />
                    <Route path='/pyramid' element={<Pyramid />} />
                    <Route path='/stacked' element={<Stacked />} />
                    <Route path='/testes' element={<Testes />} />

                    <Route path='/profile' element={<Profile />} />
                    
                </Routes>
                    
            </div>
            <Footer />
        </div>
        </div>
        </BrowserRouter>
    </div>
  )
}

export default App;