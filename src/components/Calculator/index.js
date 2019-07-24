import React, { Component } from 'react';
import Button from '../Button';
import Display from '../Display';

import './styles.sass';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  currentIndex: 0,
};

export default class Calculator extends Component {
  state = { ...initialState };

  clearMemory = () => this.setState({ ...initialState });

  backspace = () => {
    const newDisplayValue = this.state.displayValue.substr(
      0,
      this.state.displayValue.length - 1
    );
    const clearDisplay = newDisplayValue === '';

    this.setState({ displayValue: clearDisplay ? '0' : newDisplayValue });

    const index = this.state.currentIndex;
    const newValue = parseFloat(newDisplayValue);
    const values = [...this.state.values];
    values[index] = clearDisplay ? 0 : newValue;
    this.setState({ values });
  };

  setOperation = operation => {
    if (this.state.current === 0) {
      this.setState({ operation, currentIndex: 1, clearDisplay: true });
    } else {
      const equals = operation === '=';
      const currentOperation = this.state.operation;

      const values = [...this.state.values];
      try {
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
      } catch (e) {
        values[0] = this.state.values[0];
      }

      values[1] = 0;

      this.setState({
        displayValue: values[0].toString(),
        operation: equals ? null : operation,
        currentIndex: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      });
    }
  };

  addDigit = digit => {
    if (digit === '.' && this.state.displayValue.includes('.')) {
      return;
    }

    const clearDisplay =
      this.state.displayValue === '0' || this.state.clearDisplay;
    const currentValue = clearDisplay ? '' : this.state.displayValue;
    const displayValue = currentValue + digit;
    this.setState({ displayValue, clearDisplay: false });

    if (digit !== '.') {
      const index = this.state.currentIndex;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[index] = newValue;
      this.setState({ values });
      console.log(values);
    }
  };

  render() {
    const { displayValue } = this.state;

    return (
      <div className="calculator">
        <Display value={displayValue} />
        <Button btnLabel="AC" click={this.clearMemory} />
        <Button btnLabel="⟵" double click={this.backspace} />
        <Button btnLabel="/" operation click={this.setOperation} />
        <Button btnLabel="7" click={this.addDigit} />
        <Button btnLabel="8" click={this.addDigit} />
        <Button btnLabel="9" click={this.addDigit} />
        <Button btnLabel="*" operation click={this.setOperation} />
        <Button btnLabel="4" click={this.addDigit} />
        <Button btnLabel="5" click={this.addDigit} />
        <Button btnLabel="6" click={this.addDigit} />
        <Button btnLabel="-" operation click={this.setOperation} />
        <Button btnLabel="1" click={this.addDigit} />
        <Button btnLabel="2" click={this.addDigit} />
        <Button btnLabel="3" click={this.addDigit} />
        <Button btnLabel="+" operation click={this.setOperation} />
        <Button btnLabel="0" double click={this.addDigit} />
        <Button btnLabel="." click={this.addDigit} />
        <Button btnLabel="=" operation click={this.setOperation} />
      </div>
    );
  }
}
