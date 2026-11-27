/* gray zone: the sample nebulae.
   plain data, no code. index.html reads window.GRAY_ZONE_SAMPLES when it starts; if this file is missing, there are simply no samples.

   cast: the five recurring sample voices. they are marked as samples wherever they appear.
     mara  asks questions and sits in the middle
     theo  argues the other side
     juno  brings personal stories
     kofi  explains how things work
     ines  short and dry, changes their mind
   rooms: id, name, guiding question, the two ends of its spectrum (18 characters at most),
     where it sits (x, y on wide screens; px, py on tall ones), and the words that gather thoughts toward it.
   thoughts: id, room (c), voice (by), text, stance (-1 the first end .. 1 the second), settled (0..1),
     re (the id of the thought it replies to, listed earlier), ago (days before the visitor's first visit; a reply is always newer than its parent).
   proposals: renames someone has proposed for a room, with how the vote leans (0..1). */
window.GRAY_ZONE_SAMPLES = {
  cast: [
    { id: 'mara', name: 'mara' },
    { id: 'theo', name: 'theo' },
    { id: 'juno', name: 'juno' },
    { id: 'kofi', name: 'kofi' },
    { id: 'ines', name: 'ines' },
  ],

  rooms: [
    { id: 'sx_ending', name: 'who owns the ending', q: "when fans hate how a story ends, who's right?", poles: ["the creator's call", "the fans' too"],
      x: 0, y: -560, px: -280, py: -780,
      terms: 'ending endings ended finale final season seasons series show shows episode episodes fans fan fandom fandoms writer writers creator creators showrunner story stories plot character characters canon fanfic fanfiction petition remake reboot sequel spoiler spoilers book books film films movie movies tv television cliffhanger arc twist backlash binge' },
    { id: 'sx_artist', name: 'art and the artist', q: 'can you still love the work after what its maker did?', poles: ["can't unsee it", 'the work stands'],
      x: 760, y: -170, px: 280, py: -390,
      terms: 'artist artists art artwork album albums song songs music musician musicians band bands singer rapper actor actors director directors cancel cancelled canceled cancelling scandal scandals harm separate separating legacy morals moral boycott royalties record records painter writer author authors novel comedian comedians reputation accused allegations' },
    { id: 'sx_machine', name: 'made by a machine', q: 'does it matter whether a person made it?', poles: ['it matters', 'only the result'],
      x: 470, y: 440, px: -280, py: 0,
      terms: 'ai machine machines model models generated generative generate prompt prompts chatgpt image images picture pictures illustration illustrator poem poems poetry human humans handmade craft creative creativity tool tools training trained data copyright original drawing painting voice voices robot robots automation automated synthetic slop' },
    { id: 'sx_feed', name: 'the feed knows me', q: 'is your taste still yours if the feed picked it?', poles: ['the feed chose', 'still mine'],
      x: -470, y: 440, px: 280, py: 390,
      terms: 'algorithm algorithms feed feeds recommend recommendation recommended recommendations taste tastes playlist playlists spotify tiktok youtube netflix scroll scrolling app apps genre genres discover discovery trend trends trending viral wrapped shuffle shown pick picked choose choice fyp foryou aesthetic' },
    { id: 'sx_watch', name: 'one-sided friends', q: 'can you really know someone you only watch?', poles: ['an illusion', 'real enough'],
      x: -760, y: -170, px: -280, py: 780,
      terms: 'parasocial streamer streamers stream streams streaming twitch youtuber youtubers vlog vlogger vlogs influencer influencers podcast podcasts podcaster host hosts celebrity celebrities famous idol idols fan fans friend friends friendship lonely loneliness chat watch watching subscriber subscribers community online' },
  ],

  thoughts: [
    // who owns the ending
    { id: 'sx_ending_1', c: 'sx_ending', by: 'juno', stance: .2, settled: .4, ago: 38, text: 'i spent eight years with a show and the last episode felt like a stranger wrote it. i know it was never mine. it still felt like losing something.' },
    { id: 'sx_ending_2', c: 'sx_ending', by: 'theo', stance: -.7, settled: .7, ago: 36, re: 'sx_ending_1', text: "juno, that's grief, not ownership. you can be sad about an ending without it owing you a different one." },
    { id: 'sx_ending_3', c: 'sx_ending', by: 'juno', stance: .35, settled: .45, ago: 35, re: 'sx_ending_2', text: 'maybe. but a story that runs for years is half made by the people who keep showing up for it.' },
    { id: 'sx_ending_4', c: 'sx_ending', by: 'kofi', stance: -.2, settled: .6, ago: 30, text: "long-running shows get rewritten around ratings, actors leaving and budgets all the time. by season five, 'the creator's vision' is usually a committee." },
    { id: 'sx_ending_5', c: 'sx_ending', by: 'mara', stance: 0, settled: .3, ago: 24, text: "is there a difference between hating an ending and wanting it changed? i think i've only ever wanted the first." },
    { id: 'sx_ending_6', c: 'sx_ending', by: 'ines', stance: .6, settled: .5, ago: 19, text: 'the fans had rewritten the ending within a week. honestly, that version is the one i remember.' },
    { id: 'sx_ending_7', c: 'sx_ending', by: 'theo', stance: -.5, settled: .55, ago: 18, re: 'sx_ending_6', text: "that's the system working, ines. you got your ending and they kept theirs." },
    { id: 'sx_ending_8', c: 'sx_ending', by: 'ines', stance: .3, settled: .5, ago: 17, re: 'sx_ending_7', text: "fine. that's annoyingly fair." },
    { id: 'sx_ending_9', c: 'sx_ending', by: 'kofi', stance: .15, settled: .5, ago: 9, text: "petitions to remake a finale never work, but they change how the next show gets written. so fans do own something. just later." },
    { id: 'sx_ending_10', c: 'sx_ending', by: 'mara', stance: .05, settled: .35, ago: 6, re: 'sx_ending_9', text: 'so the ending belongs to whoever wrote it, and the next one belongs a little to us?' },

    // art and the artist
    { id: 'sx_artist_1', c: 'sx_artist', by: 'mara', stance: 0, settled: .35, ago: 41, text: "does it change anything if the artist is dead? i notice i'm more forgiving when no one gets paid." },
    { id: 'sx_artist_2', c: 'sx_artist', by: 'kofi', stance: .2, settled: .6, ago: 40, re: 'sx_artist_1', text: "that's my practical line. streaming a living artist pays them. an old record from a thrift store doesn't." },
    { id: 'sx_artist_3', c: 'sx_artist', by: 'juno', stance: -.6, settled: .55, ago: 33, text: "i used to play one album on every road trip. after the news i tried it once and couldn't hear the songs anymore, only the person singing them." },
    { id: 'sx_artist_4', c: 'sx_artist', by: 'theo', stance: .65, settled: .6, ago: 32, re: 'sx_artist_3', text: "the songs didn't change, juno. you did. that's allowed, but it isn't the same as the work getting worse." },
    { id: 'sx_artist_5', c: 'sx_artist', by: 'ines', stance: .4, settled: .4, ago: 26, text: "i say i separate the art from the artist. mostly i just don't look anything up." },
    { id: 'sx_artist_6', c: 'sx_artist', by: 'theo', stance: .8, settled: .7, ago: 20, text: 'if we only kept work made by good people, the museums would fit in a shoebox.' },
    { id: 'sx_artist_7', c: 'sx_artist', by: 'mara', stance: -.1, settled: .3, ago: 19, re: 'sx_artist_6', text: "maybe the question isn't whether to keep it. it's whether i can still love it, and those feel different." },
    { id: 'sx_artist_8', c: 'sx_artist', by: 'juno', stance: -.4, settled: .4, ago: 18, re: 'sx_artist_7', text: "yes. it's allowed to exist. i just can't make it mine again." },
    { id: 'sx_artist_9', c: 'sx_artist', by: 'ines', stance: -.2, settled: .45, ago: 7, text: "i've changed my mind on this twice this year. now i think it depends on whether the harm is inside the work itself." },

    // made by a machine
    { id: 'sx_machine_1', c: 'sx_machine', by: 'theo', stance: .75, settled: .65, ago: 37, text: 'nobody asks which brush a painter used. if the picture moves you, the tool is trivia.' },
    { id: 'sx_machine_2', c: 'sx_machine', by: 'juno', stance: -.6, settled: .5, ago: 36, re: 'sx_machine_1', text: "but i want to know a hand shook a little. my grandmother's quilts aren't perfect, and that's the point." },
    { id: 'sx_machine_3', c: 'sx_machine', by: 'theo', stance: .5, settled: .55, ago: 35, re: 'sx_machine_2', text: "then the quilt matters because of your grandmother, juno, not because a machine couldn't stitch it." },
    { id: 'sx_machine_4', c: 'sx_machine', by: 'kofi', stance: .1, settled: .7, ago: 28, text: "a model learns from millions of made things. so people did make it, in a way. a crowd of people who weren't asked." },
    { id: 'sx_machine_5', c: 'sx_machine', by: 'mara', stance: -.2, settled: .35, ago: 27, re: 'sx_machine_4', text: "if they had been asked, and paid, would the rest of the worry go away? i honestly don't know." },
    { id: 'sx_machine_6', c: 'sx_machine', by: 'ines', stance: -.5, settled: .45, ago: 15, text: 'a machine wrote me a birthday poem last week. it rhymed perfectly and meant nothing.' },
    { id: 'sx_machine_7', c: 'sx_machine', by: 'kofi', stance: .2, settled: .5, ago: 14, re: 'sx_machine_6', text: 'to be fair, ines, so do most birthday cards.' },
    { id: 'sx_machine_8', c: 'sx_machine', by: 'ines', stance: -.3, settled: .45, ago: 13, re: 'sx_machine_7', text: "ugh. okay. but a card has someone's handwriting in it." },
    { id: 'sx_machine_9', c: 'sx_machine', by: 'mara', stance: 0, settled: .3, ago: 4, text: "maybe it matters for some things and not others. i'd want a person behind a song about grief. less so behind a logo." },

    // the feed knows me
    { id: 'sx_feed_1', c: 'sx_feed', by: 'kofi', stance: -.6, settled: .7, ago: 39, text: "the feed doesn't read your mind. it reads what you lingered on, then shows you more of it until that's all you linger on." },
    { id: 'sx_feed_2', c: 'sx_feed', by: 'ines', stance: -.4, settled: .4, ago: 31, text: "my year-in-review said my top genre was 'sad indie for rainy commutes'. i don't commute. it rains twice a month." },
    { id: 'sx_feed_3', c: 'sx_feed', by: 'theo', stance: .7, settled: .6, ago: 29, text: 'taste was always picked for you: by older siblings, the radio, whatever the record shop had in stock. the feed is just faster.' },
    { id: 'sx_feed_4', c: 'sx_feed', by: 'juno', stance: .2, settled: .45, ago: 28, re: 'sx_feed_3', text: "theo's right that my brother picked half my music. but he picked it because he knew me, not because i paused on it." },
    { id: 'sx_feed_5', c: 'sx_feed', by: 'mara', stance: 0, settled: .3, ago: 21, text: "how would you even tell? i can't find the edge between what i like and what i've been shown a lot." },
    { id: 'sx_feed_6', c: 'sx_feed', by: 'kofi', stance: -.3, settled: .55, ago: 20, re: 'sx_feed_5', text: "one test: what do you still love that no app has ever shown you? that part is probably yours." },
    { id: 'sx_feed_7', c: 'sx_feed', by: 'mara', stance: .1, settled: .35, ago: 19, re: 'sx_feed_6', text: 'that list is short. and older than my phone.' },
    { id: 'sx_feed_8', c: 'sx_feed', by: 'ines', stance: .45, settled: .45, ago: 10, text: 'i started looking things up on purpose instead of scrolling. my taste got weirder and i like it more.' },
    { id: 'sx_feed_9', c: 'sx_feed', by: 'juno', stance: .55, settled: .5, ago: 3, text: "a song found me through the feed the week my dad was in hospital. i don't care how it got there. it's mine now." },

    // one-sided friends
    { id: 'sx_watch_1', c: 'sx_watch', by: 'juno', stance: .6, settled: .5, ago: 35, text: "i've listened to the same two podcast hosts every morning for four years. when one of them got married, i actually cried." },
    { id: 'sx_watch_2', c: 'sx_watch', by: 'theo', stance: -.7, settled: .6, ago: 34, re: 'sx_watch_1', text: "juno, they don't know you exist. that's the part that matters." },
    { id: 'sx_watch_3', c: 'sx_watch', by: 'juno', stance: .4, settled: .45, ago: 33, re: 'sx_watch_2', text: "they don't. but the comfort was real, even if the friendship isn't." },
    { id: 'sx_watch_4', c: 'sx_watch', by: 'kofi', stance: -.4, settled: .65, ago: 25, text: "streamers are paid to feel like friends. 'hey chat, missed you' is a job skill, and a good one." },
    { id: 'sx_watch_5', c: 'sx_watch', by: 'ines', stance: .1, settled: .4, ago: 16, text: "i know a streamer's dog's name, birthday and favourite toy. i don't know my neighbour's name." },
    { id: 'sx_watch_6', c: 'sx_watch', by: 'mara', stance: 0, settled: .35, ago: 15, re: 'sx_watch_5', text: 'is that about the streamer, or about the neighbourhood?' },
    { id: 'sx_watch_7', c: 'sx_watch', by: 'ines', stance: .2, settled: .4, ago: 14, re: 'sx_watch_6', text: 'the neighbourhood. probably me.' },
    { id: 'sx_watch_8', c: 'sx_watch', by: 'theo', stance: -.3, settled: .55, ago: 8, text: 'you know the version they edit for you. which, to be fair, is also how most people at work know me.' },
    { id: 'sx_watch_9', c: 'sx_watch', by: 'mara', stance: 0, settled: .3, ago: 2, text: "maybe 'know' is the wrong word. you can be shaped by someone who will never be shaped back." },
  ],

  proposals: [
    { id: 'sx_p_ending', c: 'sx_ending', name: 'after the finale', lean: .58 },
    { id: 'sx_p_watch', c: 'sx_watch', name: 'people we watch', lean: .34 },
  ],
};
