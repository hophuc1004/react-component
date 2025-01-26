export interface DateRange {
  after: Date
  before: Date
}

export type DisabledDays = (Date | DateRange)[]
