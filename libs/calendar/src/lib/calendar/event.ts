export interface CalendarEvent {
  title: string;
  created: Date;
  start?: Date;
  due?: Date;
  done: boolean;
}