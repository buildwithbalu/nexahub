import { Component, inject } from '@angular/core';
import { CalculatorService } from '../../core/services/calculator.service';
import { ActivityService } from '../../core/services/activity.service';

@Component({
  selector: 'app-calculator',
  standalone: true,
  template: `
    <div class="page-container narrow">
      <div class="page-title">
        <span class="eyebrow">SERVICE 01</span>
        <h1>Calculator</h1>
        <p>A clean calculator with a persistent activity history.</p>
      </div>

      <section class="calculator-layout">
        <div class="calculator">
          <div class="display">
            <div class="expression">{{ expression || '0' }}</div>
            <div class="result">{{ display }}</div>
          </div>

          <div class="calc-grid">
            <button class="calc-btn muted" (click)="clear()">AC</button>
            <button class="calc-btn muted" (click)="deleteLast()">DEL</button>
            <button class="calc-btn operator" (click)="choose('%')">%</button>
            <button class="calc-btn operator" (click)="choose('÷')">÷</button>

            <button class="calc-btn" (click)="press('7')">7</button>
            <button class="calc-btn" (click)="press('8')">8</button>
            <button class="calc-btn" (click)="press('9')">9</button>
            <button class="calc-btn operator" (click)="choose('×')">×</button>

            <button class="calc-btn" (click)="press('4')">4</button>
            <button class="calc-btn" (click)="press('5')">5</button>
            <button class="calc-btn" (click)="press('6')">6</button>
            <button class="calc-btn operator" (click)="choose('-')">−</button>

            <button class="calc-btn" (click)="press('1')">1</button>
            <button class="calc-btn" (click)="press('2')">2</button>
            <button class="calc-btn" (click)="press('3')">3</button>
            <button class="calc-btn operator" (click)="choose('+')">+</button>

            <button class="calc-btn zero" (click)="press('0')">0</button>
            <button class="calc-btn" (click)="press('.')">.</button>
            <button class="calc-btn equals" (click)="equals()">=</button>
          </div>

          @if (error) { <div class="calc-error">{{ error }}</div> }
        </div>

        <div class="history-panel">
          <div class="panel-heading"><div><span class="eyebrow">RECENT</span><h2>Calculations</h2></div></div>
          @if (history.length === 0) {
            <div class="empty-state">Your calculations will appear here.</div>
          } @else {
            @for (item of history; track $index) {
              <div class="history-item"><span>{{ item.expression }}</span><strong>{{ item.result }}</strong></div>
            }
          }
        </div>
      </section>
    </div>
  `
})
export class CalculatorComponent {
  private readonly calculator = inject(CalculatorService);
  private readonly activity = inject(ActivityService);

  display = '0';
  expression = '';
  error = '';
  private first: number | null = null;
  private operator = '';
  private waitingForSecond = false;

  history: { expression: string; result: string }[] = [];

  press(value: string): void {
    this.error = '';

    if (this.waitingForSecond) {
      this.display = value === '.' ? '0.' : value;
      this.waitingForSecond = false;
      return;
    }

    if (value === '.' && this.display.includes('.')) return;

    this.display = this.display === '0' && value !== '.' ? value : this.display + value;
  }

  choose(operator: string): void {
    if (operator === '%') {
      this.display = String(Number(this.display) / 100);
      return;
    }

    const current = Number(this.display);

    if (this.first !== null && this.operator && !this.waitingForSecond) {
      this.calculate();
    } else {
      this.first = current;
    }

    this.operator = operator;
    this.expression = `${this.first} ${operator}`;
    this.waitingForSecond = true;
  }

  equals(): void {
    if (this.first === null || !this.operator) return;
    this.calculate();
  }

  clear(): void {
    this.display = '0';
    this.expression = '';
    this.first = null;
    this.operator = '';
    this.waitingForSecond = false;
    this.error = '';
  }

  deleteLast(): void {
    if (this.waitingForSecond) return;
    this.display = this.display.length > 1 ? this.display.slice(0, -1) : '0';
  }

  private calculate(): void {
    try {
      const second = Number(this.display);
      const first = this.first ?? 0;
      const operator = this.operator;
      const result = this.calculator.calculate(first, second, operator);
      const formatted = Number.isInteger(result) ? String(result) : result.toFixed(4).replace(/0+$/, '').replace(/\.$/, '');

      this.expression = `${first} ${operator} ${second}`;
      this.display = formatted;
      this.history = [{ expression: this.expression, result: formatted }, ...this.history].slice(0, 8);
      this.activity.add('Calculator', 'Calculation completed', `${this.expression} = ${formatted}`);

      this.first = result;
      this.operator = '';
      this.waitingForSecond = true;
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Calculation error';
      this.clear();
    }
  }
}
