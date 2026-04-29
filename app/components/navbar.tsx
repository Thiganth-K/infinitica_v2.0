import CardNav, { CardNavItem } from "./CardNav";

const navigationItems: CardNavItem[] = [
	{
		label: "Our Products",
		links: [
			{ label: "Hiresapien", href: "#hiresapien", badge: "AI" },
			{ label: "Sentra", href: "#sentra", badge: "DATA" },
			{ label: "Zippy Mind", href: "#zippymind", badge: "NEURAL" },
			{ label: "Neural Flow", href: "#", badge: "WIP" },
		],
		bottomLinks: [
			{ label: "Documentation", href: "#" },
			{ label: "API Reference", href: "#", badge: "NEW" },
		]
	},
	{
		label: "Explore",
		links: [
			{ label: "Use Cases", href: "#use-cases" },
			{ label: "Insights", href: "#insights" },
			{ label: "Genesis", href: "#genesis" },
			{ label: "Community", href: "#", count: 1204 },
		],
		socials: [
			{ icon: "linkedin", href: "#" },
			{ icon: "instagram", href: "#" },
			{ icon: "x", href: "#" },
		]
	},
];

export default function Navbar() {
	return (
		<header className="fixed top-6 left-0 w-full z-[100] px-4 pointer-events-none">
			<CardNav
				logo="/infinitica.png"
				logoAlt="Infinitica"
				items={navigationItems}
				className="shadow-infinitica pointer-events-auto"
				ease="power4.out"
			/>
		</header>
	);
}
