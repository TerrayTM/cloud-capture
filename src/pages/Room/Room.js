import React, { Component, Fragment, createRef } from 'react';
import { connect } from 'react-redux';

import FileArea from '../../components/FileArea/FileArea';
import Loader from '../../components/userInterfaces/Loader/Loader';
import Notification from '../../components/Notification/Notification';
import ErrorPage from '../ErrorPage/ErrorPage';
import * as actions from '../../store/actions/actions';
import classes from './Room.css';
import { apiEndpoint, apiKey } from '../../config';

class Room extends Component {
    constructor(props) {
        super(props);
        this.copyHolder = React.createRef();
        this.dragCount = 0;
        this.uploadControl = createRef();
        this.state = {
            showCopy: false,
            showJoin: false,
            showDrag: false,
            upload: 0,
            skipped: 0,
            max: 0,
            suppressUserJoined: false,
            error: false
        };
    }

    assertProps = (compare) => {
        let result = compare.match && compare.match.params && compare.match.params.id && compare.match.params.id.length === 6 && compare.match.params.id.split('').every((i) => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.includes(i.toUpperCase()));
        if (result) {
            let data = compare.match.params.id;
            let count = 0;
            for (let i = 0; i < data.length; ++i) {
                if (isNaN(data.charAt(i))) {
                    ++count;
                } else {
                    count = 0;
                }
                if (count > 2) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    copyRoomCode = () => {
        this.copyHolder.current.select();
        document.execCommand('copy');
        if (!this.state.showCode) {
            this.setState({ showCopy: true });
            setTimeout(() => {
                this.setState({ showCopy: false });
            }, 3000);
        }
    }

    autoJoinRoom = () => {
        if (!this.props.connected) {
            if (!this.props.error) {
                this.props.connectToServer();
            }
        } else {
            if (this.assertProps(this.props)) {
                if (this.props.roomCode !== this.props.match.params.id.toUpperCase()) {
                    if (this.state.error) {
                        this.setState({ error: false });
                    }
                    this.setState({ suppressUserJoined: true });
                    if (this.props.files.length > 0) {
                        this.props.freeFiles();
                    }
                    this.props.joinRoom(this.props.match.params.id);
                }
            } else {
                if (!this.state.error) {
                    this.setState({ error: true });
                }
            }
        }
    }

    dragEvent = (event) => {
        event.stopPropagation();
        this.setState({ showDrag: true });
        event.preventDefault();
    }

    uploadFile = async (file) => {
        try {
            const data = new FormData();
            data.append('file', file);
            data.append('id', this.props.roomCode);
            data.append('password', apiKey);
            let response = await fetch(`${apiEndpoint}/services/upload`, {
                method: 'post',
                body: data
            });
            response = await response.text();
            if (response !== 'SUCCESS') {
                this.setState(previous => {
                    return {
                        skipped: previous.skipped + 1
                    };
                });
            }
        } catch (error) { 
            this.setState(previous => {
                return {
                    skipped: previous.skipped + 1
                };
            });
        } finally {
            if (this.state.upload + 1 === this.state.max) {
                setTimeout(() => {
                    if (this.state.upload === this.state.max) {
                        this.setState({ upload: 0, max: 0, skipped: 0 });
                    }
                }, 3000);
            }
            this.setState(previous => {
                return {
                    upload: previous.upload + 1
                };
            });
        }
    }

    dropEvent = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (this.props.error) {
            return;
        }
        if (event.dataTransfer.items) {
            this.setState({ upload: 0, max: event.dataTransfer.items.length, skipped: 0 });
            for (let i = 0, length = event.dataTransfer.items.length; i < length; ++i) {
                if (event.dataTransfer.items[i].kind === 'file') {
                    let file = event.dataTransfer.items[i].getAsFile();
                    if (file.size > 1e+7) {
                        this.setState(previous => {
                            return {
                                skipped: previous.skipped + 1,
                                upload: previous.upload + 1
                            };
                        });
                        continue;
                    }
                    this.uploadFile(file);
                }
            }
        } else {
            this.setState({ upload: 0, max: event.dataTransfer.files.length, skipped: 0 });
            for (let i = 0, length = event.dataTransfer.files.length; i < length; ++i) {
                let file = event.dataTransfer.files[i];
                if (file.size > 1e+7) {
                    this.setState(previous => {
                        return {
                            skipped: previous.skipped + 1,
                            upload: previous.upload + 1
                        };
                    });
                    continue;
                }
                this.uploadFile(file);
            }
        }
        this.cleanUp(event);
        this.setState({ showDrag: false });
    }

    cleanUp = (event) => {
        if (event.dataTransfer.items) {
            event.dataTransfer.items.clear();
        } else {
            event.dataTransfer.clearData();
        }
    }

    dragLeaveEvent = (event) => {
        event.preventDefault(); 
        event.stopPropagation(); 
        --this.dragCount;
        if (this.dragCount <= 0) {
            this.setState({ showDrag: false });
        }
    }

    componentDidMount() {
        this.autoJoinRoom();
    }

    componentDidUpdate(previousProps) {
        this.autoJoinRoom();
        if (previousProps.onlineUsers < this.props.onlineUsers) {
            if (this.state.suppressUserJoined) {
                this.setState({ suppressUserJoined: false });
            }
            else if (!this.state.showJoin) {
                this.setState({ showJoin: true });
                setTimeout(() => {
                    this.setState({ showJoin: false });
                }, 3000);
            }
        }
    }

    uploadFileLabel = () => {
        this.uploadControl.current.click();
    }

    doUploadFile = () => {
        const files = this.uploadControl.current.files;
        if (files.length > 0) {
            this.uploadFile(files[0]);
        }
    }

    render() {
        if (this.state.error) {
            return <ErrorPage/>;
        }
        let header = <h2>Loading...</h2>;
        if (this.props.roomCode) {
            header = (
                <Fragment>
                    <h2>Join this room with code</h2>
                    <h1 title="Click to copy!" onClick={this.copyRoomCode}>{this.props.roomCode}</h1>
                    <input type="text" ref={this.copyHolder} value={this.props.roomCode} readOnly/>
                </Fragment>
            );
        }
        if (this.props.error) {
            header = <h2>Server is currently offline, please <span className={classes.Reload} onClick={() => window.location.reload()}>try again</span> later.</h2>;
        }
        let status = '';
        if (this.state.max !== 0) {
            if (this.state.skipped > 0) {
                status = `(uploading ${this.state.upload} of ${this.state.max} file${this.state.max > 1 ? 's' : ''} [skipped ${this.state.skipped}])`;
            } else {
                status = `(uploading ${this.state.upload} of ${this.state.max} file${this.state.max > 1 ? 's' : ''})`;
            }
        }
        return (
            <Fragment>
                <Notification left message="A new user has joined!" show={this.state.showJoin}/>
                <Notification message="Code copied to clipboard!" show={this.state.showCopy}/>
                <section className={classes.Header}>
                    <div>
                        {header}
                    </div>
                    {this.props.roomCode && !this.props.error ? <Fragment><p className={classes.MobileOnly}>Use our mobile app for to transfer files!</p><div className={classes.Double}><p className={classes.DesktopOnly}>Hint: you can also drag and drop files below.</p><p>Files are deleted when all users leave the room.</p></div></Fragment> : null}
                </section>
                <section className={classes.Main} onDragEnter={() => ++this.dragCount} onDragOver={this.dragEvent} onDrop={this.dropEvent} onDragLeave={this.dragLeaveEvent}>
                    <div>
                        <div className={classes.Info}>
                            <h4>Files Transferred (<button className={classes.UploadLabel} onClick={this.uploadFileLabel}>Upload</button>): {this.props.files.length} <span className={classes.Status}>{status}</span></h4>
                            <h4>Users in this Room: {this.props.onlineUsers}</h4>
                            <input className={classes.UploadControl} type="file" ref={this.uploadControl} onChange={this.doUploadFile}/>
                        </div>
                        <div className={[this.state.showDrag && !this.props.error ? classes.ShowDrag : null, classes.Drag].join(' ')}>
                            {this.props.files.length === 0 ? (this.props.error ? null : <div className={classes.LoaderHolder}><Loader/><p>Waiting for file transfer...</p></div>) : <FileArea files={this.props.files}/>}
                        </div>
                    </div>
                </section>
            </Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        connectToServer: () => dispatch(actions.connectToServer()),
        joinRoom : (room) => dispatch(actions.joinRoom(room)),
        freeFiles: () => dispatch(actions.freeFiles())
    };
};

const mapStateToProps = (state) => {
    return {
        connected: state.connected,
        error: state.error,
        onlineUsers: state.onlineUsers,
        files: state.files,
        roomCode: state.roomCode,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Room);