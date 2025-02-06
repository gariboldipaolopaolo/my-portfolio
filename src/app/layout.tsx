import type {Metadata} from "next";
import "./globals.css";
import localFont from "next/font/local";

const ppNeueMontreal = localFont({
    src: "../fonts/NeueMontreal-Regular.otf",
    weight: "500",
});

export const metadata: Metadata = {
    title: "Paolo Gariboldi | Software Engineer & Web Developer",
    description: "Experienced Software Engineer and Web Developer specializing in modern web technologies, " +
        "scalable architectures, and innovative digital solutions. " +
        "Explore my portfolio to see my latest projects and expertise in full-stack development.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${ppNeueMontreal.className}`}>
        {children}
        </body>
        </html>
    );
}
