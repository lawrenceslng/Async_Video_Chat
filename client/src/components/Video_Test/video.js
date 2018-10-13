import React from 'react'

export default class Video extends React.Component {
  render() {
    console.log(this.props);
    return (
        <div>
        <h1>RecordRTC to Node.js</h1>
        <p>
            <video></video> 
        </p><hr />
            
        <hr />

        <div>
            <button id="btn-start-recording">Start Recording</button>
            <button id="btn-stop-recording" disabled="">Stop Recording</button>
        </div>
        </div>
    )
  }
}