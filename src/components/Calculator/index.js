import React, { Component } from 'react';
import Button from '../Button';
import Display from '../Display';

import './styles.sass';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  valuesToCalculate: [0, 0],
  currentIndex: 0,
};

export default class Calculator extends Component {
  state = { ...initialState };

  clearMemory = () => this.setState({ ...initialState });

  setValueToCalculate = (value, clearDisplay = false) => {
    const { currentIndex, valuesToCalculate } = this.state;
    const newValue = parseFloat(value);
    const newValuesToCalculate = [...valuesToCalculate];

    newValuesToCalculate[currentIndex] = clearDisplay ? 0 : newValue;

    this.setState({ valuesToCalculate: newValuesToCalculate });
  };

  removeLastCharacter = string => string.substr(0, string.length - 1);

  backspace = () => {
    const { displayValue } = this.state;
    const newDisplayValue = this.removeLastCharacter(displayValue);
    const clearDisplay = newDisplayValue === '';

    this.setState({ displayValue: clearDisplay ? '0' : newDisplayValue });

    this.setValueToCalculate(newDisplayValue, clearDisplay);
  };

  calculateValues = () => {
    const { operation, valuesToCalculate } = this.state;

    const newValuesToCalculate = [...valuesToCalculate];
    try {
      newValuesToCalculate[0] = eval(
        `${newValuesToCalculate[0]} ${operation} ${newValuesToCalculate[1]}`
      );
    } catch (e) {
      newValuesToCalculate[0] = valuesToCalculate[0];
    }

    newValuesToCalculate[1] = 0;

    return newValuesToCalculate;
  };

  setOperation = operation => {
    const { currentIndex } = this.state;

    if (currentIndex === 0) {
      this.setState({ operation, currentIndex: 1, clearDisplay: true });
    } else {
      const equals = operation === '=';

      const result = this.calculateValues();

      this.setState({
        displayValue: result[0].toString(),
        operation: equals ? null : operation,
        currentIndex: equals ? 0 : 1,
        clearDisplay: !equals,
        valuesToCalculate: result,
      });
    }
  };

  addDigit = digit => {
    const { displayValue, clearDisplay } = this.state;

    if (digit === '.' && displayValue.includes('.')) return;

    const newClearDisplay = displayValue === '0' || clearDisplay;

    const currentValue = newClearDisplay ? '' : displayValue;
    const newDisplayValue = currentValue + digit;

    this.setState({ displayValue: newDisplayValue, clearDisplay: false });

    if (digit !== '.') this.setValueToCalculate(newDisplayValue);
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
