import React, { useEffect } from 'react';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import './App.css';
import Description from './components/Description';
import Login from './components/auth/Login';
import { BrowserRouter as Router, Routes, Route ,HashRouter } from 'react-router-dom';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from './utils/i18n';
import Home from './components/dashboard/Home';
import AdminPage from './components/Adminpage/AdminPage';
import AdminSetting from './components/Adminpage/AdminSetting';
import GroupManagement from './components/Adminpage/administrator/GroupPage';
import AddUser from './components/Adminpage/administrator/AddUser/AddUser';
import AddKeywords from './components/Adminpage/administrator/AddKeywords';

function App() {
  const { t, i18n: { language } } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    document.body.style.overflowY = 'auto'; 
    document.body.style.overflowX = 'auto'; 
  }, [isLargeScreen]);

  const textDirection = ['ar'].includes(language) ? 'rtl' : 'ltr';

  return (
    <I18nextProvider i18n={i18n}>
      <Router> 
        {/* HashRouter */}
        <Routes>
          <Route  path="/"  element={ <Login />  }  />
          <Route  path="/login" element={ <Login />  }  />
          <Route  path="/web" element={ <Login />  }  />
          <Route  path="/user" element={ <Login />  }  />

          <Route path='/admin' element={<Login isAdmin={true} />} /> 
          <Route path='/home' Component={Home}/>

          <Route path='/setting' Component={AdminPage}/>  
          {/* <Route path='/group' Component={GroupManagement}/> 
          <Route path='/user' Component={AddUser}/>
          <Route path='/keyword' Component={AddKeywords}/> */}
           

          {/* <Route path='/admin/setting' Component={AdminSetting}/>   */}

        </Routes>
      </Router>
    </I18nextProvider>
  );
}

export default App;
