import React, { Component } from 'react'

export default class Systems extends Component {
    render() {
        return (
            <div>
                {this.props.systems.map(s => (
                    <div key={s.id}>{s.name}</div>
                ))}
            </div>
        )
    }
}
