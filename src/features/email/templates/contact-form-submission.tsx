import {
	Body,
	Column,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Row,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";

const ContactFormSubmissionEmail = (props: {
	name?: string;
	email?: string;
	phone?: string;
	service?: string;
	message?: string;
}) => {
	return (
		<Html dir="ltr" lang="en">
			<Tailwind>
				<Head />
				<Preview>
					New contact form submission from {props.name || "a potential client"}
				</Preview>
				<Body className="bg-[#f6f5f3] py-[40px] font-sans">
					<Container className="mx-auto max-w-[600px] rounded-[12px] bg-[#FFF] px-[32px] py-[40px] shadow-lg">
						{/* Header with Logo and Accent Bar */}
						<Section className="mb-[32px] text-center">
							<div className="mb-[24px] h-[4px] w-full rounded-t-[12px] bg-gradient-to-r from-[#ffc650] to-[#ffb020]" />
							<Link href="https://zironpro.ae">
								<Img
									alt="Ziron Pro"
									className="mx-auto h-auto w-full max-w-[200px]"
									src="https://di867tnz6fwga.cloudfront.net/brand-kits/453a191a-fef2-4ba6-88fe-b9e7a16650cd/primary/1329be73-d646-44f6-b4fc-eac25a3aaf74.png"
								/>
							</Link>
						</Section>

						{/* Status Badge */}
						<Section className="mb-[24px] text-center">
							<div className="inline-flex items-center rounded-[20px] border-[#ffc650] border-[2px] border-solid bg-[#ffc650] bg-opacity-10 px-[16px] py-[8px]">
								<div className="mr-[8px] h-[8px] w-[8px] rounded-full bg-[#ffc650]" />
								<Text className="m-0 font-bold text-[#201f1d] text-[14px]">
									NEW LEAD ALERT
								</Text>
							</div>
						</Section>

						{/* Main Content */}
						<Section>
							<Heading className="mb-[8px] text-center font-bold text-[#201f1d] text-[28px]">
								Fresh Lead Incoming!
							</Heading>

							<Text className="mb-[32px] text-center text-[#666] text-[16px] leading-[24px]">
								A potential client just reached out through your website. Here's
								what they shared:
							</Text>

							{/* Contact Details Card with Enhanced Design */}
							<Section className="mb-[32px] rounded-[12px] border-[#ffc650] border-l-[4px] border-solid bg-gradient-to-br from-[#f6f5f3] to-[#ede9e4] p-[32px]">
								<Row className="mb-[20px]">
									<Column>
										<Row>
											<Column className="w-[28px]">
												<div className="flex h-[24px] w-[24px] items-center justify-center rounded-[6px] bg-[#ffc650] bg-opacity-20">
													<Img
														alt="Name"
														className="h-[14px] w-[14px]"
														src="https://img.icons8.com/fluency-systems-regular/48/201f1d/user.png"
													/>
												</div>
											</Column>
											<Column>
												<Text className="m-0 mb-[4px] font-bold text-[#201f1d] text-[13px] uppercase tracking-wide">
													Client Name
												</Text>
											</Column>
										</Row>
										<Text className="m-0 ml-[28px] font-semibold text-[#201f1d] text-[18px]">
											{props.name || "Ahmed Al-Mansouri"}
										</Text>
									</Column>
								</Row>

								<Row className="mb-[20px]">
									<Column>
										<Row>
											<Column className="w-[28px]">
												<div className="flex h-[24px] w-[24px] items-center justify-center rounded-[6px] bg-[#ffc650] bg-opacity-20">
													<Img
														alt="Email"
														className="h-[14px] w-[14px]"
														src="https://img.icons8.com/fluency-systems-regular/48/201f1d/email.png"
													/>
												</div>
											</Column>
											<Column>
												<Text className="m-0 mb-[4px] font-bold text-[#201f1d] text-[13px] uppercase tracking-wide">
													Email Address
												</Text>
											</Column>
										</Row>
										<Link
											className="ml-[28px] block font-medium text-[#ffc650] text-[16px] no-underline hover:underline"
											href={`mailto:${props.email || "ahmed.mansouri@example.com"}`}
										>
											{props.email || "ahmed.mansouri@example.com"}
										</Link>
									</Column>
								</Row>

								<Row className="mb-[20px]">
									<Column>
										<Row>
											<Column className="w-[28px]">
												<div className="flex h-[24px] w-[24px] items-center justify-center rounded-[6px] bg-[#ffc650] bg-opacity-20">
													<Img
														alt="Phone"
														className="h-[14px] w-[14px]"
														src="https://img.icons8.com/fluency-systems-regular/48/201f1d/phone.png"
													/>
												</div>
											</Column>
											<Column>
												<Text className="m-0 mb-[4px] font-bold text-[#201f1d] text-[13px] uppercase tracking-wide">
													Phone Number
												</Text>
											</Column>
										</Row>
										<Link
											className="ml-[28px] block font-medium text-[#ffc650] text-[16px] no-underline hover:underline"
											href={`tel:${props.phone || "+971501234567"}`}
										>
											{props.phone || "+971 50 123 4567"}
										</Link>
									</Column>
								</Row>

								<Row className="mb-[20px]">
									<Column>
										<Row>
											<Column className="w-[28px]">
												<div className="flex h-[24px] w-[24px] items-center justify-center rounded-[6px] bg-[#ffc650] bg-opacity-20">
													<Img
														alt="Service"
														className="h-[14px] w-[14px]"
														src="https://img.icons8.com/fluency-systems-regular/48/201f1d/services.png"
													/>
												</div>
											</Column>
											<Column>
												<Text className="m-0 mb-[4px] font-bold text-[#201f1d] text-[13px] uppercase tracking-wide">
													Service Interest
												</Text>
											</Column>
										</Row>
										<Text className="m-0 ml-[28px] font-medium text-[#201f1d] text-[16px]">
											{props.service || "Complete Digital Marketing Package"}
										</Text>
									</Column>
								</Row>

								<Row>
									<Column>
										<Row>
											<Column className="w-[28px]">
												<div className="flex h-[24px] w-[24px] items-center justify-center rounded-[6px] bg-[#ffc650] bg-opacity-20">
													<Img
														alt="Message"
														className="h-[14px] w-[14px]"
														src="https://img.icons8.com/fluency-systems-regular/48/201f1d/chat.png"
													/>
												</div>
											</Column>
											<Column>
												<Text className="m-0 mb-[4px] font-bold text-[#201f1d] text-[13px] uppercase tracking-wide">
													Their Message
												</Text>
											</Column>
										</Row>
										<div className="ml-[28px] rounded-[8px] border-[#ffc650] border-l-[3px] border-solid bg-[#FFF] p-[16px]">
											<Text className="m-0 text-[#201f1d] text-[16px] italic leading-[24px]">
												"
												{props.message ||
													"Hi Ziron Pro team, I'm the owner of a growing e-commerce business in Dubai and I'm looking for a comprehensive digital marketing solution. I've heard great things about your work and would love to discuss how you can help us increase our online visibility and sales. Could we schedule a consultation this week?"}
												"
											</Text>
										</div>
									</Column>
								</Row>
							</Section>

							{/* Quick Actions with Properly Styled Button */}
							<Section className="mb-[32px] text-center">
								<Text className="mb-[24px] font-semibold text-[#201f1d] text-[18px]">
									Time to turn this interest into revenue
								</Text>

								<div className="text-center">
									<Link
										className="box-border inline-block rounded-[8px] border-[#ffc650] border-[2px] border-solid bg-[#ffc650] px-[40px] py-[16px] font-bold text-[#201f1d] text-[16px] no-underline transition-all hover:bg-[#201f1d] hover:text-[#ffc650]"
										href={`mailto:${props.email || "ahmed.mansouri@example.com"}?subject=Re: Your inquiry about Ziron Pro services&body=Hi ${props.name || "Ahmed"},\n\nThank you for your interest in Ziron Pro! I'd love to discuss how we can help grow your business with our strategy-led approach...\n\nBest regards,\nZiron Pro Team`}
										style={{
											display: "inline-block",
											backgroundColor: "#ffc650",
											color: "#201f1d",
											padding: "16px 40px",
											borderRadius: "8px",
											fontSize: "16px",
											fontWeight: "bold",
											textDecoration: "none",
											border: "2px solid #ffc650",
											boxSizing: "border-box",
											textAlign: "center",
											minWidth: "200px",
										}}
									>
										Reply to Lead →
									</Link>
								</div>

								<Text className="m-0 mt-[12px] text-[#666] text-[14px]">
									Quick response = higher conversion rates
								</Text>
							</Section>

							{/* Stats Bar */}
							<Section className="mb-[24px] rounded-[8px] bg-[#201f1d] p-[20px] text-center">
								<Row>
									<Column className="text-center">
										<Text className="m-0 mb-[4px] font-bold text-[#ffc650] text-[20px]">
											2k+
										</Text>
										<Text className="m-0 text-[#FFF] text-[12px]">
											Brands Served
										</Text>
									</Column>
									<Column className="text-center">
										<Text className="m-0 mb-[4px] font-bold text-[#ffc650] text-[20px]">
											6+
										</Text>
										<Text className="m-0 text-[#FFF] text-[12px]">
											Years in UAE
										</Text>
									</Column>
									<Column className="text-center">
										<Text className="m-0 mb-[4px] font-bold text-[#ffc650] text-[20px]">
											48h
										</Text>
										<Text className="m-0 text-[#FFF] text-[12px]">
											First Draft
										</Text>
									</Column>
								</Row>
							</Section>

							{/* Business Context with Enhanced Design */}
							<Section className="mb-[24px] rounded-[8px] border-[#ffc650] border-[1px] border-solid bg-[#ffc650] bg-opacity-10 p-[20px]">
								<Row>
									<Column className="w-[40px]">
										<div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#ffc650]">
											<Text className="m-0 font-bold text-[#201f1d] text-[16px]">
												💡
											</Text>
										</div>
									</Column>
									<Column>
										<Text className="m-0 text-[#201f1d] text-[14px] leading-[20px]">
											<strong>Pro tip:</strong> Quick response time is crucial
											for converting leads in the UAE market. Based on our
											experience across Dubai, Abu Dhabi, and Sharjah, reaching
											out within 2 hours significantly increases conversion
											rates.
										</Text>
									</Column>
								</Row>
							</Section>
						</Section>

						<Hr className="my-[32px] border-[#f6f5f3] border-solid" />

						{/* Enhanced Footer */}
						<Section>
							<Text className="m-0 mb-[12px] text-center text-[#666] text-[12px] leading-[16px]">
								This email was automatically generated from a contact form
								submission on{" "}
								<Link
									className="font-medium text-[#ffc650] no-underline"
									href="https://zironpro.ae"
								>
									zironpro.ae
								</Link>
							</Text>

							<Text className="m-0 mb-[16px] text-center text-[#666] text-[11px] leading-[16px]">
								This email may contain confidential or promotional content for
								the intended recipient. Product info may change without notice.
								By reading, you agree to Foneflip's Terms and Policies. If
								received in error, please delete and inform us.
							</Text>

							<div className="text-center">
								<div className="inline-block rounded-[20px] bg-[#f6f5f3] px-[16px] py-[8px]">
									<Text className="m-0 text-[#666] text-[12px]">
										© 2026 Ziron Pro. All rights reserved.
									</Text>
								</div>
							</div>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

ContactFormSubmissionEmail.PreviewProps = {
	name: "Ahmed Al-Mansouri",
	email: "ahmed.mansouri@example.com",
	phone: "+971 50 123 4567",
	service: "Complete Digital Marketing Package",
	message:
		"Hi Ziron Pro team, I'm the owner of a growing e-commerce business in Dubai and I'm looking for a comprehensive digital marketing solution. I've heard great things about your work and would love to discuss how you can help us increase our online visibility and sales. Could we schedule a consultation this week?",
};

export default ContactFormSubmissionEmail;
