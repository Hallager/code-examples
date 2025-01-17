import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-date-popover',
  templateUrl: './date-popover.component.html',
  styleUrls: ['./date-popover.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DatePopoverComponent,
      multi: true,
    },
  ],
})
export class DatePopoverComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = '';
  @Input() dataFormat: string = 'dd.MM.yyyy';
  @Input() type: 'time' | 'date' = 'date';

  model: string | null = null;
  isOpen = false;

  @Output() onChange = new EventEmitter<string>();

  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (value: string | null) => void = () => {};

  constructor() {}

  ngOnInit() {}

  writeValue(value: string | null): void {
    this.model = value;
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Implement this if the component needs to handle disabled state.
  }

  onChangeModel() {
    this.onChange.emit(this.model!);
    this.onChangeCallback(this.model);
  }
}
