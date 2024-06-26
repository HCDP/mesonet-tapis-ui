import moment, { Moment } from "moment-timezone";

const tzMap: {[location: string]: string} = {
  hawaii: "Pacific/Honolulu",
  american_samoa: "Pacific/Pago_Pago"
}

export function date2Moment(date: Date, location: string): Moment {
  return moment(date).tz(getTZ(location), true);
}

export function moment2Date(moment: Moment): Date {
  return new Date(moment.format("YYYY-MM-DD HH:mm:ss"));
}

export function getNow(location: string) {
  return moment().tz(getTZ(location));
}

export function getTZ(location: string): string {
  return tzMap[location];
}

export function getTZAbbreviation(location: string): string {
  return moment().tz(getTZ(location)).format("z");
}

export function timestamp2Moment(location: string, timestamp: string): Moment {
  return moment(timestamp).tz(getTZ(location));
}

export function formatDate(date: Moment): string {
  return date.format("YYYY-MM-DD HH:mm:ss z");
}

export function localizeTimestamp(location: string, timestamp: string): string {
  return formatDate(timestamp2Moment(location, timestamp));
}

export function timestamp2Date(location: string, timestamp: string): Date {
  return moment2Date(timestamp2Moment(location, timestamp));
}