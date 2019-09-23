import React, { Fragment } from 'react';

import HeroArea from '../../components/HeroArea/HeroArea';
import Clouds from '../../components/Clouds/Clouds';
import TextArea from '../../components/TextArea/TextArea';

const home = () => (
    <Fragment>
        <Clouds/>
        <HeroArea/>
        <TextArea title="About" color="#769ee9">
            Cloud Capture is a free online platform for transferring images, videos, and any other types of files from one device to another. 
            For desktop to desktop transfer, open up two instances of Cloud Capture, one on each computer, then drag and drop your files and watch them populate in real-time.
            Please note that the maximum size for upload is 10 MB per file and Cloud Capture does not save your data after exiting the web client. 
        </TextArea>
    </Fragment>
);


export default home;