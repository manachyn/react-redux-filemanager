import React, { Component, PropTypes } from 'react'

export default class FilesystemsList extends Component {
    render() {
        return (
            <ul>
                {this.props.filesystems.map(filesystem =>
                    <TodoItem key={filesystem.name} filesystem={filesystem} />
                )}
            </ul>
        )
    }
}

FilesystemsList.propTypes = {
    filesystems: PropTypes.array.isRequired
}