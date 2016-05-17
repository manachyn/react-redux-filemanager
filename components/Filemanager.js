import React, { Component, PropTypes } from 'react';

export default class Filemanager extends Component {
    constructor(props) {
        super(props);
        this.handleBrowseClick = this.handleBrowseClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.path !== this.props.path) {
            this.setPath(nextProps.path);
        }
    }

    getPath() {
        return this.refs.input.value;
    }

    setPath(path) {
        // Generally mutating DOM is a bad idea in React components,
        // but doing this for a single uncontrolled field is less fuss
        // than making it controlled and maintaining a state for it.
        this.refs.input.value = path;
    }

    handleBrowseClick() {
        this.props.onChange(this.getPath());
    }

    render() {
        return (
            <div>
                <input size="45"
                       ref="input"
                       defaultValue={this.props.path} />
                <button onClick={this.handleBrowseClick}>
                    Browse!
                </button>
            </div>
        );
    }
}

Filemanager.propTypes = {
    path: PropTypes.string.isRequired
};
