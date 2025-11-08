"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { blackCircle } from "@/lib/images";
import { useTranslations } from "next-intl";
import { TextHover, Marquee } from "@/components";

export default function Footer() {
	const t = useTranslations("footerContent");

	const handleGetInTouch = () => {
		window.location.href = "mailto:krishmhatre34@gmail.com";
	};
	return (
		<>
			<div
				id="get-in-touch"
				className="w-full h-screen flex flex-col items-center padding-x justify-between pt-5">
				<Marquee
					titile1="Get in touch"
					titile2="Get in touch"
					className="text-[#ffeb69]"
				/>
				<div className="w-[80%] flex flex-col gap-10 xm:w-full sm:w-full">
					<div>
						<h1 className="text-[60px] xm:text-[40px] sm:text-[40px] xm:leading-[40px] sm:leading-[40px] text-[#ffeb69] font-bold leading-[62px] tracking-tight text-center xm:text-left sm:text-left">
							{t("footerHeading1")}
						</h1>
					</div>
					<div>
						<p className="text-[25px] text-[#ffeb69] leading-normal tracking-tight text-center xm:text-left sm:text-left">
							{t("footerHeading2")}
						</p>
					</div>
					<div className="flex items-center justify-center">
						<button
							onClick={handleGetInTouch}
							className="group flex gap-2 items-center text-[17px] font-semibold capitalize text-[#260A2F] bg-secondary rounded-full leading-tight tracking-tight px-4 py-3 hover:scale-105 transition-transform duration-300">
							<Image
								src={blackCircle}
								alt="blackCircle"
								width={30}
								height={30}
								className="group-hover:rotate-[60deg] transition-all duration-300 ease-linear"
							/>
							<TextHover
								titile1={t("footerBtn")}
								titile2={t("footerBtn")}
							/>
						</button>
					</div>
				</div>
				<div className="w-full flex justify-between gap-5 py-10 xm:flex-col sm:flex-col">
					<div className="w-1/2 xm:w-full sm:w-full flex gap-5 justify-between xm:flex-col sm:flex-col">
						<div className="flex flex-col gap-5">
							<div className="flex flex-col">
								<p className="text-[16px] text-[#9FE870] leading-tight tracking-tight">
									linkedin
								</p>
								<Link
									className="text-[30px] font-semibold text-[#9FE870] leading-tight tracking-tight"
									href="https://linkedin.com/in/krishmhatre"
									target="_blank"
									rel="noopener noreferrer">
									krishmhatre
								</Link>
							</div>
							<div className="flex flex-col">
								<p className="text-[16px] text-[#9FE870] leading-tight tracking-tight">
									GitHub
								</p>
								<Link
									className="text-[30px] font-semibold text-[#9FE870] leading-tight tracking-tight"
									href="https://github.com/T2-Astra"
									target="_blank"
									rel="noopener noreferrer">
									T2-Astra
								</Link>
							</div>
						</div>
						<div className="flex flex-col gap-5">
							<div className="flex flex-col">
								<p className="text-[16px] text-[#9FE870] leading-tight tracking-tight">
									E-mail
								</p>
								<Link
									className="text-[30px] font-semibold text-[#9FE870] leading-tight tracking-tight"
									href="mailto:krishmhatre34@gmail.com">
									krishmhatre34@gmail.com
								</Link>
							</div>
							<div className="flex flex-col">
								<p className="text-[16px] text-[#9FE870] leading-tight tracking-tight">
									Instagram
								</p>
								<Link
									className="text-[30px] font-semibold text-[#9FE870] leading-tight tracking-tight"
									href="https://www.instagram.com/krishmhatre1805"
									target="_blank"
									rel="noopener noreferrer">
									@krishmhatre1805
								</Link>
							</div>
						</div>
					</div>
					<div className="w-[30%] xm:w-full sm:w-full">
						<div className="flex flex-col gap-10">
							<div className="flex flex-col">
								<p className="text-[16px] text-[#9FE870] leading-tight tracking-tight">
									Maharashtra
								</p>
								<Link
									className="text-[30px] font-semibold text-[#9FE870] leading-tight tracking-tight"
									href="/">
									Mumbai
								</Link>
							</div>
						</div>
					</div>
				</div>

				<div className="w-full flex flex-col">
					<motion.div
						initial={{ borderTopWidth: 0, width: "0%" }}
						viewport={{ once: true }}
						whileInView={{
							borderTopWidth: 1,
							width: "100%",
							borderColor: "#9FE870",
							origin: "left",
						}}
						transition={{
							duration: 1,
							ease: "easeInOut",
						}}
					/>
					<div className="w-full flex items-center justify-between py-4">
						<motion.h2
							initial={{ y: "100%" }}
							viewport={{ once: true }}
							whileInView={{
								y: 0,
							}}
							transition={{
								duration: 1,
								ease: "easeInOut",
							}}
							className="text-[#9FE870] text-sm overflow-hidden">
							T2 Astra 2025
						</motion.h2>
						<motion.h2
							initial={{ y: "100%" }}
							viewport={{ once: true }}
							whileInView={{
								y: 0,
							}}
							transition={{
								duration: 1,
								ease: "easeInOut",
							}}
							className="text-[#9FE870] text-sm overflow-hidden">
							Privacy Statement
						</motion.h2>
					</div>
				</div>
			</div>
		</>
	);
}
