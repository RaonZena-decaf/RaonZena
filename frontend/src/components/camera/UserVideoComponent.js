import { StylesContext } from '@material-ui/styles';
import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import styles from './Vid.module.css';

export default class UserVideoComponent extends Component {

    getNicknameTag() {
        // Gets the nickName of the user
        return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
    }

    render() {
        return (
            <div className={styles.container}>
                {this.props.streamManager !== undefined ? (
                    <div>
                        <OpenViduVideoComponent streamManager={this.props.streamManager} nickname={this.getNicknameTag()} />
                        <div><p>{this.getNicknameTag()}</p></div>
                    </div>
                ) : null}
            </div>
        );
    }
}
