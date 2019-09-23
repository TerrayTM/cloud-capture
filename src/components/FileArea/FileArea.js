import React from 'react';

import FileItem from './FileItem/FileItem';
import classes from './FileArea.css';

const fileArea = (props) => (
    <div className={classes.FileArea}>
        {props.files.map(i => <FileItem path={i.path} fileName={i.fileName} key={i.path} fileType={i.fileType}/>)}
    </div>
);

export default fileArea;