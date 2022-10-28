import {
	FACEBOOK_CALLBACK_URL,
	FACEBOOK_CLIENT_ID,
	FACEBOOK_CLIENT_SECRET,
} from "@/config";
import { Strategy as FBStrategy } from "passport-facebook";
import { Profile } from "passport";
import { User } from "@/models/User";
import { defaultDtls } from "@/utils/profile-defaults";

export const FacebookStrategy = new FBStrategy(
	{
		clientID: FACEBOOK_CLIENT_ID,
		clientSecret: FACEBOOK_CLIENT_SECRET,
		callbackURL: FACEBOOK_CALLBACK_URL,
	},
	async (
		accessToken: string,
		_: string,
		profile: Profile,
		done: (error: any, user?: any, info?: any) => void
	) => {
		try {
			const existingUser = await User.findOne({ facebookID: profile.id });
			if (existingUser) return done(null, existingUser);

			const emailUnlinkedUser = await User.findOne({
				email: profile.emails![0].value,
			});
			if (emailUnlinkedUser) {
				const emailLinkedUser = await User.findByIdAndUpdate(
					emailUnlinkedUser._id,
					{ facebookID: profile.id },
					{ new: true }
				);
				return done(null, emailLinkedUser);
			}

			const getFacebookProfilePicture = (
				facebookId: string,
				accessor: string
			) =>
				`https://graph.facebook.com/${facebookId}/picture?width=512&height=512&access_token=${accessor}`;

			const newUser = new User({
				username: profile.username,
				email: profile.emails![0].value,
				firstName: profile.name?.givenName,
				lastName: profile.name?.familyName,
				profilePictureURL: getFacebookProfilePicture(
					profile.id,
					accessToken
				),
				bannerPictureURL: defaultDtls.defaultBannerPictureURL(),
				facebookID: profile.id,
				notificationSettings: defaultDtls.defaultNotificationSettings(),
				viewSettings: defaultDtls.defaultViewSettings(),
			});

			await newUser.save();
			return done(null, newUser);
		} catch (err) {
			done(err);
		}
	}
);
