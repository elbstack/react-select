import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';

const FLAVOURS = [
	{ label: 'Chocolate', value: 'chocolate' },
	{ label: 'Vanilla', value: 'vanilla' },
	{ label: 'Strawberry', value: 'strawberry' },
	{ label: 'Caramel', value: 'caramel' },
	{ label: 'Cookies and Cream', value: 'cookiescream' },
	{ label: 'Peppermint', value: 'peppermint' },
];

const WHY_WOULD_YOU = [
	{ label: 'Chocolate (are you crazy?)', value: 'chocolate', disabled: true },
].concat(FLAVOURS.slice(1));

var MultiSelectField = createClass({
	displayName: 'MultiSelectField',
	propTypes: {
		label: PropTypes.string,
	},
	getInitialState () {
		return {
			removeSelected: true,
			disabled: false,
			crazy: false,
			stayOpen: false,
			value: [],
		};
	},
	handleSelectChange (value) {
		console.log('You\'ve selected:', value);
		this.setState({ value });
	},
	toggleRemove (e) {
		this.setState({ removeSelected: e.target.checked });
	},
	toggleDisabled (e) {
		this.setState({ disabled: e.target.checked });
	},
	toggleChocolate (e) {
		let crazy = e.target.checked;
		this.setState({
			[e.target.name]: e.target.checked,
		});
	},
	render () {
		const { crazy, disabled, stayOpen, value } = this.state;
		const options = crazy ? WHY_WOULD_YOU : FLAVOURS;
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select multi simpleValue removeSelected={this.state.removeSelected} disabled={this.state.disabled} value={this.state.value} placeholder="Select your favourite(s)" options={this.state.options} onChange={this.handleSelectChange} />

				<div className="checkbox-list">
					<label className="checkbox">
						<input type="checkbox" className="checkbox-control" checked={this.state.removeSelected} onChange={this.toggleRemove} />
						<span className="checkbox-label">Remove selected options</span>
					</label>
					<label className="checkbox">
						<input type="checkbox" className="checkbox-control" name="disabled" checked={disabled} onChange={this.toggleCheckbox} />
						<span className="checkbox-label">Disable the control</span>
					</label>
					<label className="checkbox">
						<input type="checkbox" className="checkbox-control" name="crazy" checked={crazy} onChange={this.toggleCheckbox} />
						<span className="checkbox-label">I don't like Chocolate (disabled the option)</span>
					</label>
					<label className="checkbox">
						<input type="checkbox" className="checkbox-control" name="stayOpen" checked={stayOpen} onChange={this.toggleCheckbox}/>
						<span className="checkbox-label">Stay open when an Option is selected</span>
					</label>
				</div>
			</div>
		);
	}
});

module.exports = MultiSelectField;
