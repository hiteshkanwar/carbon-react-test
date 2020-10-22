// This component holds the sdebar screen
import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const SidebarScreen = () => {
    return(
        <>
            <div className='title'>
                <h4>Risk Centered</h4>
                <p>Valnerability Management</p>
            </div>
            <Carousel>
                <div>
                    <h3>Security Workflows</h3>
                    <p className="legend">Create and run playbooks to integrate security into your CI/CD pipeline</p>
                </div>
                <div>
                    <h3>Security Workflows</h3>
                    <p className="legend">Create and run playbooks to integrate security into your CI/CD pipeline</p>
                </div>
                <div>
                    <h3>Security Workflows</h3>
                    <p className="legend">Create and run playbooks to integrate security into your CI/CD pipeline</p>
                </div>
            </Carousel>
        </>
    )
}
export default SidebarScreen;