"use client";
import Image from "next/image";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { collaborationItems } from "@/constants";

export default function Collaboration() {
	const container = useRef(null);
	const t = useTranslations("ourImpactContent");
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start end", "end start"],
	});
	const sc = useTransform(scrollYProgress, [0, 1], [100, -1500]);

	return (
		<div
			id="our-impact"
			className="w-full bg-[#260A2F] py-10 padding-x">
			<div className="w-full flex justify-start items-center xm:pb-10 sm:pb-10">
				<div className="w-[72%] xm:w-full sm:w-full flex flex-col gap-4">
					<h4 className="text-[24px] text-[#FFD7EF] leading-tight tracking-tighter">
						{t("ourImpactHeading1")}
					</h4>

					<h1 className="text-[80px] xm:text-[35px] sm:text-[40px] xm:leading-[40px] sm:leading-[50px] text-[#FFD7EF] font-bold leading-[80px] tracking-tighter">
						{t("ourImpactHeading2")}
					</h1>
				</div>
			</div>
			<div
				className="w-full py-20 xm:hidden sm:hidden"
				ref={container}>
				<motion.div
					style={{ x: sc }}
					className="w-full flex whitespace-nowrap gap-3">
					{collaborationItems.map((item) => (
						<div
							className="min-w-[500px] flex items-center justify-center py-5 px-5 border-[1.5px] border-[#FFD7EF] rounded-[20px]"
							key={item.id}>
							<Image
								src={item.src}
								alt="companiesImg"
								className="w-[600px] h-[100px] object-contain"
							/>
						</div>
					))}
				</motion.div>
			</div>

		</div>
	);
}
