import React from 'react';
import './radioToggle.css';

export default class RadioToggle extends React.Component {
	render() {
		return (
            <div>
                <span>Указать с НДФЛ</span>
                <label class="switch">
                    <input type="checkbox" checked={false || this.props.checked} onChange={this.props.onChange} />
                    <span class="slider round"></span>
                </label>
                <span>Без НДФЛ</span>
            </div>
		)
	}
}