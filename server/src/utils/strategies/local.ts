import { Strategy as LocalStrat } from "passport-local";
import { User } from "@/models/User";
import { AuthServices } from "@/services/auth.services";
import { NotFound, Unauthorized } from "@/utils/err-classes";

export const LocalStrategy = new LocalStrat(
	async (username, password, done) => {
		try {
			const user = await User.findOne({ username });
			if (!user) return done(new NotFound("User not found."));

			const match = AuthServices.comparePass(user.password, password);
			if (!match)
				return done(new Unauthorized("Wrong password entered."));

			return done(null, user);
		} catch (err) {
			done(err);
		}
	}
);
