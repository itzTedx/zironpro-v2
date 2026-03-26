export interface EmailSmtpConfig {
	host: string;
	port: number;
	secure: boolean;
	user: string;
	pass: string;
}

export interface ContactEmailConfig {
	from: string;
	to: string;
}

export interface ContactFormEmailData {
	name: string;
	email: string;
	phone?: string;
	service?: string;
	message: string;
}
