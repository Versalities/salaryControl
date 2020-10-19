import React from 'react';
import './infoButton.css';

export default class InfoButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showInfo: false,
            active: false
        }
    }

    handleMouseEnter = () => {
        this.setState({showInfo: true})
    }

    handleMouseLeave = () => {
        if (!this.state.active) {
            this.setState({showInfo: false})
        }
    }

    handleClick = () => {
        this.setState({active: !this.state.active})
    }

    render() {
        const { showInfo, active } = this.state;

        return (
            <div className="infoButtonContainer">
                <button 
                    onMouseEnter={this.handleMouseEnter} 
                    onMouseLeave={this.handleMouseLeave}
                    onClick={this.handleClick}
                >
                    {active ? "X" : "I"}
                </button>
                {
                    showInfo && (
                        <div className="infoField">
                            МРОТ - минимальный размер оплаты труда. Разный для разных регионов
                        </div>
                    )
                }
            </div>
        )
    }
}