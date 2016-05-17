import React, { Component, PropTypes } from 'react';

class FilesystemTreeSection extends Component {
    render() {
        return (
            <section className="main">
                <FilesystemsList filesystems={filesystems} />
            </section>
        );
    }
}

FilesystemTreeSection.propTypes = {
    filesystem: PropTypes.array.isRequired
};

export default FilesystemTreeSection;
