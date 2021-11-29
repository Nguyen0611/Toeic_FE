import {Injectable} from '@angular/core';

@Injectable()
export class TypesUtilsService {
  /**
   * Convert number to string and addinng '0' before
   *
   * @param value: number
   */
  padNumber(value: number) {
    if (this.isNumber(value)) {
      return `0${value}`.slice(-2);
    } else {
      return '';
    }
  }

  /**
   * Checking value type equals to Number
   *
   * @param value: any
   */
  isNumber(value: any): boolean {
    return !isNaN(this.toInteger(value));
  }

  /**
   * Covert value to number
   *
   * @param value: any
   */
  toInteger(value: any): number {
    return parseInt(`${value}`, 10);
  }

  /**
   * Convert date to string with 'MM/dd/yyyy' format
   *
   * @param date: Date
   */
  dateFormat(date: Date): string {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    if (date) {
      return `${month}/${day}/${year}`;
    }

    return '';
  }

  /**
   * Convert Date to string with custom format 'MM/dd/yyyy'
   *
   * @param date: any
   */
  dateCustomFormat(date: any): string {
    let stringDate: string = '';
    if (date) {
      stringDate += this.isNumber(date.month) ? this.padNumber(date.month) + '/' : '';
      stringDate += this.isNumber(date.day) ? this.padNumber(date.day) + '/' : '';

      stringDate += date.year;
    }
    return stringDate;
  }

  /**
   * Convert string to DateFormatter (For Reactive Forms Validators)
   *
   * @param dateInStr: string (format => 'MM/dd/yyyy')
   */
  getDateFormatterFromString(dateInStr: string): any {
    if (dateInStr && dateInStr.length > 0) {
      const dateParts = dateInStr.trim().split('/');
      return [
        {
          year: this.toInteger(dateParts[2]),
          month: this.toInteger(dateParts[0]),
          day: this.toInteger(dateParts[1])
        }
      ];
    }

    const _date = new Date();
    return [
      {
        year: _date.getFullYear(),
        month: _date.getMonth() + 1,
        day: _date.getDay()
      }
    ];
  }

  /**
   * Convert string to Date
   *
   * @param dateInStr: string (format => 'MM/dd/yyyy')
   */
  getDateFromString(dateInStr: string = ''): Date {
    if (dateInStr && dateInStr.length > 0) {
      const dateParts = dateInStr.trim().split('/');
      const year = this.toInteger(dateParts[2]);
      const month = this.toInteger(dateParts[0]);
      const day = this.toInteger(dateParts[1]);
      // tslint:disable-next-line:prefer-const
      let result = new Date();
      result.setDate(day);
      result.setMonth(month - 1);
      result.setFullYear(year);
      return result;
    }

    return new Date();
  }


  /**
   * Convert Date to string with format 'MM/dd/yyyy'
   * @param _date: Date?
   */
  getDateStringFromDate(_date: Date = new Date()): string {
    const month = _date.getMonth() + 1;
    const year = _date.getFullYear();
    const date = _date.getDate();
    return `${month}/${date}/${year}`;
  }

  compareDate(date1: Date, date2: Date): number {
    const d1 = new Date(date1.toDateString());
    const d2 = new Date(date2.toDateString());

    if (d1 === d2) {
      return 0;
    } else if (d1 < d2) {
      return -1;
    } else {
      return 1;
    }
  }


  replaceParam(text: string, params: any): string {
    const reg = /\{([^\}]+)?\}/g;
    let match;
    let maxParams = 99; // Maximum of parameters is equals 99

    while ((match = reg.exec(text)) && maxParams > 0) {
      if (params && params[match[1]] !== null && params[match[1]] !== undefined) {
        text = text.replace(match[0], params[match[1]]);
      } else {
        text = text.replace(match[0], '');
      }
      reg.lastIndex = 0;
      maxParams--;
    }

    return text;
  }
}
