import { HttpException } from ".";

export class Conflict extends HttpException {
	image: string;
	constructor(message: string) {
		super(409, message);
		this.image = "https://httpcats.com/409.jpg";
	}
}
