import Image from 'next/image';

export default function AboutPage() {
    return (
        <main className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-bold mb-12 text-center">About the Artist</h1>

            <div className="flow-root">
                <div className="md:float-left w-full md:w-80 lg:w-96 md:mr-10 mb-8 relative aspect-[4/5] rounded-lg overflow-hidden shadow-lg bg-muted">
                    <Image
                        src="/artist.jpg"
                        alt="Darshini Aithal Portrait"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="space-y-6 text-foreground/90 leading-relaxed text-lg">
                    <p>
                        A friend of mine recently asked me a question. "What does art mean to you." It was a straightforward question that got me thinking. "What does it really mean to me?" "Art to me is ___," where I could fill in the blanks with adverbs that sounded like a cliché. I dug deeper into my soul, and I came up with a word: <strong>"Emotion."</strong>
                    </p>

                    <p>
                        Art is an emotion to me. Ever since I was a young girl, it spoke to me, and it mesmerized me. When all my friends were playing outside, I'd spend hours at my desk just doodling—lost in my world; I knew that was my calling. I was fortunate to know that I wanted to pursue art as a career at a very young age. It's so true when they say that if you enjoy what you do, you won't work a single day of your life. Art has been extremely enriching and fulfilling for me.
                    </p>

                    <p>
                        I've gotten my formal education in Commercial Arts with emphasis on Graphic Design and Illustration. Over the years, as the technology evolved, I've updated my skills by attending various courses and getting certifications. Even after being in the field for over thirty years as a professional artist, I love to experiment with new techniques and various mediums. I genuinely believe that one stops to grow the moment one feels there's nothing more to learn.
                    </p>

                    <p>
                        When professional athletes are asked about the mystery behind their performance, they answer by using the word "zone," as in, "I was in the zone." I get it. When I do art, I'm in my zone, lost in the creative process, losing track of time, and oblivious to my surroundings. However, I'd like to add one more word… <strong>Zen</strong>. Art is my Zen, a meditative process. I'm in no hurry to reach the destination; instead, I'm enjoying the journey.
                    </p>

                    <div className="pt-6 border-t border-border mt-8">
                        <Image src="/logo.png" alt="Darshini Signature" width={200} height={60} className="mb-6 object-contain" />
                        <p className="mb-4">
                            The more I learn, the more I can give. I am an art educator; I get an immense satisfaction by enriching creative minds of budding artists. I have taught art to hundreds of art lovers. I have expanded my students' creative horizons and developed their skills through patient encouragement, individual attention, and specialized techniques.
                        </p>
                        <p>
                            See some of their work at <a href="https://justthinkart.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">justthinkart.com</a>, an award-winning art school in Orange County, CA founded in 2005.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
