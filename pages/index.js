import Link from "next/link"

export default function Home() {
    return (
        // <div className="container mx-auto">
        //     ChatNFT: Unlocking the Possibilities of Interacting with Your NFTs
        //     Please create your chatNFTs and chat with them.
        // </div>
        <div>
            <main>
                <section className="hero">
                    <h2>Chat with your NFTs</h2>
                    <p>
                        ChatNFT is a platform that allows you to chat with your NFTs on the Fantom
                        network. Discover more about your digital assets and interact with them on
                        a personal level.
                    </p>
                    <p>You can create a new ChatNFT for free now.</p>
                    <Link href="/create-chatnft">
                        <button>Get Started</button>
                    </Link>
                </section>
                <section className="features">
                    <h3>Features</h3>
                    <ul>
                        <li>Chat with your NFTs using natural language</li>
                        <li>Discover more about your digital assets</li>
                        <li>Share your NFTs with others (coming soon)</li>
                    </ul>
                </section>
                <section className="testimonials">
                    <h3>What our users are saying</h3>
                    <blockquote>
                        "I love ChatNFT! It's a great way to learn more about my NFTs and interact
                        with them on a personal level."
                    </blockquote>
                    <blockquote>
                        "ChatNFT is a game-changer. I can't wait to see what they come up with
                        next."
                    </blockquote>
                </section>
            </main>
            <footer className="indexfooter">
                <p>&copy; 2023 ChatNFT</p>
            </footer>
        </div>
    )
}
