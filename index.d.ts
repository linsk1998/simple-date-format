declare module "java.text.simple-date-format" {
	export default class SimpleDateFormat {
		constructor(format: string);
		parse(date: string): Date;
		format(date: Date): string;
	}
}