import React, { createRef, useEffect } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import AuthPage from "./AuthPage";
import PrimarySearchAppBar from "./Utils/Components/AppBar";

import { SideBar } from "./Utils/Components/SideBar";
import { MENUS } from "./Utils/Data/MenuRouting";
import * as URLS from "./Utils/Data/UrlConstants";
import Error from "./Error";
import Logout from "./Logout";


export default function PageRouter(props){
    const {changeTheme} = props;
    let menus = MENUS;    

    const switchRef = createRef();

    function PageWithAppBar(props){
        const {menu,subMenu,changeTheme} = props;
        
        useEffect(()=>{
            document.getElementsByName('theme-color')[0].setAttribute('content',menu.menuColor);
            return ()=>{
                document.getElementsByName('theme-color')[0].setAttribute('content','#000000');
            }
        },[menu])
        
        return (<React.Fragment>
            <PrimarySearchAppBar
                title={`${menu.name} - ${subMenu.name}`}
                toggleDrawer={()=>switchRef.current.toggleDrawer()}
                color={menu.menuColor}
                changeTheme={changeTheme}
            ></PrimarySearchAppBar>
            {subMenu.target}
        </React.Fragment>)
    }

    return <>
    {/* <div style={{height:'64px',width:'100%'}}></div> */}
    
    <BrowserRouter>

      <Routes >
      
        <Route exact path={URLS.WILD_CARD_BASE_URL} element={<AuthPage gotoLandingPage={URLS.APP_LANDING_PAGE}/>}/>
        <Route path={URLS.APP_RELATIVE_URL} element={<><SideBar ref={switchRef} /><Outlet/></>}>
            {menus.map(menu=>menu.subMenus.map(subMenu=>
            <Route path={`${menu.path}/`} >
                <Route path={`${subMenu.path}`} element={<PageWithAppBar menu={menu} subMenu={subMenu} changeTheme={changeTheme}/>}/>
            </Route>))}
        </Route>
        <Route path={URLS.ERROR_URL} element={<Error/>} errorElement={<React.Fragment>Not Found</React.Fragment>} />
        <Route path={URLS.LOGOUT} element={<Logout/>} errorElement={<React.Fragment>Error Logging out Element</React.Fragment>} />

      </Routes>
    </BrowserRouter></>
}