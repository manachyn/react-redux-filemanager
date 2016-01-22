import React, { Component, PropTypes } from 'react'

export default class FilesystemItem extends Component {
    render() {
        const { filesystem } = this.props;

        return (
            <li>
                {filesystem.name}
            </li>
        )
    }
}

FilesystemItem.propTypes = {
    filesystem: PropTypes.shape({
        name: PropTypes.string.isRequired
    }).isRequired
};
