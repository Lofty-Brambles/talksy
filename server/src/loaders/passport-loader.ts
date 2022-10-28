import "express-async-errors";

import { Express } from "express";
import passport from "passport";

import { LocalStrategy } from "@/utils/strategies/local";
import { FacebookStrategy } from "@/utils/strategies/facebook";
import { UserType } from "@/models/User";
import { AuthServices } from "@/services/auth.services";

export const passportLoader = (app: Express) => {
	passport.use(LocalStrategy);
	passport.use(FacebookStrategy);

	passport.serializeUser((user, done) => {
		process.nextTick(() =>
			done(null, AuthServices.purifyUser(user as UserType))
		);
	});

	passport.deserializeUser((user: UserType, done) => {
		process.nextTick(() => done(null, user));
	});

	app.use(passport.initialize());
	app.use(passport.session());
};
