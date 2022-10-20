import { HttpException } from ".";

export class BadRequest extends HttpException {
	image: string;
	error: any[];
	constructor(message: string, error: any[]) {
		super(400, message);
		this.image = "https://httpcats.com/400.jpg";
		this.error = error;
	}
}
