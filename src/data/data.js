// Enhanced book data structure with pagination support
// export interface StoryPage {
//   pageNumber: number
//   content: string
// }

// export interface Book {
//   id: string
//   title: string
//   author: string
//   coverImage: string
//   category: string
//   readTime: string
//   rating: number
//   likes: number
//   totalPages: number
//   pages: StoryPage[]
//   nextStory?: {
//     id: string
//     title: string
//     author: string
//     coverImage: string
//     category: string
//     readTime: string
//   }
// }

export const booksData = [
  {
    id: "1",
    title: "The Enigmatic Forest",
    author: "Elara Nightshade",
    coverImage: "/placeholder.svg?height=400&width=300",
    category: "Fantasy",
    readTime: "5 min read",
    rating: 4.8,
    likes: 342,
    totalPages: 4,
    pages: [
      {
        pageNumber: 1,
        content: `In the heart of Eldoria, nestled between towering peaks and whispering valleys, lay the Enigmatic Forest. Its ancient trees, their gnarled branches reaching towards the heavens, held secrets untold. Legends spoke of mystical creatures, hidden pathways, and a source of unimaginable power concealed within its depths.

Elara, a young and courageous herbalist, had always been drawn to the forest's allure. She had heard the tales, felt the whispers of the wind carrying ancient knowledge, and yearned to uncover the truth that lay hidden beneath the emerald canopy.

One fateful morning, as the first rays of sunlight pierced through the leaves, Elara ventured into the Enigmatic Forest. With her trusty satchel filled with herbs and a heart full of determination, she embarked on a journey that would test her courage, challenge her beliefs, and forever change her destiny.
As she delved deeper into the forest's embrace, Elara encountered creatures of myth and legend. Playful sprites danced among the flowers, wise old ents shared their ancient wisdom, and mischievous goblins led her astray with their riddles and tricks.

The forest seemed alive with magic, every step revealing new wonders. Ancient runes glowed softly on tree bark, guiding her path through the labyrinthine undergrowth. The air itself shimmered with ethereal energy, and Elara could feel the forest's consciousness reaching out to her, testing her intentions.

But the forest was not without its dangers. Shadowy beasts lurked in the darkness, their eyes gleaming with malevolent intent. Treacherous traps lay hidden beneath the fallen leaves, waiting to ensnare the unwary traveler.
`,
      },
      {
        pageNumber: 2,
        content: `As she delved deeper into the forest's embrace, Elara encountered creatures of myth and legend. Playful sprites danced among the flowers, wise old ents shared their ancient wisdom, and mischievous goblins led her astray with their riddles and tricks.

The forest seemed alive with magic, every step revealing new wonders. Ancient runes glowed softly on tree bark, guiding her path through the labyrinthine undergrowth. The air itself shimmered with ethereal energy, and Elara could feel the forest's consciousness reaching out to her, testing her intentions.

But the forest was not without its dangers. Shadowy beasts lurked in the darkness, their eyes gleaming with malevolent intent. Treacherous traps lay hidden beneath the fallen leaves, waiting to ensnare the unwary traveler.`,
      },
      {
        pageNumber: 3,
        content: `A dark force, known only as the Shadow Lord, sought to corrupt the forest's power for his own sinister purposes. His influence spread like a poison through the ancient groves, turning once-beautiful clearings into twisted nightmares of thorns and decay.

With each challenge she faced, Elara grew stronger, wiser, and more determined to protect the Enigmatic Forest from the encroaching darkness. She learned to trust her instincts, to rely on her knowledge of herbs and nature, and to embrace the power that lay dormant within her.

The forest spirits began to recognize her pure heart and noble intentions. They whispered secrets of ancient magic, teaching her to harness the natural energies that flowed through every living thing in the forest.`,
      },
      {
        pageNumber: 4,
        content: `In a climactic battle against the Shadow Lord, Elara unleashed her full potential, harnessing the forest's energy to banish the darkness and restore balance to the land. The very trees seemed to bend to her will, their branches forming protective barriers while their roots entangled the dark creatures.

The Enigmatic Forest rejoiced, its trees swaying in gratitude, its creatures singing her praises. Light returned to the darkened groves, and the corrupted areas began to heal, blooming with new life and vibrant colors.

Elara returned to her village a hero, forever bound to the Enigmatic Forest. She became its guardian, its protector, and its voice, ensuring that its secrets would be preserved for generations to come. And so, the legend of Elara, the herbalist who saved the Enigmatic Forest, lived on, inspiring others to embrace their courage, trust their instincts, and protect the wonders of the natural world.`,
      },
    ],
    nextStory: {
      id: "2",
      title: "Whispers in the Void",
      author: "Orion Black",
      coverImage: "/placeholder.svg?height=400&width=300",
      category: "Sci-Fi",
      readTime: "7 min read",
    },
  },
  {
    id: "2",
    title: "Whispers in the Void",
    author: "Orion Black",
    coverImage: "/placeholder.svg?height=400&width=300",
    category: "Sci-Fi",
    readTime: "7 min read",
    rating: 4.5,
    likes: 287,
    totalPages: 4,
    pages: [
      {
        pageNumber: 1,
        content: `Commander Aria Novak floated in the observation module of the Artemis VII, the most advanced deep space exploration vessel humanity had ever built. The vast emptiness of space stretched before her, an endless canvas of darkness punctuated by distant stars. She had been alone on this mission for 437 days, with only the ship's AI, HERA, for company.

"HERA, status report," Aria commanded, her voice breaking the silence that had enveloped the module for hours.

"All systems nominal, Commander," HERA's smooth, synthesized voice responded. "We are on course for the Proxima Centauri system. Estimated arrival in 32 days."

Aria nodded, though there was no one to acknowledge the gesture. The isolation was beginning to wear on her. The mission had been planned for three crew members, but budget cuts and political pressure had reduced it to a solo journey.`,
      },
      {
        pageNumber: 2,
        content: `As she gazed into the void, something unusual caught her attention. A faint whisper, almost imperceptible, seemed to emanate from nowhere and everywhere at once.

"HERA, are you picking up any audio anomalies?" Aria asked, her heart rate increasing slightly.

"Negative, Commander. All audio systems functioning within normal parameters."

The whisper came again, slightly louder this time. It was unintelligible, like a distant conversation just beyond the threshold of hearing. For the next few days, the whispers continued, growing gradually more distinct. Aria began to discern patterns, though not words. It was as if the void itself was trying to communicate with her.

On the seventh day of the whispers, Aria woke to find strange symbols etched into the condensation on her sleeping pod's window.`,
      },
      {
        pageNumber: 3,
        content: `"HERA, analyze the symbols on my pod window," she said, capturing images with her tablet.

"No symbols detected, Commander. The window is clear."

Aria stared at the tablet, which clearly showed the intricate patterns. Either HERA's visual systems were malfunctioning, or something far more inexplicable was happening.

That night, as the ship hummed quietly around her, the whispers coalesced into a single, clear sentence: "You are not alone, Aria Novak."

A chill ran down her spine. The voice knew her name.

"We have always been here, in the spaces between stars," the voice replied. "Your species is young, but you, Aria, you can hear us. You are a bridge."

Over the following weeks, Aria learned from the entities that called themselves the Void Dwellers.`,
      },
      {
        pageNumber: 4,
        content: `They existed in dimensions adjacent to our own, perceiving time and space in ways incomprehensible to human minds. They had watched humanity's progress with curiosity and concern.

"Your kind stands at a crossroads," they told her. "The path you choose will determine whether you join us among the stars or fade into cosmic memory."

As the Artemis VII approached Proxima Centauri, Aria made a decision. The knowledge the Void Dwellers had shared with her could transform human understanding of the universe, but it could also be weaponized by those seeking power.

She would return to Earth not as a conquering hero bringing alien secrets, but as a messenger with a simple truth: we are not alone, and our actions echo across dimensions we cannot yet perceive.

The whispers would stay with her always, a constant reminder of the vastness of existence and humanity's small but significant place within it.`,
      },
    ],
    nextStory: {
      id: "1",
      title: "The Enigmatic Forest",
      author: "Elara Nightshade",
      coverImage: "/placeholder.svg?height=400&width=300",
      category: "Fantasy",
      readTime: "5 min read",
    },
  },
];
