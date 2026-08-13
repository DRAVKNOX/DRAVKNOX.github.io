// Payne-less: Watch — site content
// All the words live here. Change your mind about a sentence? This is the only
// file you need to touch.

const PAYNEWATCH_CONTENT = {

  previewModes: {
    alarm: {
      tab: "Alarm",
      cards: [
        { meta: "Alarm in 13 hours", time: "15:30", label: "It's Feedin' Time · Weekends", control: "toggle" },
        { meta: "Alarm in 1 day", time: "06:30", label: "Bang ya mum · Weekdays", control: "toggle", compact: true }
      ]
    },
    timer: {
      tab: "Timer",
      cards: [
        { time: "06:37:32", label: "Faster than DarkViperAU?", progress: true, control: "Ⅱ" },
        { time: "04:57", label: "Trying to last longer", progress: true, control: "Ⅱ", compact: true }
      ]
    },
    stopwatch: {
      tab: "Stop",
      stopwatch: { time: "00:07.76", primary: "Pause", secondary: "Lap", laps: [["Lap 4", "00:05.29"], ["Lap 3", "00:04.01"], ["Lap 2", "00:02.57"]] }
    },
    world: {
      tab: "World",
      cards: [
        { time: "22:04", label: "Rome", meta: "Europe · GMT +2.0" },
        { time: "17:04", label: "Sao Paulo", meta: "America · GMT -3.0", compact: true },
        { time: "23:04", label: "Nairobi", meta: "Africa · GMT +3.0", compact: true }
      ],
      fab: "+"
    },
    ring: {
      tab: "Alarm",
      ring: { time: "15:30", label: "It's Feedin' Time", note: "Swipe up to dismiss, down to snooze" }
    }
  },

  features: [
    {
      title: "Alarms with personal space issues",
      body: "When an alarm goes off, the screen turns orange, grows eyes, shows the label and note, then waits for you to swipe up or down like a responsible variant."
    },
    {
      title: "Timers you can read from across the room",
      body: "Big countdowns, orange progress rails, restart and pause buttons, and labels that are still readable when the phone is somewhere on the desk."
    },
    {
      title: "Stopwatch, not spreadsheet",
      body: "The current time gets the throne. Laps sit underneath in quiet rows, because nobody needs a council meeting every time they press Lap."
    },
    {
      title: "World clocks, neatly contained",
      body: "Cities, regions, GMT offsets and local times stay in tidy cards. No map, no drama, no sacred mess of tiny text."
    },
    {
      title: "Settings that do not require a handbook",
      body: "24-hour format, gradual volume, snooze length, widget notes, colors, sounds and power-button behavior are right where you expect them."
    },
    {
      title: "A widget for the next problem",
      body: "Leave yourself a note and see the next alarm, next timer or current stopwatch without opening the app. Transparent background included, if your home screen deserves it."
    },
    {
      title: "Customize it, don't babysit it",
      body: "Change background, accent and font colors. Enough freedom to make it yours, not enough toggles to split the timeline."
    },
    {
      title: "Custom ROM friendly",
      body: "Base Android components, AppCompat, and no Google-only nonsense. AOSP forks and de-Googled phones are not treated like branching mistakes."
    }
  ],

  stats: [
    { value: "3", unit: "MB", label: "Post install" },
    { value: "25–30", unit: "MB", label: "Avg. RAM" },
    { value: "~45", unit: "MB", label: "Peak RAM" },
    { value: "8.0+", unit: "Android", label: "Min Android" }
  ],

  requirements: {
    min: [
      ["Android version", "8.0 Oreo (API 26+)"],
      ["Google services", "Not needed"],
      ["Internet connection", "Nope"],
      ["Custom ROMs", "AOSP forks, LineageOS, de-Googled devices"]
    ],
    max: [
      ["Android version", "16, Baklava (API 36+)"]
    ]
  },

  forYou: [
    "You want a clock that opens fast and keeps the important numbers huge.",
    "You do not enjoy clocks that need the internet to remember what time is.",
    "You run a custom ROM, a de-Googled phone, or something held together by stubbornness.",
    "You like black backgrounds, orange buttons and cards with enough radius to survive pruning.",
    "You want useful customization, not a settings multiverse."
  ],

  notForYou: [
    "You want cloud sync, accounts, assistants, and other things this clock intentionally avoids.",
    "You want a perfect Google Clock clone with a different icon.",
    "You need every locale, automation hook and temporal loophole on day one.",
    "You expect voice commands or AI time management to be the main event."
  ],

  screenshots: [
    { file: "assets/watcher/Alarm.png", label: "Alarm list with countdown cards" },
    { file: "assets/watcher/Timer.png", label: "Running timers with orange rails" },
    { file: "assets/watcher/TimerSet.png", label: "Timer setup sheet" },
    { file: "assets/watcher/Stopwatch.png", label: "Stopwatch and lap history" },
    { file: "assets/watcher/WorldClock.png", label: "World clock city cards" },
    { file: "assets/watcher/Settings.png", label: "Settings with direct controls" },
    { file: "assets/watcher/AlarmSet.png", label: "Alarm editor" },
    { file: "assets/watcher/AlarmRing.png", label: "Full-screen googly alarm" }
  ],

  downloads: [
    {
      name: "Direct APK",
      desc: "Skip the page, grab the file. Latest build, straight off the release.",
      url: "https://github.com/DRAVKNOX-Studios/Payne-less-Watch/releases/latest/download/Payne-less-Watch.apk",
      icon: "android",
      primary: true
    },
    {
      name: "GitHub Releases",
      desc: "Grab the latest APK. Changelogs included, excuses not included.",
      url: "https://github.com/DRAVKNOX-Studios/Payne-less-Watch/releases",
      icon: "github",
      primary: false
    },
    {
      name: "Build from source",
      desc: "Clone it, open Android Studio, hit Run. Try not to anger Gradle.",
      url: "https://github.com/DRAVKNOX-Studios/Payne-less-Watch",
      icon: "code",
      primary: false
    }
  ],

  codeLinks: [
    {
      name: "Source on GitHub",
      desc: "Browse the Kotlin source, custom views and alarm scheduling bits.",
      url: "https://github.com/DRAVKNOX-Studios/Payne-less-Watch"
    },
    {
      name: "Code docs",
      desc: "Notes for understanding the internals before you start poking the loom.",
      url: "https://github.com/DRAVKNOX-Studios/Payne-less-Watch/blob/main/code_docs.md"
    },
    {
      name: "Contributing guide",
      desc: "Read this before opening a PR, unless chaos is the point.",
      url: "https://github.com/DRAVKNOX-Studios/Payne-less-Watch/blob/main/CONTRIBUTING.md"
    }
  ],

  underTheHood: [
    "Alarms register with Android AlarmManager instead of keeping a permanent background gremlin alive.",
    "Canvas-rendered screens keep the look custom without inviting a heavy component stack to the party.",
    "Notifications cover alarms, missed alarms, timers and stopwatch state.",
    "Ringtones, vibration, labels, notes, repeat days and power-button behavior stay local.",
    "No internet permission means no analytics endpoint, no telemetry pipeline and no cloud dependency. Radical, I know."
  ]

};
