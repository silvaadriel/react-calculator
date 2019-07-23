import React, { Component } from 'react';
import Button from '../Button';

import './styles.sass';

export default class Calculator extends Component {
  render() {
    return (
      <div className="calculator">
        <Button btnLabel="AC" />
        <Button btnLabel="/" />
        <Button btnLabel="7" />
        <Button btnLabel="8" />
        <Button btnLabel="9" />
        <Button btnLabel="*" />
        <Button btnLabel="4" />
        <Button btnLabel="5" />
        <Button btnLabel="6" />
        <Button btnLabel="-" />
        <Button btnLabel="1" />
        <Button btnLabel="2" />
        <Button btnLabel="3" />
        <Button btnLabel="+" />
        <Button btnLabel="0" />
        <Button btnLabel="." />
        <Button btnLabel="=" />
      </div>
    );
  }
}
