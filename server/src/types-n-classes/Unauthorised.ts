import { HttpException } from ".";

export class Unauthorized extends HttpException {
	image: string;
	constructor(message: string) {
		super(401, message);
		this.image = "https://httpcats.com/401.jpg";
	}
}
