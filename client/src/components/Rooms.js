import React, { Component } from 'react'

export default class Rooms extends Component {
    render() {
        return (
            <div>
                {this.props.rooms.map(r => (
                    <div key={r.id}>{r.name}</div>
                ))}
            </div>
        )
    }
}
