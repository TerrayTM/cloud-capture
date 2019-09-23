import React from 'react';

import classes from './FileItem.css';

const fileItem = (props) => (
    <div className={classes.Parent}>
        <div className={classes.FileItem} style={{ backgroundImage: props.fileType.includes('image') ? `url(${props.path})` : null }}>
            <a href={props.path} download={props.fileName}>
                <div>
                    <p>Download</p>
                </div>
            </a>
        </div>
        <p title={props.fileName} className={classes.Info}>{props.fileName.length > 24 ? props.fileName.substring(0, 21) + '...' : props.fileName}</p>
    </div>
);

export default fileItem;