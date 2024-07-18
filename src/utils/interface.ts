export interface UserDetails {
	user_id: number;
	name: string;
	email: string;
	password: string;
	type: "" | "creator" | "business";
	verified: boolean;
	logo: string | null;
	stripeCustomerId: string | null;
	stripeSubscriptionId: string | null;
	subscriptionStatus: string | null;
	subscriptionPlan: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface CreatorInfoAttributes {
	id: number;
	user_id: number;
	bio?: string;
	phone_number?: string;
	location?: string;
	languages?: string[];
	website?: string;
	social?: object;
}

export interface BusinessInfoAttributes {
	id: number;
	user_id: number;
	location: string;
	about: string;
	industry: string;
	total_employee: number;
	website: string;
	social: object[];
}
