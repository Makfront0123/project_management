export default function Footer() {
    return (
        <footer className="bg-[#4e38f5] text-gray-300 py-16">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4">
                        TeamFlow
                    </h2>

                    <p className="text-sm leading-relaxed">
                        TeamFlow is a modern project management platform designed to help
                        teams collaborate, organize tasks, and achieve their goals faster.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Product
                    </h3>

                    <ul className="space-y-2 text-sm">
                        <li><a href="#features" className="hover:text-white">Features</a></li>
                        <li><a href="#how" className="hover:text-white">How It Works</a></li>
                        <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                        <li><a href="#security" className="hover:text-white">Security</a></li>
                        <li><a href="#roadmap" className="hover:text-white">Roadmap</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Company
                    </h3>

                    <ul className="space-y-2 text-sm">
                        <li><a href="/about" className="hover:text-white">About Us</a></li>
                        <li><a href="/blog" className="hover:text-white">Blog</a></li>
                        <li><a href="/careers" className="hover:text-white">Careers</a></li>
                        <li><a href="/contact" className="hover:text-white">Contact</a></li>
                        <li><a href="/partners" className="hover:text-white">Partners</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Support
                    </h3>

                    <ul className="space-y-2 text-sm">
                        <li><a href="/help" className="hover:text-white">Help Center</a></li>
                        <li><a href="/docs" className="hover:text-white">Documentation</a></li>
                        <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
                        <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
                        <li><a href="/status" className="hover:text-white">System Status</a></li>
                    </ul>
                </div>

            </div>
            <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} TeamFlow. All rights reserved.
            </div>
        </footer>
    );
}
