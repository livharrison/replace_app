import { Dayjs } from "dayjs";

export class Task {
  private _name: string;
  private _description: string;
  private _frequency_val: number;
  private _frequency_unit: string;
  private _nextNotif: Dayjs;
  private _color: string;

  public constructor(
    name: string,
    description: string,
    frequency_val: number,
    frequency_unit: string,
    nextNotif: Dayjs,
    color: string
  ) {
    this._name = name;
    this._description = description;
    this._frequency_val = frequency_val;
    this._frequency_unit = frequency_unit;
    this._nextNotif = nextNotif;
    this._color = color;
  }

  public getNextNotif(): Dayjs {
    return this._nextNotif; // TODO + this._frequency;
    // lol
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get description(): string {
    return this._description;
  }

  public set description(description: string) {
    this._description = description;
  }

  public get frequency_val(): number {
    return this._frequency_val;
  }

  public get frequency_unit(): string {
    return this._frequency_unit;
  }

  public set frequency(frequency: number) {
    this._frequency_val = frequency;
  }

  public get nextNotif(): Dayjs {
    return this._nextNotif;
  }

  public set nextNotif(nextNotif: Dayjs) {
    this._nextNotif = nextNotif;
  }

  public get color(): string {
    return this._color;
  }
}

export default Task;
