import { MovieEntry } from '../types';
import { updateRating as firebaseUpdateRating } from './firebase.service';

export interface CommentMessage {
  id: string;
  text: string;
  sender: 'shared' | 'jojo' | 'dodo';
  createdAt: number;
}

const MOVIES_DATA: MovieEntry[] = [
  {
    "id": "1",
    "title": "Exit 2019",
    "type": "movie",
    "status": "watched",
    "date": "2025-12-04",
    "genres": ["Action", "Comedy", "Drama"],
    "duration": "1h 43m",
    "story": "We expected a light and funny movie night, but EXIT surprised us. When a strange toxic gas spreads through the city, two ordinary people are forced to escape using creativity, teamwork, and courage. The movie balances tension and humor really well, keeping us stressed and smiling at the same time. By the end, it felt hopeful and energetic, the kind of movie that makes a movie night memorable.",
    "posterUrl": "/assets/exit 2019/captures/exit 2019.jpg",
    "captures": [
      "/assets/exit 2019/captures/exit 2019.jpg",
      "/assets/exit 2019/captures/1.jpg",
      "/assets/exit 2019/captures/2.jpg",
      "/assets/exit 2019/captures/3.jpg",
      "/assets/exit 2019/captures/4.jpg",
      "/assets/exit 2019/captures/5.jpg",
      "/assets/exit 2019/captures/6.jpg",
      "/assets/exit 2019/captures/7.jpg",
      "/assets/exit 2019/captures/8.jpg"
    ],
    "videos": [
      { "title": "Movie", "url": "https://drive.google.com/file/d/1j2M3kB9Ie1jEHNGTyIxJ1JegYjUAedXm/view?usp=sharing", "type": "local" }
    ]
  },
  {
    "id": "2",
    "title": "Tunnel 2016",
    "type": "movie",
    "status": "watched",
    "date": "2025-12-12",
    "genres": ["Drama", "Thriller"],
    "duration": "2h 06m",
    "story": "What started as a normal drive quickly turned into a tense movie night. After a tunnel suddenly collapses, one man is trapped underground with limited time and hope. While rescue teams struggle outside, the movie focuses on patience, mental strength, and the quiet fight to stay alive. It's a slow, heavy story that left us silent for a moment after it ended.",
    "posterUrl": "/assets/tunnel 2016/captures/tunnel 2016.jpg",
    "captures": [
      "/assets/tunnel 2016/captures/tunnel 2016.jpg",
      "/assets/tunnel 2016/captures/1.jpg",
      "/assets/tunnel 2016/captures/2.jpg",
      "/assets/tunnel 2016/captures/3.jpg"
    ],
    "videos": [
      { "title": "Movie", "url": "https://drive.google.com/file/d/1_S_3ksKV5ctu1_kjQXPXz2oh-hhwozKd/view?usp=sharing", "type": "local" }
    ]
  },
  {
    "id": "3",
    "title": "Walking to School 2009",
    "type": "movie",
    "status": "watched",
    "date": "2025-12-19",
    "genres": ["Drama", "Family"],
    "duration": "1h 33m",
    "story": "This movie night was beautiful and emotional. It tells the story of two young siblings who travel a long, difficult path just to reach school in a remote mountain village. What starts as a simple journey becomes a powerful story about childhood, education, and the sacrifices people make to learn. It reminded us how lucky we are and left us quietly thinking after the credits rolled.",
    "posterUrl": "/assets/walking to school 2009/captures/walking to school 2009.jpg",
    "captures": [
      "/assets/walking to school 2009/captures/walking to school 2009.jpg"
    ],
    "videos": [
      { "title": "Movie", "url": "https://www.youtube.com/embed/TwMve9_LtbE?si=L3XOHO_pDZEhYzxZ", "type": "embed" }
    ]
  },
  {
    "id": "4",
    "title": "Home Alone 1990",
    "type": "movie",
    "status": "watched",
    "date": "2025-12-26",
    "genres": ["Comedy", "Family"],
    "duration": "1h 43m",
    "story": "A perfect Christmas movie night! Home Alone is a classic we watched together, full of humor, clever traps, and holiday spirit. The story of young Kevin defending his home from two clumsy burglars never gets old, no matter how many times we've seen it. It's funny, heartwarming, and reminded us why this movie is a tradition for so many families around the world.",
    "posterUrl": "/assets/home alone 1990/captures/home alone 1990.jpg",
    "captures": [
      "/assets/home alone 1990/captures/home alone 1990.jpg",
      "/assets/home alone 1990/captures/1.jpg",
      "/assets/home alone 1990/captures/2.jpg",
      "/assets/home alone 1990/captures/3.jpg",
      "/assets/home alone 1990/captures/4.jpg"
    ],
    "videos": [
      { "title": "Movie", "url": "https://drive.google.com/file/d/1yF7GT_59NEPbfwZ2H59gWABF8pk5nzFH/view?usp=sharing", "type": "local" }
    ]
  },
  {
    "id": "5",
    "title": "Like Stars on Earth 2007",
    "type": "movie",
    "status": "upcoming",
    "date": "2026-01-02",
    "genres": ["Drama", "Family"],
    "duration": "2h 42m",
    "story": "This was one of those movie nights that stays with you. Like Stars on Earth follows a young boy struggling in school because he sees the world differently. When a teacher finally understands him, the movie becomes a touching story about empathy, learning, and recognizing the unique strengths in every child. We finished the movie in silence, moved by its message and its emotional ending.",
    "posterUrl": "/assets/like on stars on earth 2007/captures/Like Stars on Earth 2007.jpg",
    "captures": [
      "/assets/like on stars on earth 2007/captures/Like Stars on Earth 2007.jpg"
    ],
    "videos": [
      { "title": "Movie", "url": "https://drive.google.com/file/d/1kL7mH9Ii8JfGHNiJxKLlMnNoPqRsTuVw/preview", "type": "local" }
    ]
  },
  {
    "id": "6",
    "title": "Home Alone 2",
    "type": "movie",
    "status": "watched",
    "date": "2026-01-09",
    "genres": ["Comedy", "Family"],
    "duration": "2h 00m",
    "story": "We continued the Home Alone tradition with the second part, and it was just as fun as the first. This time Kevin is lost in New York City during Christmas, facing the same burglars with even crazier traps and more laughs. The movie kept the same charm, humor, and heart, making it another perfect movie night filled with smiles and holiday spirit.",
    "posterUrl": "/assets/home alone 1992/captures/home alone 2.jpeg",
    "captures": [
      "/assets/home alone 1992/captures/home alone 2.jpeg"
    ],
    "videos": [
      { "title": "Movie", "url": "https://drive.google.com/file/d/1UvsqdxC-xjDJCorr7ON4rYndnzfQOHsE/view?usp=sharing", "type": "local" }
    ]
  },
  {
    "id": "7",
    "title": "Brother (Abi)",
    "originalTitle": "Abi",
    "type": "tv",
    "status": "watched",
    "date": "2026-06-10",
    "genres": ["Drama", "Family", "Psychological"],
    "duration": "Weekly Series • 18 Episodes Total",
    "episodeRuntimeMinutes": 190,
    "story": "The Turkish series Abi (My Brother) revolves around the idea that family is a true test. It follows the story of Çağla, a lawyer who was pushed into her profession by the harshness of life and the absence of a real family. On the other side stands Doğan, a man from a large and wealthy family who ran away in an attempt to escape a past filled with secrets. But life forces a confrontation, and the doors to a deep relationship open, where each of them carries postponed wounds—wounds they can neither open nor close… wounds called family. New episodes air weekly.",
    "posterUrl": "/assets/ABIM/abi.png",
    "captures": [
      "/assets/ABIM/abi.png"
    ],
    "episodes": [
      {
        "number": 1,
        "title": "Episode 1",
        "summary": "The beginning of Çağla and Doğan's story. A chance encounter brings together two people from completely different worlds, setting the stage for a complex relationship built on secrets and unspoken wounds.",
        "date": "2026-01-13",
        "status": "watched"
      },
      {
        "number": 2,
        "title": "Episode 2",
        "summary": "As their lives become more intertwined, Çağla and Doğan must confront the weight of their pasts. Family loyalties are tested, and the cracks in their facades begin to show.",
        "date": "2026-01-20",
        "status": "watched"
      },
      {
        "number": 3,
        "title": "Episode 3",
        "summary": "Deeper revelations emerge about Doğan's wealthy family and the reasons he left. Çağla's professional and personal boundaries blur as she gets drawn further into his world.",
        "date": "2026-01-27",
        "status": "watched"
      },
      {
        "number": 4,
        "title": "Episode 4",
        "summary": "The past refuses to stay buried. Both characters face choices that will define their futures, while the question of whether family is a blessing or a burden becomes more urgent.",
        "date": "2026-02-03",
        "status": "watched"
      },
      {
        "number": 5,
        "title": "Episode 5",
        "summary": "Trust becomes the central theme as secrets threaten to destroy everything they've built. Both Çağla and Doğan must decide how much they're willing to sacrifice for the truth.",
        "date": "2026-02-10",
        "status": "watched"
      },
      {
        "number": 6,
        "title": "Episode 6",
        "summary": "Confrontations reach a boiling point. The wounds they've carried for so long can no longer be ignored, forcing both characters to make difficult decisions about forgiveness and family.",
        "date": "2026-02-17",
        "status": "watched"
      },
      {
        "number": 7,
        "title": "Episode 7",
        "summary": "The culmination of their journey together. Çağla and Doğan must finally face whether the wounds called family can ever truly heal, or if some scars run too deep.",
        "date": "2026-02-24",
        "status": "watched"
      },
      {
        "number": 8,
        "title": "Episode 8",
        "summary": "New revelations come to light as Çağla and Doğan navigate the aftermath of their confrontation, discovering that true healing requires more than just understanding—it demands forgiveness and acceptance.",
        "date": "2026-03-03",
        "status": "watched"
      },
      {
        "number": 9,
        "title": "Episode 9",
        "summary": "As the dust settles from recent events, new challenges emerge that test the strength of their bond and force them to re-evaluate what truly matters.",
        "date": "2026-03-11",
        "status": "watched"
      },
      {
        "number": 10,
        "title": "Episode 10",
        "summary": "As Çağla and Doğan prepare to face the consequences of their recent revelations, old family wounds resurface and threaten to tear them apart. They must make a definitive choice about where their loyalties lie before their shared past destroys their fragile future.",
        "date": "2026-03-18",
        "status": "watched"
      },
      {
        "number": 11,
        "title": "Episode 11",
        "summary": "After everything comes to a head, Çağla and Doğan are forced to rebuild trust from the ground up. With family pressure mounting from every side, they realize that choosing each other means confronting the truths they spent years avoiding.",
        "date": "2026-03-25",
        "status": "watched"
      },
      {
        "number": 12,
        "title": "Episode 12",
        "summary": "A new turning point pushes Çağla and Doğan to face one final emotional test, where the meaning of loyalty, family, and forgiveness is redefined.",
        "date": "2026-04-08",
        "status": "watched"
      },
      {
        "number": 13,
        "title": "Episode 13 - Duydun mu kalbimi?",
        "summary": "Did you hear my heart? It's beating so strongly... In an episode that begins with Doğan opening his eyes at the mansion after being seriously wounded, the family balance is shaken beyond repair. As the secrets behind Melek being forced to marry Yılmaz slowly come to light, Doğan realizes how heavy a burden his sister has been carrying and reaches a point where he is ready to sacrifice his own life to protect her. Meanwhile, Genco comes face to face with death under Tahir's orders, while Çağla is caught between two fires and tries to save both Doğan and Genco. The marriage carried out under Tahir's pressure is not surrender for Melek, but a price she pays to save her brother. At the courthouse, Doğan prepares to take the blame, but Tahir changing his statement at the last moment turns everything upside down and Doğan regains his freedom. However, the true intention behind this decision and the weight of the crime Melek carries deepen the family conflict even further and open the door to a new reckoning.",
        "date": "2026-04-15",
        "status": "watched"
      },
      {
        "number": 14,
        "title": "Episode 14",
        "summary": "The fallout from Tahir's shocking decision forces Çağla and Doğan into a fragile alliance, while Melek's sacrifice becomes the center of a painful family reckoning that could change everything.",
        "date": "2026-04-22",
        "status": "watched"
      },
      {
        "number": 15,
        "title": "Episode 15",
        "summary": "Episode 15 of My Brother brings a turning point in the story, as family tensions rise and hidden truths begin to surface. The brothers face new conflicts that test their loyalty and trust, while the romantic subplot grows more complicated with misunderstandings and outside pressures. As past secrets are revealed, relationships are shaken, and the episode closes with a dramatic cliffhanger that sets the stage for even greater challenges in the next chapter.",
        "date": "2026-05-13",
        "status": "watched"
      },
      {
        "number": 16,
        "title": "Episode 16",
        "summary": "In Episode 16 of My Brother, the story takes a dramatic turn as the brothers confront the consequences of their recent actions. The family dynamics become even more strained as new secrets are revealed, and the romantic subplot reaches a boiling point with unexpected twists. As tensions rise, the episode ends with a shocking revelation that leaves viewers eager for the next installment.",
        "date": "2026-05-20",
        "status": "watched"
      },
      {
        "number": 17,
        "title": "Episode 17",
        "summary": "Episode 17 of My Brother delves deeper into the complexities of the characters' relationships and the consequences of their actions. As the story unfolds, new challenges arise that test the brothers' resolve and force them to confront their deepest fears and insecurities.",
        "date": "2026-06-03",
        "status": "watched"
      },
      {
        "number": 18,
        "title": "Episode 18",
        "summary": "The season finale brings every uncovered secret to a head. Çağla and Doğan face their ultimate reckoning, and the family must decide whether they can heal together or remain broken by the wounds they carry.",
        "date": "2026-06-10",
        "status": "watched"
      }
    ],
    "videos": [
      { "title": "Episode 1", "url": "https://drive.google.com/file/d/1VsWGSd-Sy1VqZ2Gy90JW-nzQ19yN-zJf/view?usp=sharing", "type": "local" },
      { "title": "Episode 2", "url": "https://drive.google.com/file/d/1oxrtikqjBdJFlJLt8XmCBqNxpf4REZMI/view?usp=sharing", "type": "local" },
      { "title": "Episode 3", "url": "https://drive.google.com/file/d/1MlEfhG2BzMPfSWbDaixSV5Tk7OZbFlG4/view?usp=sharing", "type": "local" },
      { "title": "Episode 4", "url": "https://drive.google.com/file/d/1vsNJckTfvIBbb6Nz2YfitMEXYwPcUeUv/view?usp=sharing", "type": "local" },
      { "title": "Episode 5", "url": "https://drive.google.com/file/d/1ACOFv8X12EEtZUBDCa--q0dda15R0Idx/view?usp=sharing", "type": "local" },
      { "title": "Episode 6", "url": "https://drive.google.com/file/d/1Nap6XwDmNv5vH9qlsQNEl9Ee3JutK6c2/view?usp=sharing", "type": "local" },
      { "title": "Episode 7", "url": "https://drive.google.com/file/d/1V3UHqPG1Lv3t4SUDDrDv61uAJ6thmT_7/view?usp=sharing", "type": "local" },
      { "title": "Episode 8", "url": "https://drive.google.com/file/d/1ImUrQh0LSBmf53k1kql9HkaKaeYFBGox/view?usp=sharing", "type": "local" },
      { "title": "Episode 9", "url": "https://drive.google.com/file/d/1jDR-clpsNmgr9YZMznS9PWYwlU_xl8Y8/view?usp=sharing", "type": "local" },
      { "title": "Episode 10", "url": "https://drive.google.com/file/d/10FQuy9OUhpng6xoxn30hZv0vl25o08li/view?usp=sharing", "type": "local" },
      { "title": "Episode 11", "url": "https://drive.google.com/file/d/1eWkX7duilKn2SS-u719xJzJyptK293Nl/view?usp=sharing", "type": "local" },
      { "title": "Episode 12", "url": "https://drive.google.com/file/d/1JEpVARvpzxoEhowo0WGFcdr_Ll3rxBFY/view?usp=sharing", "type": "local" },
      { "title": "Episode 13", "url": "https://drive.google.com/file/d/1E25jTHuSIX3LvKXIOFloku5a08T_WIJl/view?usp=sharing", "type": "local" },
      { "title": "Episode 14", "url": "https://drive.google.com/file/d/1bT38ZEVE7y-5Nhs4WKO8MHYTUNoZvQt1/view?usp=sharing", "type": "local" },
      { "title": "Episode 15", "url": "https://drive.google.com/file/d/1ji54Q8Zn77jWb5-dhuJeq7tWXIqP3VPj/view?usp=sharing", "type": "local" },
      { "title": "Episode 16", "url": "https://drive.google.com/file/d/1P0tsWBDQhKEl-OKvWDWfE4Y1mW8-hS6K/view?usp=sharing", "type": "local" },
      { "title": "Episode 17", "url": "https://drive.google.com/file/d/1RI-TzJdJ2Q_tityU02MFZuwxKuHtNwJl/view?usp=sharing", "type": "local" },
      { "title": "Episode 18", "url": "https://drive.google.com/file/d/1DNoddD7bkjcQEz79chOglYIT0TxfYnsF/view?usp=sharing", "type": "local" }
    ]
  },
  {
    "id": "22",
    "title": "Brother (Abi)",
    "originalTitle": "Abi",
    "type": "tv",
    "status": "watched",
    "date": "2026-09-09",
    "genres": ["Drama", "Family", "Psychological"],
    "duration": "Weekly Series • 1 Episodes Total",
    "episodeRuntimeMinutes": 190,
    "story": "Following the explosive revelations that shattered Doğan's family and forced Çağla to confront her own past, Season 2 deals with the devastating aftermath of exposed secrets. As new power struggles emerge within the family empire and hidden betrayals come to light, Çağla and Doğan find themselves pulled into a dangerous crossfire between justice, revenge, and loyalty. With the past demanding a final reckoning, both must decide whether their shared wounds will heal them or tear their lives apart for good.",
    "posterUrl": "/assets/ABIM/abis2.jpg",
    "episodes": [
      {
        "number": 1,
        "title": "Episode 1",
        "summary": "The beginning of Çağla and Doğan's story. A chance encounter brings together two people from completely different worlds, setting the stage for a complex relationship built on secrets and unspoken wounds.",
        "date": "2026-09-09",
        "status": "watched"
      },
      {
        "number": 2,
        "title": "Episode 2",
        "summary": " follows critical turning points for Leyla and Doğan as dangerous plans and escalating conflicts unfold. Leyla faces a difficult dilemma following Saruhan's marriage proposal, while Doğan grows suspicious of her actions and moves to protect his sister Melek. ",
        "date": "2026-09-16",
        "status": "watched"
      },
    ],
    "videos": [
      { "title": "Episode 1", "url": "https://drive.google.com/file/d/1vZjWnWMPBrwgwT0rk8df-yeq01wlDCSA/view?usp=sharing", "type": "local" },
      { "title": "Episode 2", "url": "https://drive.google.com/file/d/1Vg7G6W8lCIvYI2CQC1fFk0Dbg2Se7u_K/view?usp=sharing", "type": "local" }
    ]
    
  },
  {
    "id": "8",
    "title": "Top Gun",
    "type": "movie",
    "status": "upcoming",
    "date": "2026-02-01",
    "genres": ["Action", "Drama", "Aviation"],
    "duration": "1h 50m",
    "story": "An iconic aviation film that follows the story of Pete 'Maverick' Mitchell, a talented but reckless fighter pilot who attends the Navy's elite fighter weapons school. Full of aerial combat sequences, personal growth, and unforgettable moments that defined a generation of aviation cinema.",
    "posterUrl": "/assets/top gun 1/top gun 1.jpg",
    "captures": ["/assets/top gun 1/top gun 1.jpg"],
    "videos": [
      { "title": "Movie", "url": "https://drive.google.com/file/d/1cPE4HoZQtyEkeFB2tZTH3Iy5qcTtSn11/view?usp=sharing", "type": "local" }
    ]
  },
  {
    "id": "9",
    "title": "Top Gun: Maverick",
    "type": "movie",
    "status": "upcoming",
    "date": "2026-02-08",
    "genres": ["Action", "Drama", "Aviation"],
    "duration": "2h 11m",
    "reason": "After more than thirty years of service, Maverick returns as a top naval aviator, pushing the envelope as a test pilot while training a new generation of fighter pilots for a specialized mission. A stunning continuation that combines nostalgia with breathtaking modern aerial cinematography.",
    "posterUrl": "/assets/top gun 2/top gun 2.jpg",
    "captures": ["/assets/top gun 2/top gun 2.jpg"]
  },
  {
    "id": "10",
    "title": "Sully",
    "type": "movie",
    "status": "upcoming",
    "date": "2026-02-22",
    "genres": ["Drama", "Biography", "Aviation"],
    "duration": "1h 36m",
    "reason": "Tom Hanks stars as Captain Chesley 'Sully' Sullenberger in this gripping true story of the 'Miracle on the Hudson.' When US Airways Flight 1549 loses both engines after a bird strike, Sully makes the life-or-death decision to land on the Hudson River, saving all 155 passengers and crew. A suspenseful and riveting tale of heroism, quick thinking, and the investigation that followed.",
    "posterUrl": "/assets/sully/captures/sully.jpg",
    "captures": ["/assets/sully/captures/sully.jpg"],
    "videos": [
      { "title": "Movie", "url": "https://drive.google.com/file/d/1z6sVMA_2PixRBtIw660HMqwyY-r6uyMx/view?usp=sharing", "type": "local" }
    ]
  },
  {
    "id": "11",
    "title": "The Aviator",
    "type": "movie",
    "status": "upcoming",
    "date": "2026-03-01",
    "genres": ["Drama", "Biography", "Aviation"],
    "duration": "2h 50m",
    "story": "Leonardo DiCaprio delivers an Oscar-nominated performance as Howard Hughes, the legendary aviation pioneer, filmmaker, and business tycoon. The film chronicles his ambitious aviation projects, record-breaking flights, and his descent into mental illness. A sweeping epic directed by Martin Scorsese that captures the golden age of aviation and Hollywood.",
    "posterUrl": "/assets/the aviator/captures/the aviator.jpg",
    "captures": ["/assets/the aviator/captures/the aviator.jpg"],
    "videos": [
      { "title": "Movie", "url": "https://drive.google.com/file/d/1bdEHEaiTUTkIjpMOaHVC6dd4EB8PbLn9/view?usp=sharing", "type": "local" }
    ]
  },
  {
    "id": "12",
    "title": "Breaking Down And Reassembling A Boeing 747",
    "type": "movie",
    "status": "upcoming",
    "date": "2026-03-27",
    "genres": ["Documentary", "Aviation"],
    "duration": "59m",
    "story": "A behind-the-scenes documentary that follows the full teardown and rebuild process of a Boeing 747, from engineering logistics to final assembly.",
    "posterUrl": "/assets/Boeing 747/Boeing 747.jpg",
    "captures": ["/assets/Boeing 747/Boeing 747.jpg"],
    "videos": [
      { "title": "Movie", "url": "https://drive.google.com/file/d/1NWoPoH3Y0Jmlg54NNNgLriOQRq-gLbgz/view?usp=sharing", "type": "local" }
    ]
  },
  {
    "id": "13",
    "title": "Manufacturing an Airbus A350",
    "type": "movie",
    "status": "upcoming",
    "date": "2026-03-27",
    "genres": ["Documentary", "Aviation"],
    "duration": "49 min",
    "story": "A documentary focused on the engineering and production process behind the Airbus A350, from structural assembly to final delivery.",
    "posterUrl": "/assets/a350/a350.webp",
    "captures": ["/assets/a350/a350.webp"],
    "videos": [
      { "title": "Movie", "url": "https://drive.google.com/file/d/1zuZdagxuXtKzFLi-dqZUWzQrq8RoGOso/view?usp=sharing", "type": "local" }
    ]
  },
  {
    "id": "14",
    "title": "Onward",
    "type": "movie",
    "status": "watched",
    "date": "2026-07-23",
    "genres": ["Animation", "Adventure", "Family"],
    "duration": "1h 42m",
    "reason": "A magical brotherhood road trip through a modern fantasy world, full of heart and wonder. Perfect for a cozy movie night with enchanting moments and emotional connection.",
    "posterUrl": "/assets/onward/onward.jpeg",
    "captures": ["/assets/onward/onward.jpeg"],
    "videos": [
      { "title": "Movie", "url": "https://drive.google.com/file/d/149B_DEr1RFn4uxqdI0w9mCKnIVRfkvZq/view?usp=drive_link", "type": "local" }
    ]
  },
  {
  "id": "15",
  "title": "Tom Sawyer",
  "originalTitle": "Tom Sawyer",
  "type": "tv",
  "duration": "30 min",
  "status": "watched",
  "date": "2026-09-16",
  "genres": ["Adventure", "Family", "Drama"],
  "story": "Tom Sawyer — 49 episodes.",
  "posterUrl": "/assets/tom/tom.png",
  "captures": [
    "/assets/tom/tom.png"
  ],

  "episodes": [
  {
    "number": 1,
    "title": "Le cochon sauvage",
    "summary": "Tom reçoit encore une punition à l'école, mais son esprit est déjà ailleurs. Après les cours, Huck lui demande de l'aider à capturer un cochon sauvage afin de pouvoir le vendre. Leur tentative prend une tournure complètement imprévue lorsque l'animal s'enfuit et entraîne les deux garçons jusqu'à un bateau à vapeur, provoquant un véritable désordre.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 2,
    "title": "Jeux de mains, jeux de vilains",
    "summary": "Tante Polly oblige Tom à repeindre la longue palissade de la maison pendant son samedi. Tom déteste cette corvée et cherche immédiatement un moyen d'y échapper. Avec son imagination et son talent pour convaincre les autres garçons, il transforme progressivement cette punition en une activité que tous veulent essayer.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 3,
    "title": "Un grand amour",
    "summary": "En allant accueillir sa cousine Mary au débarcadère, Tom rencontre Becky Thatcher, la fille du juge. Il tombe immédiatement sous son charme et commence à vouloir se faire remarquer par elle. Pour Tom, cette rencontre change soudainement sa manière de voir l'école et ses journées à Saint-Petersburg.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 4,
    "title": "Sortilège",
    "summary": "Tom cherche désespérément un moyen d'attirer l'attention de Becky. Convaincu que quelques tours mystérieux pourraient l'impressionner, il se tourne vers les histoires de magie et les croyances populaires. Son imagination l'entraîne dans une nouvelle aventure où il tente de résoudre ses problèmes avec un peu de superstition et beaucoup d'audace.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 5,
    "title": "Becky",
    "summary": "Tom est tellement préoccupé par Becky qu'il commence à considérer l'école d'une manière très différente. Lui qui cherchait habituellement toutes les excuses possibles pour sécher les cours veut maintenant être présent auprès de la nouvelle élève. Ses efforts pour devenir un meilleur garçon ne se déroulent cependant pas toujours comme prévu.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 6,
    "title": "La maison de Huck",
    "summary": "Tom découvre encore davantage la vie très particulière de Huck, qui vit seul dans une petite cabane près du fleuve. Les deux garçons imaginent différentes façons d'améliorer leur refuge et de vivre comme de véritables aventuriers. Leur projet devient une nouvelle occasion de faire des bêtises et d'échapper aux règles des adultes.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 7,
    "title": "La rivalité",
    "summary": "L'arrivée d'un garçon capable de rivaliser avec Tom bouleverse son équilibre habituel. Tom n'apprécie pas de voir quelqu'un attirer l'attention et cherche immédiatement à montrer qu'il reste le garçon le plus courageux et le plus populaire. Une compétition s'installe et transforme leurs jeux ordinaires en véritable défi.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 8,
    "title": "Panique à bord",
    "summary": "Une nouvelle aventure conduit Tom et ses amis à bord d'un bateau à vapeur. Ce qui devait être une simple escapade se transforme rapidement en situation dangereuse. Les garçons doivent improviser pour faire face au mouvement du bateau et au chaos qu'ils ont eux-mêmes contribué à provoquer.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 9,
    "title": "Les enfants de Tante Polly",
    "summary": "La vie quotidienne chez Tante Polly devient mouvementée avec Tom, Sid et Mary réunis sous le même toit. Les différences de caractère entre les enfants créent de nombreuses disputes et malentendus. Tom, toujours incapable de rester tranquille, trouve encore une façon de transformer une situation ordinaire en aventure.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 10,
    "title": "Le trésor",
    "summary": "Tom et Huck commencent à rêver sérieusement de trouver un trésor caché. Les histoires de pirates, de pièces d'or et de richesses mystérieuses nourrissent leur imagination. Ils se lancent dans leurs recherches avec la conviction qu'une grande fortune pourrait se trouver quelque part autour de Saint-Petersburg.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 11,
    "title": "Les pirates",
    "summary": "Tom, Huck et leurs amis décident de vivre comme de véritables pirates. Ils abandonnent momentanément la vie ordinaire pour partir à l'aventure et imaginent qu'ils naviguent sur les grands fleuves à la recherche de richesses. Leur jeu devient progressivement beaucoup plus sérieux qu'ils ne l'avaient prévu.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 12,
    "title": "Le professeur",
    "summary": "Tom doit faire face aux exigences de son professeur et aux règles strictes de l'école. Son caractère indépendant entre rapidement en conflit avec l'autorité. Pendant que les adultes essaient de lui apprendre la discipline, Tom cherche surtout un moyen de continuer à vivre ses aventures sans abandonner ses amis.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 13,
    "title": "Je veux être pirate",
    "summary": "Tom est fasciné par la liberté qu'il associe à la vie des pirates. Avec Huck et ses camarades, il imagine une existence loin de l'école, des punitions et des adultes. Son rêve devient si important qu'il commence à envisager sérieusement de quitter sa vie habituelle pour devenir un véritable aventurier.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 14,
    "title": "Les pirates ne vont pas à l'école",
    "summary": "Tom et ses amis poursuivent leur rêve de vivre comme des pirates et considèrent naturellement que l'école n'a plus sa place dans leur nouvelle vie. Pourtant, l'enthousiasme des premiers jours commence à laisser apparaître les difficultés d'une existence loin de tout. Tom découvre que la liberté qu'il imaginait n'est pas aussi simple qu'il le pensait.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 15,
    "title": "Ah ! L'aventure...",
    "summary": "L'aventure sur le fleuve continue et les garçons profitent de leur nouvelle liberté. Ils jouent aux explorateurs, cherchent de quoi manger et s'inventent une vie entièrement différente de celle de Saint-Petersburg. Mais derrière leurs jeux, la nostalgie de leur famille et de leurs amis commence peu à peu à apparaître.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 16,
    "title": "Les pirates broient du noir",
    "summary": "L'excitation du départ laisse progressivement place au découragement. Tom, Huck et leurs compagnons comprennent que leur vie de pirates est beaucoup moins amusante lorsqu'ils doivent réellement se débrouiller seuls. Le manque de confort et l'éloignement de leurs proches rendent leur aventure beaucoup plus difficile.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 17,
    "title": "Il y a des jours comme ça...",
    "summary": "Alors que les garçons traversent une période difficile, plusieurs événements viennent compliquer encore leur situation. Tom tente de garder son enthousiasme et de convaincre ses amis que tout finira par s'arranger. Mais les problèmes s'accumulent et obligent les jeunes aventuriers à réfléchir sérieusement à leurs choix.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 18,
    "title": "La réconciliation",
    "summary": "Après les tensions et les difficultés rencontrées pendant leur aventure, les garçons comprennent qu'ils ne peuvent pas rester éternellement séparés de leur vie d'avant. Les disputes commencent à s'apaiser et Tom retrouve progressivement ses proches. Cette réconciliation marque la fin d'une importante étape de leurs aventures.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 19,
    "title": "Le concours de grenouilles",
    "summary": "Tom découvre un concours consacré aux grenouilles et décide naturellement d'y participer. Il met toute son énergie à préparer son champion et veut absolument prouver que sa grenouille est la meilleure. La compétition donne lieu à de nombreuses situations comiques et à une nouvelle rivalité entre les enfants.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 20,
    "title": "Le secret de Mr Dobbins",
    "summary": "Tom commence à s'intéresser aux habitudes étranges de son professeur, Mr Dobbins. Il remarque certains détails qui éveillent sa curiosité et cherche à découvrir ce que l'adulte cache. Sa curiosité transforme rapidement une journée d'école ordinaire en une nouvelle enquête menée avec Huck et ses camarades.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 21,
    "title": "Le début des vacances",
    "summary": "Les vacances commencent enfin et Tom voit immédiatement toutes les possibilités qui s'offrent à lui. Plus besoin de passer ses journées à l'école : il peut retrouver Huck, explorer les environs et multiplier les aventures. Les premiers jours de liberté annoncent une nouvelle période pleine de découvertes.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 22,
    "title": "Le charlatan",
    "summary": "Un personnage prétendant posséder des remèdes et des connaissances extraordinaires arrive dans la région. Ses promesses attirent rapidement l'attention des habitants. Tom et Huck observent la situation avec curiosité et commencent à se demander si cet homme est réellement ce qu'il prétend être.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 23,
    "title": "Partie de pêche",
    "summary": "Tom et Huck profitent d'une journée au bord du Mississippi pour aller pêcher. Ce qui devait être une sortie tranquille devient rapidement une nouvelle aventure lorsque les garçons commencent à se disputer, à faire des expériences et à chercher les meilleurs endroits pour attraper du poisson.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 24,
    "title": "Huck porte la cravate",
    "summary": "Huck, qui a toujours vécu librement loin des conventions de la ville, se retrouve confronté à des règles sociales qu'il ne comprend pas vraiment. Tom essaie de l'aider à s'adapter et notamment à adopter une apparence plus respectable. Mais transformer Huck en garçon bien habillé s'avère beaucoup plus compliqué que prévu.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 25,
    "title": "Un garçon obstiné",
    "summary": "Tom refuse encore une fois de se plier facilement aux décisions des adultes. Son obstination le pousse à poursuivre une idée malgré les avertissements qu'il reçoit. Cette attitude crée de nouvelles difficultés, mais elle montre aussi le caractère indépendant et déterminé du jeune garçon.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 26,
    "title": "Lisette",
    "summary": "Tom fait la connaissance de Lisette, une jeune fille dont l'arrivée apporte une nouvelle dynamique dans son entourage. Curieux et toujours prêt à aider lorsqu'une aventure se présente, Tom cherche à comprendre son histoire. Sa rencontre avec Lisette va progressivement entraîner les garçons dans une nouvelle série d'événements.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 27,
    "title": "Le lever du rideau",
    "summary": "Une représentation se prépare et Tom se retrouve impliqué dans les préparatifs du spectacle. L'idée de monter sur scène enthousiasme les enfants, mais les répétitions ne se déroulent pas sans problèmes. Entre maladresses, rivalités et imprévus, Tom doit faire preuve de débrouillardise pour que le spectacle puisse avoir lieu.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 28,
    "title": "Aider Lisette",
    "summary": "Tom et ses amis décident d'aider Lisette alors qu'elle rencontre des difficultés. Leur volonté de lui venir en aide les conduit à prendre des risques et à intervenir dans une situation qui dépasse rapidement le simple jeu d'enfants. Tom doit utiliser son courage et son imagination pour trouver une solution.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 29,
    "title": "Au revoir Lisette",
    "summary": "L'aventure autour de Lisette touche à sa fin et les amis doivent accepter l'idée de se séparer. Tom, qui s'attache facilement aux personnes qu'il rencontre, vit ce départ avec émotion. Cette expérience lui rappelle que certaines aventures sont importantes précisément parce qu'elles ne durent pas éternellement.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 30,
    "title": "Le père de Huck",
    "summary": "Le passé de Huck revient brutalement dans sa vie lorsque son père réapparaît. La présence de cet homme inquiète Tom et ses amis, car Huck n'a pas connu une enfance stable auprès de lui. Tom cherche à comprendre la situation et à protéger son ami face à cette nouvelle menace.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 31,
    "title": "Le chandelier",
    "summary": "Un mystérieux chandelier devient au centre d'une situation qui intrigue Tom et Huck. Les garçons cherchent à comprendre son importance et pourquoi certains adultes semblent particulièrement intéressés par cet objet. Leur curiosité les entraîne une nouvelle fois dans une affaire qui dépasse leurs simples jeux d'enfants.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 32,
    "title": "De l'or ! De l'or !",
    "summary": "La possibilité de trouver de l'or ravive immédiatement les rêves de richesse de Tom et Huck. Les deux amis se lancent dans une recherche pleine d'excitation, imaginant déjà tout ce qu'ils pourraient faire avec une fortune. Mais chercher réellement de l'or s'avère bien plus difficile que de raconter des histoires de trésors.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 33,
    "title": "La fuite vers la liberté",
    "summary": "Huck se retrouve confronté à une situation où sa liberté est directement menacée. Tom refuse de rester spectateur et cherche avec lui une manière de s'échapper. Leur fuite les entraîne dans une aventure dangereuse où leur amitié et leur courage sont mis à rude épreuve.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 34,
    "title": "L'homme qui venait du froid",
    "summary": "L'arrivée d'un mystérieux homme venu d'une région froide attire l'attention de Tom et des habitants de Saint-Petersburg. Son comportement et son histoire éveillent la curiosité du jeune garçon. Tom cherche à découvrir ce que cache cet étrange visiteur et se retrouve impliqué dans une situation inattendue.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 35,
    "title": "Tom veut voler dans le ciel",
    "summary": "Tom est fasciné par l'idée de pouvoir voler comme un oiseau. Avec son imagination habituelle, il commence à réfléchir à différentes solutions pour réaliser ce rêve. Son projet paraît impossible aux adultes, mais Tom est convaincu qu'avec suffisamment d'ingéniosité, il peut trouver un moyen de s'envoler.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 36,
    "title": "Volera, volera pas ?",
    "summary": "Tom poursuit son projet de voler malgré les difficultés et les inquiétudes de son entourage. Les essais deviennent de plus en plus audacieux et ses amis suivent l'expérience avec un mélange d'admiration et de peur. Tom doit finalement comprendre que certaines idées peuvent être beaucoup plus dangereuses qu'elles n'en ont l'air.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 37,
    "title": "Au revoir Arthur !",
    "summary": "Tom doit faire face au départ d'Arthur, un garçon avec lequel il a partagé plusieurs moments importants. Les enfants comprennent que les amitiés peuvent être bouleversées par les changements de la vie. Malgré leur tristesse, Tom et ses amis gardent les souvenirs de leurs aventures communes.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 38,
    "title": "Le drame",
    "summary": "Une situation grave vient soudainement interrompre les jeux habituels de Tom et de ses amis. Les conséquences d'un événement dramatique touchent profondément les habitants de Saint-Petersburg. Tom découvre alors que ses aventures peuvent parfois avoir des conséquences réelles et qu'il faut savoir prendre ses responsabilités.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 39,
    "title": "Une question de confiance",
    "summary": "Tom se retrouve dans une situation où il doit décider à qui il peut réellement faire confiance. Les secrets, les soupçons et les malentendus compliquent les relations entre les personnages. Pour résoudre le problème, Tom doit mettre de côté ses réactions impulsives et réfléchir aux conséquences de ses décisions.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 40,
    "title": "Le procès",
    "summary": "Une affaire grave arrive devant la justice et Tom découvre une réalité bien différente de ses jeux habituels. Les événements liés à Joe l'Indien et à Muff Potter prennent une importance considérable. Tom possède une information essentielle, mais parler signifie également prendre un risque personnel important.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 41,
    "title": "L'indésirable",
    "summary": "Alors que les événements autour de Joe l'Indien continuent de peser sur la ville, Tom et Huck restent préoccupés par ce qu'ils savent. Joe devient une présence inquiétante dans leur histoire et les garçons comprennent qu'ils doivent rester prudents. Leur recherche de vérité les rapproche progressivement d'une situation dangereuse.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 42,
    "title": "Un joyeux voyage",
    "summary": "Tom et ses amis partent pour un nouveau voyage qui leur permet de s'éloigner momentanément des problèmes de Saint-Petersburg. L'ambiance redevient plus légère et les enfants profitent du déplacement pour vivre de nouvelles aventures. Mais même pendant ce voyage, Tom ne peut pas rester longtemps sans provoquer quelque chose.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 43,
    "title": "Un cheval blanc",
    "summary": "Un magnifique cheval blanc attire l'attention de Tom et devient rapidement l'objet de son admiration. L'animal est au centre d'une nouvelle aventure dans laquelle Tom découvre que posséder ou approcher un cheval demande davantage de responsabilité qu'il ne l'imaginait.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 44,
    "title": "La capture",
    "summary": "Les recherches et les événements précédents conduisent finalement à une nouvelle confrontation. La menace représentée par Joe l'Indien devient de plus en plus concrète et les adultes cherchent à mettre fin à cette histoire. Tom et Huck restent malgré tout impliqués dans les événements qui mènent à la capture.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 45,
    "title": "Liberté",
    "summary": "Après les événements difficiles qui ont marqué les derniers épisodes, la question de la liberté prend une importance particulière pour Tom et Huck. Les deux amis veulent pouvoir continuer à vivre selon leurs propres règles tout en comprenant que la véritable liberté implique aussi des responsabilités et des choix difficiles.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 46,
    "title": "La maison hantée",
    "summary": "Tom et Huck découvrent une vieille maison que les habitants considèrent comme hantée. L'idée d'un lieu abandonné rempli de mystères suffit à attirer les deux garçons. Ils décident d'explorer l'endroit malgré la peur et découvrent rapidement que la maison pourrait cacher bien plus qu'ils ne l'imaginaient.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 47,
    "title": "La grotte des soupirs",
    "summary": "Tom et Huck retournent vers la mystérieuse grotte associée au trésor de Joe l'Indien. L'endroit est vaste, sombre et particulièrement dangereux, et les deux amis doivent avancer avec prudence pour retrouver ce qu'ils cherchent. Leur exploration les met face à un risque réel dont ils ne mesurent pas immédiatement toutes les conséquences.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 48,
    "title": "La fin de Joe l'Indien",
    "summary": "La recherche du trésor mène Tom et Huck au cœur de la grotte des soupirs. Alors qu'ils poursuivent leurs recherches, le destin de Joe l'Indien arrive à son terme. Les événements mettent enfin fin à une menace qui poursuivait les garçons depuis longtemps et ouvrent la voie à la conclusion de leur grande aventure.",
    "date": "2026-09-16",
    "status": "watched"
  },
  {
    "number": 49,
    "title": "Tout est bien",
    "summary": "Tom et Huck réussissent finalement à retrouver le trésor de Joe l'Indien et reviennent avec une véritable fortune. Tom considère naturellement qu'il doit partager son trésor avec son meilleur ami. Mais Huck étant orphelin, la question de savoir qui peut gérer légalement son argent devient un nouveau problème. La solution passe par une famille prête à accueillir Huck, permettant aux deux amis d'envisager enfin un avenir plus stable.",
    "date": "2026-09-16",
    "status": "watched"
  }
],

  "videos": [
    { "title": "Episode 1", "url": "https://drive.google.com/file/d/1Wr0o7z-L-rAv68QnKwcCAn3EcePt5vnT/view?usp=sharing", "type": "local" },
    { "title": "Episode 2", "url": "https://drive.google.com/file/d/1OJC1scLBNfge08jbOMRvJMq8DsNyK1BB/view?usp=sharing", "type": "local" },
    { "title": "Episode 3", "url": "https://drive.google.com/file/d/1ieUh39yASC2m6XvWpViBGPlfQKNaWQpS/view?usp=sharing", "type": "local" },
    { "title": "Episode 4", "url": "https://drive.google.com/file/d/1Tj5_r2S2tgtUPVxMWHegAjK3OqgZ5Fhs/view?usp=sharing", "type": "local" },
    { "title": "Episode 5", "url": "https://drive.google.com/file/d/1tnC8ymR8YlEMCHoUVJ5PkQhfgshVVHVt/view?usp=drive_link", "type": "local" },
    { "title": "Episode 6", "url": "https://drive.google.com/file/d/1DsMps9jsJ6v3zIL3oA7XzoyjuLYFTy60/view?usp=drive_link", "type": "local" },
    { "title": "Episode 7", "url": "https://drive.google.com/file/d/1QvPYWnkSCbRALWXezWl4uvzOOCc8Z9-Z/view?usp=drive_link", "type": "local" },
    { "title": "Episode 8", "url": "https://drive.google.com/file/d/1chPJN67A8hhHxtcfaV5gL_OOCBoQXbAL/view?usp=drive_link", "type": "local" },
    { "title": "Episode 9", "url": "https://drive.google.com/file/d/198WKlbroKpNJookI3CNBeVy1-shlJrds/view?usp=drive_link", "type": "local" },
    { "title": "Episode 10", "url": "https://drive.google.com/file/d/1eyBNEwdbIZ_n5ldAV25k069yIBomnNGd/view?usp=drive_link", "type": "local" },
    { "title": "Episode 11", "url": "https://drive.google.com/file/d/1NVSo2atr7it5PfAjOcvpfiMlk1jNSWXp/view?usp=drive_link", "type": "local" },
    { "title": "Episode 12", "url": "https://drive.google.com/file/d/1LZh7c8i6cYDuhLVlC8x5NF1dzRqtXdEI/view?usp=drive_link", "type": "local" },
    { "title": "Episode 13", "url": "https://drive.google.com/file/d/1BLbEAhMok7HmBZO-6XwMNXCtGEkC7g9C/view?usp=drive_link", "type": "local" },
    { "title": "Episode 14", "url": "https://drive.google.com/file/d/1JXhE382uBhC6PRL61Lnlm9apKDQ4zwpx/view?usp=drive_link", "type": "local" },
    { "title": "Episode 15", "url": "https://drive.google.com/file/d/1Ipu3TsFPti2nno5FxdWm6BwYroVFEoUF/view?usp=drive_link", "type": "local" },
    { "title": "Episode 16", "url": "https://drive.google.com/file/d/1HEqF_95CVbbmC1GA-ItpjL3188WbsR7D/view?usp=drive_link", "type": "local" },
    { "title": "Episode 17", "url": "https://drive.google.com/file/d/14378CF1mOYHJbcN3o05P-fYJAds6bCmc/view?usp=drive_link", "type": "local" },
    { "title": "Episode 18", "url": "https://drive.google.com/file/d/1DHinBlEaTpq5EKkGrPN8spYYdpycRTUc/view?usp=drive_link", "type": "local" },
    { "title": "Episode 19", "url": "https://drive.google.com/file/d/1p53hf0cg0Poc1Ym4rmvsWwJo63n-Kw7n/view?usp=drive_link", "type": "local" },
    { "title": "Episode 20", "url": "https://drive.google.com/file/d/1JUksx3FkgLsC9Z-DGmZafN9vDcVml3Io/view?usp=drive_link", "type": "local" },
    { "title": "Episode 21", "url": "https://drive.google.com/file/d/1uq1wB23eKyuT2VFilG-9qgFy49Wy_Emz/view?usp=drive_link", "type": "local" },
    { "title": "Episode 22", "url": "https://drive.google.com/file/d/1HXOOCa66JJY8SGwLFcnjBQNd5KfNXTZL/view?usp=drive_link", "type": "local" },
    { "title": "Episode 23", "url": "https://drive.google.com/file/d/1Iuku_sJSQ9wKbPaKrS3Yqlp1AmQPbQ7W/view?usp=drive_link", "type": "local" },
    { "title": "Episode 24", "url": "https://drive.google.com/file/d/11itaZgEcCWI4eHdZWHGpV6aO-a3BK-5o/view?usp=drive_link", "type": "local" },
    { "title": "Episode 25", "url": "https://drive.google.com/file/d/1fxBRlO2YXXUsAdPoFHvnqReDYb2rHXr-/view?usp=drive_link", "type": "local" },
    { "title": "Episode 26", "url": "https://drive.google.com/file/d/1LffJanXq-QBqE78d-UvUWXLMMqE2jaKv/view?usp=drive_link", "type": "local" },
    { "title": "Episode 27", "url": "https://drive.google.com/file/d/1Fu5b0gg2oe0nf074XPMr834MLElRi3AA/view?usp=drive_link", "type": "local" },
    { "title": "Episode 28", "url": "https://drive.google.com/file/d/11D2KPjXxoip8fdXfj8riNJNJLBbtJb47/view?usp=drive_link", "type": "local" },
    { "title": "Episode 29", "url": "https://drive.google.com/file/d/1SZ3SH4KXcWsGv93SgDCg1Ny4G9fHJI_C/view?usp=drive_link", "type": "local" },
    { "title": "Episode 30", "url": "https://drive.google.com/file/d/1mWFs0mgm6Za42Ym_H9jKcTLLATbeL8cw/view?usp=drive_link", "type": "local" },
    { "title": "Episode 31", "url": "https://drive.google.com/file/d/1nKfxUIsI0W_h_rq-1aN-dqbXxh-f4_LS/view?usp=drive_link", "type": "local" },
    { "title": "Episode 32", "url": "https://drive.google.com/file/d/1GawRKpuGAO4t20Rxs927pzA8_ONncdo7/view?usp=drive_link", "type": "local" },
    { "title": "Episode 33", "url": "https://drive.google.com/file/d/10f5bmX3ga-fty-5zgp0Mfx93nXWxTjFP/view?usp=drive_link", "type": "local" },
    { "title": "Episode 34", "url": "https://drive.google.com/file/d/14piLDgEir50j7if1hbG6eN2V5VQJ2tc0/view?usp=drive_link", "type": "local" },
    { "title": "Episode 35", "url": "https://drive.google.com/file/d/1_31xT4YwYF6xramFtpGkf9bFNR5W-DN0/view?usp=drive_link", "type": "local" },
    { "title": "Episode 36", "url": "https://drive.google.com/file/d/1vOBao63Go9zSEXf4rdG6IbkUKnGNMozZ/view?usp=drive_link", "type": "local" },
    { "title": "Episode 37", "url": "https://drive.google.com/file/d/18bD_r1qsbr8zLmhf4ZMmjUDDoQfG_yAj/view?usp=drive_link", "type": "local" },
    { "title": "Episode 38", "url": "https://drive.google.com/file/d/1cbEM0eZISu5JoyFjgbdP7Qq9t9mf959q/view?usp=drive_link", "type": "local" },
    { "title": "Episode 39", "url": "https://drive.google.com/file/d/1UFsXTLD1EUL4AEAGtakQrgydV5YQ4ja6/view?usp=drive_link", "type": "local" },
    { "title": "Episode 40", "url": "https://drive.google.com/file/d/1SnGd-22OXlV2IczoiE5b8Pcm0VdFppjX/view?usp=drive_link", "type": "local" },
    { "title": "Episode 41", "url": "https://drive.google.com/file/d/16dDkzhEw_tpM-_AHlqhQiofHG5aET1b8/view?usp=drive_link", "type": "local" },
    { "title": "Episode 42", "url": "https://drive.google.com/file/d/19-_0of2XzuDa6_X_zVDGlY9ljZj_7Ykc/view?usp=drive_link", "type": "local" },
    { "title": "Episode 43", "url": "https://drive.google.com/file/d/1IUSTnDsMDM2UyZTJ8wIdK7y-9frgZXNc/view?usp=drive_link", "type": "local" },
    { "title": "Episode 44", "url": "https://drive.google.com/file/d/1IVlw_tiAthPaAlI6LCPMSQeiBbHYawaS/view?usp=drive_link", "type": "local" },
    { "title": "Episode 45", "url": "https://drive.google.com/file/d/1A7nVFTBRdIi0v0Y4DaCRzTXKzaXEXfwP/view?usp=drive_link", "type": "local" },
    { "title": "Episode 46", "url": "https://drive.google.com/file/d/1aMiE9lJhcp-JhEsWF3JGRHPh9Of4SQVU/view?usp=drive_link", "type": "local" },
    { "title": "Episode 47", "url": "https://drive.google.com/file/d/1kIuIEl4Ohu_cZAm57Ml3N4ZYuMO3lm8n/view?usp=drive_link", "type": "local" },
    { "title": "Episode 48", "url": "https://drive.google.com/file/d/1bNwrxMjBby3JyKAVjAoCWU20jrgohBxZ/view?usp=drive_link", "type": "local" },
    { "title": "Episode 49", "url": "https://drive.google.com/file/d/10BnPDauWytt9n0SMlMeaN1gh5cmXtcQk/view?usp=drive_link", "type": "local" }
  ]
}
];

const ENTRIES_STORAGE_KEY = 'movie-night-entries';
const PROGRESS_STORAGE_KEY = 'movie-night-progress';

const getEntriesFromStorage = (): MovieEntry[] | null => {
  try {
    const data = localStorage.getItem(ENTRIES_STORAGE_KEY);
    if (!data) return null;
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed as MovieEntry[] : null;
  } catch (error) {
    console.error('Failed to parse stored entries:', error);
    return null;
  }
};

const saveEntriesToStorage = (entries: MovieEntry[]): void => {
  try {
    localStorage.setItem(ENTRIES_STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Failed to save entries locally:', error);
  }
};

export const getEntries = (): MovieEntry[] => {
  const entries = [...MOVIES_DATA];
  const progress = getProgressFromStorage();
  
  return entries.map(entry => {
    // For TV shows, derive status and date from episodes if available
    let derivedStatus = entry.status;
    let derivedDate = entry.date;

    if (entry.type === 'tv' && entry.episodes && entry.episodes.length > 0) {
      const upcoming = entry.episodes.find(ep => ep.status === 'upcoming');
      if (upcoming) {
        derivedStatus = 'upcoming';
        derivedDate = upcoming.date;
      } else {
        derivedStatus = 'watched';
        // For watched, use the date of the last episode
        derivedDate = entry.episodes[entry.episodes.length - 1].date;
      }
    }

    return {
      ...entry,
      status: derivedStatus,
      date: derivedDate,
      watchProgress: progress[entry.id] || 0,
    };
  });
};

export const getEntriesAsync = async (): Promise<MovieEntry[]> => {
  const progress = getProgressFromStorage();

  return [...MOVIES_DATA].map(entry => {
    // For TV shows, derive status and date from episodes if available
    let derivedStatus = entry.status;
    let derivedDate = entry.date;

    if (entry.type === 'tv' && entry.episodes && entry.episodes.length > 0) {
      const upcoming = entry.episodes.find(ep => ep.status === 'upcoming');
      if (upcoming) {
        derivedStatus = 'upcoming';
        derivedDate = upcoming.date;
      } else {
        derivedStatus = 'watched';
        derivedDate = entry.episodes[entry.episodes.length - 1].date;
      }
    }

    return {
      ...entry,
      status: derivedStatus,
      date: derivedDate,
      watchProgress: progress[entry.id] || 0,
    };
  });
};

export const saveEntries = async (entries: MovieEntry[]): Promise<void> => {
  saveEntriesToStorage(entries);
};

export const deleteEntry = async (entryId: string): Promise<void> => {
  try {
    // In manual mode, we don't delete from MOVIES_DATA as it's hardcoded.
    // We just clean up the local storage for that entry.
    
    try {
      const progress = getProgressFromStorage();
      delete progress[entryId];
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));

      // Delete comment threads for this entry
      localStorage.removeItem(`${COMMENT_STORAGE_KEY}-${entryId}`);
      localStorage.removeItem(`${COMMENT_STORAGE_KEY}-${entryId}-shared`);
      localStorage.removeItem(`${COMMENT_STORAGE_KEY}-${entryId}-jojo`);
      localStorage.removeItem(`${COMMENT_STORAGE_KEY}-${entryId}-dodo`);

      // Delete episode-related data for TV entries
      const episodeProgress = JSON.parse(localStorage.getItem(EPISODE_PROGRESS_KEY) || '{}');
      delete episodeProgress[entryId];
      localStorage.setItem(EPISODE_PROGRESS_KEY, JSON.stringify(episodeProgress));
    } catch (storageError) {
      console.warn('Failed to clean up stored data:', storageError);
    }
  } catch (error) {
    console.error('Failed to delete entry:', error);
    throw error;
  }
};

export const saveRating = (entryId: string, person: 'jojo' | 'dodo', rating: number): void => {
  firebaseUpdateRating(entryId, person, rating);
};

export const saveWatchProgress = (entryId: string, seconds: number): void => {
  try {
    const progress = getProgressFromStorage();
    progress[entryId] = seconds;
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save watch progress:', error);
  }
};

export const getWatchProgress = (entryId: string): number => {
  try {
    const progress = getProgressFromStorage();
    return progress[entryId] || 0;
  } catch (error) {
    console.error('Failed to get watch progress:', error);
    return 0;
  }
};

const getProgressFromStorage = (): Record<string, number> => {
  try {
    const data = localStorage.getItem(PROGRESS_STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Failed to parse watch progress:', error);
    return {};
  }
};

const COMMENT_STORAGE_KEY = 'movie-night-comments';

export const saveComment = (entryId: string, comment: string, user?: 'jojo' | 'dodo' | null): void => {
  try {
    const comments = getCommentsFromStorage();
    const scope = (user || 'shared') as 'shared' | 'jojo' | 'dodo';
    const trimmedComment = comment.trim();
    if (!trimmedComment) return;
    const key = `${entryId}-${scope}`;
    const thread = comments[key] || [];
    const nextMessage: CommentMessage = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      text: trimmedComment,
      sender: scope,
      createdAt: Date.now(),
    };
    const updatedThread = [...thread, nextMessage];
    comments[key] = updatedThread;
    localStorage.setItem(COMMENT_STORAGE_KEY, JSON.stringify(comments));
  } catch (error) {
    console.error('Failed to save comment:', error);
  }
};

export const getComment = (entryId: string, user?: 'jojo' | 'dodo' | null): string => {
  try {
    const thread = getCommentThread(entryId, user);
    return thread[thread.length - 1]?.text || '';
  } catch (error) {
    console.error('Failed to get comment:', error);
    return '';
  }
};

export const getCommentThread = (entryId: string, user?: 'jojo' | 'dodo' | null): CommentMessage[] => {
  try {
    const comments = getCommentsFromStorage();

    const sharedThread = comments[`${entryId}-shared`] || [];
    const jojoThread = comments[`${entryId}-jojo`] || [];
    const dodoThread = comments[`${entryId}-dodo`] || [];

    const combinedThread = [...sharedThread, ...jojoThread, ...dodoThread]
      .sort((a, b) => a.createdAt - b.createdAt);

    return combinedThread;
  } catch (error) {
    console.error('Failed to get comment thread:', error);
    return [];
  }
};

const getCommentsFromStorage = (): Record<string, CommentMessage[]> => {
  try {
    const data = localStorage.getItem(COMMENT_STORAGE_KEY);
    const raw = data ? JSON.parse(data) as Record<string, CommentMessage[] | string> : {};
    const normalized: Record<string, CommentMessage[]> = {};

    Object.entries(raw).forEach(([key, value]) => {
      const senderFromKey = key.endsWith('-jojo') ? 'jojo' : key.endsWith('-dodo') ? 'dodo' : 'shared';
      normalized[key] = normalizeCommentThread(value, senderFromKey);
    });

    return normalized;
  } catch (error) {
    console.error('Failed to parse comments:', error);
    return {};
  }
};

const normalizeCommentThread = (value: CommentMessage[] | string, sender: 'shared' | 'jojo' | 'dodo'): CommentMessage[] => {
  if (Array.isArray(value)) {
    return value
      .filter(message => message && typeof message.text === 'string')
      .map(message => ({
        id: message.id || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        text: message.text,
        sender: message.sender || sender,
        createdAt: typeof message.createdAt === 'number' ? message.createdAt : Date.now(),
      }));
  }

  if (typeof value === 'string' && value.trim()) {
    return [{
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      text: value,
      sender,
      createdAt: Date.now(),
    }];
  }

  return [];
};

// Episode progress tracking for TV shows
const EPISODE_PROGRESS_KEY = 'movie-night-episode-progress';

export const saveEpisodeProgress = (entryId: string, user: 'jojo' | 'dodo', episodeIndex: number): void => {
  try {
    const progress = getEpisodeProgressFromStorage();
    const key = `${entryId}-${user}`;
    progress[key] = episodeIndex;
    localStorage.setItem(EPISODE_PROGRESS_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save episode progress:', error);
  }
};

export const getLastWatchedEpisode = (entryId: string, user: 'jojo' | 'dodo'): number => {
  try {
    const progress = getEpisodeProgressFromStorage();
    const key = `${entryId}-${user}`;
    return progress[key] ?? 0;
  } catch (error) {
    console.error('Failed to get episode progress:', error);
    return 0;
  }
};

export const getResumeEpisodeIndex = (entryId: string, preferredUser?: 'jojo' | 'dodo' | null): number => {
  try {
    const progress = getEpisodeProgressFromStorage();

    if (preferredUser) {
      const preferredKey = `${entryId}-${preferredUser}`;
      return progress[preferredKey] ?? 0;
    }

    const jojoKey = `${entryId}-jojo`;
    const dodoKey = `${entryId}-dodo`;
    return Math.max(progress[jojoKey] ?? 0, progress[dodoKey] ?? 0);
  } catch (error) {
    console.error('Failed to get resume episode index:', error);
    return 0;
  }
};

const getEpisodeProgressFromStorage = (): Record<string, number> => {
  try {
    const data = localStorage.getItem(EPISODE_PROGRESS_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Failed to parse episode progress:', error);
    return {};
  }
};