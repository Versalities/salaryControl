import React from 'react';
import './salaryCalculator.css';

import RadioButton from './Components/radioButton.jsx';
import RadioToggle from './Components/radioToggle';
import InfoButton from './Components/infoButton';

import {formatNumber} from '../../Utils/index.js';

const Modes = [
    "monthly",
    "minimum",
    "daily",
    "hourly"
]

export default class SalaryCalculator extends React.Component {
    constructor() {
        super();

        this.state = {
            mode: "monthly",
            ndfl: true,
            data: {
                monthly: 0,
                minimum: 0,
                daily: 0,
                hourly: 0
            }
        }
    }

    handleNdflChange = () => {
        this.setState({
            ndfl: !this.state.ndfl
        })
    }

    handleModeChange = (value) => {
        this.setState({
            mode: value
        })
    }

    handleChangeData = (e) => {
        let trimmedValue = +e.target.value.split(' ').filter(x => x !== ' ').join('');
        let newData = this.calculateData(trimmedValue);

        this.setState({
            data: newData
        })
    }

    calculateData(value) {
        const { mode, data } = this.state;
        let calcValue = +value;

        switch (mode) {
            case Modes[0]:
                return {
                    monthly: calcValue,
                    minimum: data.minimum,
                    daily: calcValue / 20,
                    hourly: calcValue / 160
                };
            case Modes[1]:
                return {
                    monthly: data.monthly,
                    minimum: calcValue,
                    daily: data.daily,
                    hourly: data.hourly
                };
            case Modes[2]:
                return {
                    monthly: calcValue * 20,
                    minimum: data.minimum,
                    daily: calcValue,
                    hourly: calcValue / 8
                };
            case Modes[3]:
                return {
                    monthly: calcValue * 160,
                    minimum: data.minimum,
                    daily: calcValue * 8,
                    hourly: calcValue     
                };
            default:
                return data
        }

    }

    renderInfo() {
        const { data, ndfl } = this.state;
        let showcaseData = {
            totalPay: 0,
            ndflAmount: 0,
            mouthlyPay: 0,
        };

        if (ndfl) {
            showcaseData = {
                totalPay: data.monthly,
                ndflAmount: Math.floor(data.monthly * 0.13),
                mouthlyPay: data.monthly - Math.floor(data.monthly * 0.13),
            }
        } else {
            showcaseData = {
                mouthlyPay: data.monthly,
                totalPay: Math.floor(data.monthly / 0.87),
                ndflAmount: Math.floor(data.monthly / 0.87) - data.monthly,
            }
        }

        console.log(showcaseData)

        return (
            <div className="infoBannerContainer">
                <span>{formatNumber(showcaseData.mouthlyPay)} Р сотрудник будет получать на руки</span>
                <span>{formatNumber(showcaseData.ndflAmount)} Р НДФЛ, 13% от оклада</span>
                <span>{formatNumber(showcaseData.totalPay)} Р за сотрудника в месяц</span>
            </div>
        )
    }

	render() {
        const { mode, data, ndfl } = this.state;

		return (
			<div className="container">
				<h4>Сумма</h4>
				<div className="salaryButtonContainer">
					<RadioButton value="monthly" text="Оклад за месяц" active={mode} onChange={this.handleModeChange} />
                    <div className="row">
                        <RadioButton value="minimum" text="МРОТ" active={mode} onChange={this.handleModeChange} />
                        <InfoButton />
                    </div>
                    <RadioButton value="daily" text="Оклад за день" active={mode} onChange={this.handleModeChange} />
                    <RadioButton value="hourly" text="Оклад за чаc" active={mode} onChange={this.handleModeChange} />
				</div>
                <RadioToggle onChange={this.handleNdflChange} checked={ndfl}/>
				<div>
					<input type="text" onChange={this.handleChangeData} value={formatNumber(data[mode])}/>
					<span>Р, оклад сотрудника в месяц</span>
				</div>
                {
                    mode === Modes[0] && this.renderInfo()
                }
			</div>
		)
	}
}