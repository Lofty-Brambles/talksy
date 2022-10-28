import { randomUUID } from "crypto";

export class defaultDtls {
	static defaultUsername() {
		return randomUUID();
	}

	static defaultProfilePictureURL(name: string) {
		const username = randomUUID().slice(0, 7);

		const tag = name
			.split(" ")
			.reduce((accumlator, current) => accumlator + current[0], "")
			.toUpperCase();

		return `https://avatar.tobi.sh/${username}.svg?size=512${tag}`;
	}

	static defaultBannerPictureURL() {
		const randomNumin5 = Math.round(Math.random() * 5 + 1);

		return `https://api.memegen.link/images/custom/_/__.png?background=http://www.gstatic.com/webp/gallery/${randomNumin5}.png`;
	}

	static defaultNotificationSettings() {
		return {};
	}

	static defaultViewSettings() {
		return {
			textIndent: "m",
			justify: false,
			sans: false,
			darkMode: true,
		};
	}
}
