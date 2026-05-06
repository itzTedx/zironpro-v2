import "server-only";

import nodemailer from "nodemailer";

import { getEmailSmtpConfig } from "./config";

export function createSmtpTransporter() {
	const smtpConfig = getEmailSmtpConfig();
	if (!smtpConfig) return null;

	return nodemailer.createTransport({
		host: smtpConfig.host,
		port: smtpConfig.port,
		secure: smtpConfig.secure,
		auth: {
			user: smtpConfig.user,
			pass: smtpConfig.pass,
		},
		debug: true,
		logger: true,
	});
}
