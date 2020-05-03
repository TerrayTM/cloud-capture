import React, { Fragment } from 'react';

import Hero from '../../components/Hero/Hero';
import TextArea from '../../components/TextArea/TextArea';
import Button from '../../components/userInterfaces/Button/Button';
import classes from './Donate.css';

const donate = () => (
    <Fragment>
        <Hero color="#36ACDB">
            <h1 className={classes.Header}>Make a Donation</h1>
        </Hero>
        <TextArea title="Donate">
            Please consider making a donation to support our software! All proceeds go towards covering server costs and website hosting/maintenance. Thank you for your generosity!
            <Button width="100%" margin="36px 0 0 0" click={() => window.location = 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=V9PA4UGW67SYG&lc=CA&item_name=TerryTM&no_note=1&no_shipping=1&currency_code=CAD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted'}>Donate via PayPal <span role="img" aria-label="Heart">❤️</span></Button>
        </TextArea>
    </Fragment>
);

export default donate;