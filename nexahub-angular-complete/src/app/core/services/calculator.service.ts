import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CalculatorService {
  calculate(a: number, b: number, operator: string): number {
    switch (operator) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷':
        if (b === 0) throw new Error('Cannot divide by zero.');
        return a / b;
      default:
        throw new Error('Unknown operator.');
    }
  }
}
