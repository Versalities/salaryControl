import React from 'react';

export default class RadioButton extends React.Component {

    setActivity() {
        const {value, active} = this.props;

        if (typeof active === 'string') {
            return active === value;
        }

        return active;
    }
    
    handleChange = () => {
        this.props.onChange(this.props.value)
    }

	render() {
        const {text} = this.props;
		return (
            <div className="radioButtonContainer">
                <input type="radio" checked={this.setActivity()} onChange={this.handleChange}/> 
                <span>{text}</span>
            </div>
		)
	}
}