import { HttpException } from ".";

export class MethodNotAllowed extends HttpException {
	image: string;
	constructor(message: string) {
		super(405, message);
		this.image = "https://httpcats.com/405.jpg";
	}
}
