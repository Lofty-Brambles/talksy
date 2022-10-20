import { HttpException } from ".";

export class Forbidden extends HttpException {
	image: string;
	constructor(message: string) {
		super(403, message);
		this.image = "https://httpcats.com/403.jpg";
	}
}
