// This component holds the mainframe screen (included header and sidebar)
import React from 'react';

import {
    Header,
    HeaderMenuButton,
    HeaderName,
    HeaderGlobalBar,
    HeaderGlobalAction,
    SkipToContent,
    SideNav,
    SideNavItems,
    SideNavLink,
    SideNavMenuItem,
  } from "carbon-components-react/lib/components/UIShell";

import { 
      OverflowMenu, 
      OverflowMenuItem 
} from 'carbon-components-react';

  import {
    Building32,
    Settings32,
    Notification20
} from '@carbon/icons-react';

import userIcon from '../../Assets/user-icon.png';
import  { history } from '../../App.js';
import './Mainframe.scss';

const AppHeader = (props) => {

    const logout = () => {
      sessionStorage.removeItem('user')
      history.push('/');
    }
    return(
        <Header aria-label="IBM Platform Name" className='app-header'>
            <SkipToContent />
            <HeaderMenuButton
                aria-label="Open menu"
                // onClick={onClickSideNavExpand}
                // isActive={isSideNavExpanded}
            />
            <HeaderName href="#" prefix="Strobes" style={{padding: 0}}/>
            <HeaderGlobalBar>
                <HeaderGlobalAction aria-label="Notifications" onClick={() => {}}>
                    <Notification20 />
                </HeaderGlobalAction>
                <HeaderGlobalAction aria-label="user-icon" onClick={() => {}}>
                    <img src={userIcon} className='user-icon'/>
                    <OverflowMenu>
                        <OverflowMenuItem
                            itemText="Profile"
                            primaryFocus
                        />
                        <OverflowMenuItem itemText="Setting" />
                        <OverflowMenuItem onClick= {()=> logout()} itemText="Logout" hasDivider/>
                    </OverflowMenu>
                </HeaderGlobalAction>
            </HeaderGlobalBar>
        </Header>
    )
}

const AppSidebar = (props) => {
    return(
        <SideNav 
            className='app-sidebar'
            aria-label="Side navigation" 
            // expanded={isSideNavExpanded}
        >
            <SideNavItems>
                <SideNavLink 
                    renderIcon={Building32} 
                    href="javascript:void(
                    0)"
                    aria-current="page"
                >
                    <div className='nav-sub-options'>
                        <SideNavMenuItem href="javascript:void(0)">
                            Option 1
                        </SideNavMenuItem>
                        <SideNavMenuItem href="javascript:void(0)">
                            Option 2
                        </SideNavMenuItem>
                        <SideNavMenuItem href="javascript:void(0)">
                            Option 3
                        </SideNavMenuItem>
                    </div>
                </SideNavLink>
                <SideNavLink 
                    renderIcon={Settings32} 
                    href="javascript:void(
                    0)"
                />
            </SideNavItems>
        </SideNav>
    )
}

const Mainframe = (props) => {
    return(
        <div className='mainframe-screen'>
            <AppHeader/>
            <AppSidebar/>
            <div className='app-body'>
                {props.children}
            </div>
        </div>
    )
} 
export default Mainframe;