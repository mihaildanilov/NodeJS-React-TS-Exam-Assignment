export interface UserInfo {
	_id?: string;
	name: string;
	email: string;
	token?: string;
	subscribedToNewsletter?: boolean;
	isAdmin: boolean;
}
