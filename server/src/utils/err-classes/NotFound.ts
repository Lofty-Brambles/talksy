import { HttpException } from ".";

export class NotFound extends HttpException {
	image: string;
	constructor(message: string) {
		super(404, message);
		this.image = "https://httpcats.com/404.jpg";
	}
}
