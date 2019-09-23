import React from 'react';

import Cloud from './Cloud/Cloud';
import cloudSettings from '../../constants/cloudSettings';
import classes from './Clouds.css';

const clouds = () => (
    <div className={classes.Clouds}>
        {cloudSettings.map((i, index) => <Cloud x={i.x} y={i.y} delay={index % 2 === 0} size={i.size} key={`Cloud ${index}`}/>)}
    </div>
);

export default clouds;